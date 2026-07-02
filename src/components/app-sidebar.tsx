"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { LogOut } from "lucide-react";

import { Logo } from "@/components/logo";
import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

const data = {
  navGroups: [
    {
      label: "Halaman",
      items: [
        {
          title: "Beranda",
          url: "/edit-beranda",
        },
        {
          title: "Profil",
          url: "#",
          items: [
            { title: "Visi Misi", url: "/edit-profil/visi-misi" },
            { title: "Tugas & Fungsi", url: "/edit-profil/tusi" },
            { title: "Struktur Organisasi", url: "/edit-profil/struktur" },
          ],
        },
        {
          title: "Informasi",
          url: "#",
          items: [
            { title: "Tata Usaha", url: "/edit-informasi/tata-usaha" },
            { title: "Keuangan", url: "/edit-informasi/keuangan" },
            { title: "IKP", url: "/edit-informasi/ikp" },
            { title: "TIK", url: "/edit-informasi/tik" },
            { title: "Persandian & Statistik", url: "/edit-informasi/persandian" },
            { title: "Regulasi", url: "/edit-informasi/regulasi" },
          ],
        },
        {
          title: "Menu Lainnya",
          url: "#",
          items: [
            { title: "Layanan", url: "/edit-menu-lainnya/layanan" },
            { title: "Galeri", url: "/edit-menu-lainnya/galeri" },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/landing");
  };

  return (
    <Sidebar {...props}>

      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Logo size={24} />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain
            key={group.label}
            label={group.label}
            items={group.items}
          />
        ))}
      </SidebarContent>

      {/* FOOTER (ONLY LOGOUT) */}
      <SidebarFooter>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>

    </Sidebar>
  );
}