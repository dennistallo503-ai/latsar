"use client";

import Link from "next/link";

import { quickLinks } from "./home/quick-links";

export function QuickAccessSection() {
  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4">

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">
            Akses Cepat
          </h2>

          <p className="mt-2 text-muted-foreground">
            Temukan informasi dan layanan dengan mudah.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <Icon className="mb-4 h-10 w-10 text-primary" />

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}