import type React from "react";
import { RestPointsProvider } from "@/hooks/use-rest-points";
import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restloop - Find Rest Points Near You",
  description: "Helping drivers find rest points near them",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RestPointsProvider>{children}</RestPointsProvider>
      </body>
    </html>
  );
}
