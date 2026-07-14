"use client";

import { useEffect, useState } from "react";

import {
  Users,
  CalendarDays,
  Globe2,
  Clock3,
  TrendingUp,
} from "lucide-react";

import {
  FadeIn,
  FadeUp,
} from "@/components/animations";

import { AnimatedNumber } from "@/components/animations/AnimatedNumber";

import { supabase } from "@/lib/supabaseClient";

interface VisitorStatsData {
  today: number;
  last7Days: number;
  total: number;
  updatedAt: string;
}

export default function VisitorStats() {
  const [visitorStats, setVisitorStats] = useState<VisitorStatsData>({
    today: 0,
    last7Days: 0,
    total: 0,
    updatedAt: "-",
  });

  useEffect(() => {
    loadVisitorStats();
  }, []);

  async function loadVisitorStats() {
    try {
      const now = new Date();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const last7 = new Date();
      last7.setDate(last7.getDate() - 6);
      last7.setHours(0, 0, 0, 0);

      const [
        todayResult,
        last7Result,
        totalResult,
      ] = await Promise.all([
        supabase
          .from("visitor_logs")
          .select("*", {
            count: "exact",
            head: true,
          })
          .gte("created_at", today.toISOString()),

        supabase
          .from("visitor_logs")
          .select("*", {
            count: "exact",
            head: true,
          })
          .gte("created_at", last7.toISOString()),

        supabase
          .from("visitor_logs")
          .select("*", {
            count: "exact",
            head: true,
          }),
      ]);

      setVisitorStats({
        today: todayResult.count ?? 0,
        last7Days: last7Result.count ?? 0,
        total: totalResult.count ?? 0,
        updatedAt: now.toLocaleString("id-ID", {
          dateStyle: "long",
          timeStyle: "short",
        }),
      });
    } catch (error) {
      console.error("Gagal mengambil statistik visitor:", error);
    }
  }

  const stats = [
    {
      title: "Pengunjung Hari Ini",
      value: visitorStats.today,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      number: true,
    },
    {
      title: "Pengunjung 7 Hari",
      value: visitorStats.last7Days,
      icon: CalendarDays,
      color: "text-green-600",
      bg: "bg-green-500/10",
      number: true,
    },
    {
      title: "Total Pengunjung",
      value: visitorStats.total,
      icon: Globe2,
      color: "text-orange-600",
      bg: "bg-orange-500/10",
      number: true,
    },
    {
      title: "Terakhir Diperbarui",
      value: visitorStats.updatedAt,
      icon: Clock3,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
      number: false,
    },
  ];

  return (
    <section className="bg-muted/30 py-4">
      <div className="container mx-auto max-w-7xl px-4">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <FadeUp once={true}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4 text-primary" />

              Statistik Website
            </div>
          </FadeUp>

          <FadeUp once={true} delay={0.1}>
            <h2 className="text-3xl font-bold md:text-4xl">
              Statistik Pengunjung
            </h2>
          </FadeUp>

          <FadeUp once={true} delay={0.2}>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Statistik jumlah pengunjung Website Dinas Komunikasi dan Informatika
              Kabupaten Timor Tengah Selatan.
            </p>
          </FadeUp>
        </div>

        {/* CARDS */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn
                key={item.title}
                once={false}
                delay={index * 0.15}
              >
                <div
                  className="
                    flex
                    h-full
                    rounded-3xl
                    border
                    bg-card
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  <div className="flex w-full items-start justify-between">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.title}
                      </p>

                      <h3
                        className={`
                          ${
                            item.number
                              ? "text-4xl"
                              : "text-lg"
                          }
                          font-bold
                          tracking-tight
                        `}
                      >
                        {item.number ? (
                          <AnimatedNumber
                            value={item.value as number}
                          />
                        ) : (
                          item.value
                        )}
                      </h3>
                    </div>

                    <div
                      className={`
                        rounded-2xl
                        p-4
                        ${item.bg}
                        transition
                        group-hover:scale-110
                      `}
                    >
                      <Icon
                        className={`
                          h-7
                          w-7
                          ${item.color}
                        `}
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}