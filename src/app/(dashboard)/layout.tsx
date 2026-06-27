"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import { AppSidebar } from "../../components/app-sidebar";
import { SiteHeader } from "../../components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  // ================= CHECK AUTH ON LOAD =================
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        setAuthorized(false);
        setLoading(false);
        router.replace("/landing");
        return;
      }

      setAuthorized(true);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  // ================= LISTEN AUTH CHANGE (REALTIME) =================
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          setAuthorized(false);
          router.replace("/landing");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  // ================= LOADING STATE =================
  if (loading || !authorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">
            Memeriksa akses...
          </p>
        </div>
      </div>
    );
  }

  // ================= RENDER ADMIN LAYOUT =================
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex flex-col">
        {/* HEADER */}
        <SiteHeader />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}