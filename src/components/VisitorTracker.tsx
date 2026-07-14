"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function VisitorTracker() {
  useEffect(() => {
    const visitKey = "visitor-logged-today";
    const today = new Date().toDateString();

    const lastVisit = localStorage.getItem(visitKey);

    if (lastVisit === today) return;

    async function saveVisitor() {
      try {
        await supabase.from("visitor_logs").insert({
          ip_address: null,
          page: window.location.pathname,
          user_agent: navigator.userAgent,
          referer: document.referrer || null,
        });

        localStorage.setItem(visitKey, today);
      } catch (err) {
        console.error(err);
      }
    }

    saveVisitor();
  }, []);

  return null;
}