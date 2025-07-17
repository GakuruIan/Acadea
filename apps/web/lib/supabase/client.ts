import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@repo/supabase-types";

export function supabaseClient() {
  const { getToken } = useAuth();

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          try {
            const clerkToken = await getToken({
              template: "supabase",
            });

            console.log(
              "Clerk token:",
              clerkToken ? "Token received" : "No token"
            );

            const headers = new Headers(options?.headers);

            if (clerkToken) {
              headers.set("Authorization", `Bearer ${clerkToken}`);
            } else {
              console.warn("No Clerk token available");
            }

            return fetch(url, {
              ...options,
              headers,
            });
          } catch (error) {
            console.error("Error getting Clerk token:", error);
            return fetch(url, options);
          }
        },
      },
    }
  );
}
