"use client"

import * as React from "react"
import {
  Info,
  LayoutPanelLeft,
  LayoutDashboard,
  Mail,
  CheckSquare,
  MessageCircle,
  Calendar,
  Shield,
  AlertTriangle,
  Settings,
  HelpCircle,
  CreditCard,
  LayoutTemplate,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { SidebarNotification } from "@/components/sidebar-notification"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "ShadcnStore",
    email: "store@example.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "Dashboards",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "Halaman",
      items: [
        {
          title: "Beranda",
          url: "/edit-beranda",
          icon: LayoutTemplate,
        },
        {
          title: "Profil",
          url: "#",
          icon: Shield,
          items: [
            {
              title: "Visi Misi",
              url: "/edit-profil/visi-misi",
            },
            {
              title: "Tugas & Fungsi",
              url: "/edit-profil/tusi",
            },
            {
              title: "Struktur Organisasi",
              url: "/edit-profil/struktur",
            }
          ],
        },
        {
          title: "Informasi",
          url: "#",
          icon: AlertTriangle,
          items: [
            {
              title: "Tata Usaha",
              url: "/edit-informasi/tata-usaha",
            },
            {
              title: "Keuangan",
              url: "/edit-informasi/keuangan",
            },
            {
              title: "IKP",
              url: "/edit-informasi/ikp",
            },
            {
              title: "TIK",
              url: "/edit-informasi/tik",
            },
            {
              title: "Persandian & Statistik",
              url: "/edit-informasi/persandian",
            },
            {
              title: "Regulasi & Peraturan",
              url: "/edit-informasi/regulasi",
            },
          ],
        },
        {
          title: "Menu Lainnya",
          url: "#",
          icon: AlertTriangle,
          items: [
            {
              title: "Layanan",
              url: "/edit-menu-lainnya/layanan",
            },
            {
              title: "Galeri",
              url: "/edit-menu-lainnya/galeri",
            },
          ],
        },
        // {
        //   title: "Settings",
        //   url: "#",
        //   icon: Settings,
        //   items: [
        //     {
        //       title: "User Settings",
        //       url: "/settings/user",
        //     },
        //     {
        //       title: "Account Settings",
        //       url: "/settings/account",
        //     },
        //     {
        //       title: "Plans & Billing",
        //       url: "/settings/billing",
        //     },
        //     {
        //       title: "Appearance",
        //       url: "/settings/appearance",
        //     },
        //     {
        //       title: "Notifications",
        //       url: "/settings/notifications",
        //     },
        //     {
        //       title: "Connections",
        //       url: "/settings/connections",
        //     },
        //   ],
        // },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Diskominfo</span>
                  <span className="truncate text-xs">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarNotification />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
