import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { prisma } from "@acadea/database";

export async function POST(req: Request) {
  try {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      throw new Error(
        "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
      );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: Missing Svix headers", {
        status: 400,
      });
    }

    // Get body
    const rawBody = await req.text();

    // Parse the body
    const payload = rawBody ? JSON.parse(rawBody) : null;

    if (!payload) {
      console.error("No payload received");
      return new Response("No payload", { status: 400 });
    }

    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // // Verify payload with headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return new Response("Error: Verification error", {
        status: 400,
      });
    }

    switch (evt.type) {
      case "user.created": {
        try {
          const { username, id, email_addresses } = payload.data;

          if (!email_addresses?.length) {
            console.error("No email addresses found for user:", id);
            throw new Error("No email addresses found for user");
          }

          const email = email_addresses[0]?.email_address;

          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (existingUser) {
            console.log(
              `User with email ${email} already exists. Skipping creation.`
            );
            return new Response("User already exists", { status: 200 });
          }

          const newUser = await prisma.user.create({
            data: {
              clerkId: id,
              email,
              verified: true,
            },
          });

          return new Response("Webhook processed successfully", {
            status: 200,
          });
        } catch (error) {
          console.log(`[inner error] ${error}`);
        }

        break;
      }

      case "user.updated": {
        const { id, email_addresses } = evt.data;
        if (!email_addresses?.length) {
          console.error("No email addresses found for user:", id);
          throw new Error("No email addresses found for user");
        }
        const email = email_addresses[0]?.email_address;
        // Update the user
        await prisma.user.update({
          where: { clerkId: id },
          data: {
            email,
          },
        });
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;

        console.log(evt.data);

        await prisma.user.delete({
          where: { clerkId: id },
        });

        break;
      }

      default:
        console.warn(`Unhandled event type: ${evt.type}`);
        break;
    }

    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.log("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
