"use client";

import { useState } from "react";
import { RoomProvider, useMyPresence } from "@/liveblocks/config";
import { LiveList, LiveObject } from "@liveblocks/client";
import Navbar from "@/components/ui/Navbar";
import RoleModal from "@/components/ui/RoleModal";
import LiveCursor from "@/components/ui/LiveCursor";
import Hero from "@/components/sections/Hero";
import ThoughtStream from "@/components/sections/ThoughtStream";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Footer from "@/components/sections/Footer";

function PageContent() {
  const [role, setRole] = useState<"talent" | "organization" | null>(null);
  const [, updatePresence] = useMyPresence();

  function handleRoleSelect(r: "talent" | "organization") {
    setRole(r);
    updatePresence({ role: r });
  }

  return (
    <main style={{ minHeight: "100vh", background: "#04080f" }}>
      <Navbar />
      <LiveCursor />
      {!role && <RoleModal onSelect={handleRoleSelect} />}
      <Hero role={role} />
      <HowItWorks />
      <Features />
      <ThoughtStream />
      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <RoomProvider
      id="serin-landing"
      initialPresence={{
        cursor: null,
        role: null,
        color: "#3b82f6",
        reaction: null,
      }}
      initialStorage={{
        thoughtStream: new LiveList([]),
        featureHovers: new LiveObject({
          feature1: 0,
          feature2: 0,
          feature3: 0,
          feature4: 0,
        }),
        reactionCounts: new LiveObject({
          fast: 0,
          fair: 0,
          smart: 0,
          impressed: 0,
        }),
        betaJoinCount: 0,
      }}
    >
      <PageContent />
    </RoomProvider>
  );
}