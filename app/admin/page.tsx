"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { AdminLogin } from "@/components/admin-login";
import { AdminDashboard } from "@/components/admin-dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import { RestPointsProvider } from "@/hooks/use-rest-points";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RestPointsProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-6">
            {isLoggedIn ? (
              <AdminDashboard />
            ) : (
              <AdminLogin onLogin={() => setIsLoggedIn(true)} />
            )}
          </main>
        </div>
      </RestPointsProvider>
    </ThemeProvider>
  );
}