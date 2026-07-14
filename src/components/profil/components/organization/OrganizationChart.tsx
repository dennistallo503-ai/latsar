"use client";

import { useState } from "react";

import LeaderCard from "./LeaderCard";
import LeaderModal from "./LeaderModal";

import {
  kepalaDinas,
  kepalaBidang,
  kepalaSubBagian,
} from "./organization.data";

import { Leader } from "./types";

export default function OrganizationChart() {

    const [selectedLeader, setSelectedLeader] =
        useState<Leader | null>(null);

    return (
        <>
        <section className="mx-auto max-w-7xl py-16">
            <div className="text-center">

                <h2 className="text-3xl font-bold">
                    Profil Pimpinan
                </h2>

                <p className="mt-3 text-muted-foreground">
                    Klik foto untuk melihat profil.
                </p>

            </div>
            <div className="mt-16 flex justify-center">

                <LeaderCard

                    leader={kepalaDinas}

                    size="lg"

                    onClick={() =>
                        setSelectedLeader(kepalaDinas)
                    }

                />

            </div>
        </section>
        <LeaderModal
            leader={selectedLeader}
            onClose={() => setSelectedLeader(null)}
        />
        </>

    );

}