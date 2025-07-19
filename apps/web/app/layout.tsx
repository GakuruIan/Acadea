import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "sonner";

import { ClerkProvider } from "@clerk/nextjs";

// tanstack
import { ReactQueryClientProvider } from "@/providers/ReactQueryProvider";

const poppinsBold = localFont({
  src: "./fonts/Poppins-Bold.woff",
  variable: "--font-poppins-bold",
});
const poppinsRegular = localFont({
  src: "./fonts/Poppins-Regular.woff",
  variable: "--font-poppins-regular",
});
const poppinsSemiBold = localFont({
  src: "./fonts/Poppins-SemiBold.woff",
  variable: "--font-poppins-semi-bold",
});

const poppinsLight = localFont({
  src: "./fonts/Poppins-Light.woff",
  variable: "--font-poppins-light",
});

const saira = localFont({
  src: "./fonts/SairaCondensed-Regular.woff",
  variable: "--font-saira",
});

const sairaLight = localFont({
  src: "./fonts/SairaCondensed-Light.woff",
  variable: "--font-saira-light",
});

export const metadata: Metadata = {
  title: "Acadea Inc.",
  description: "Learn with a modern LMS app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ReactQueryClientProvider>
        <html lang="en">
          <body
            className={`${poppinsRegular.variable} ${poppinsLight.variable}  ${poppinsSemiBold.variable} ${poppinsBold.variable} ${saira.variable} ${sairaLight.variable} `}
          >
            {children}
            <Toaster />
          </body>
        </html>
      </ReactQueryClientProvider>
    </ClerkProvider>
  );
}
