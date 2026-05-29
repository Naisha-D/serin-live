"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useMyPresence } from "@/liveblocks/config";
import LivePresence from "@/components/ui/LivePresence";
import Constellation from "@/components/canvas/Constellation";

type Props = {
  role: "talent" | "organization" | null;
};

export default function Hero({ role }: Props) {
  const [, updatePresence] = useMyPresence();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      updatePresence({
        cursor: {
          x: parseFloat(((e.clientX / window.innerWidth) * 100).toFixed(2)),
          y: parseFloat(((e.clientY / window.innerHeight) * 100).toFixed(2)),
        },
      });
    },
    [updatePresence]
  );

  const handleMouseLeave = useCallback(() => {
    updatePresence({ cursor: null });
  }, [updatePresence]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Beta badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "#0a1e3d",
          border: "0.5px solid #1e4d9a",
          borderRadius: "20px",
          padding: "5px 14px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 6px rgba(34,197,94,0.6)",
          }}
        />
        <span style={{ fontSize: "12px", color: "#60a5fa" }}>
          Now in Private Beta
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 500,
          lineHeight: 1.15,
          textAlign: "center",
          color: "#e8eaf6",
          marginBottom: "20px",
          maxWidth: "800px",
        }}
      >
        Where{" "}
        <span style={{ color: "#3b82f6" }}>Talent</span>{" "}
        Meets Opportunity.{" "}
        <span style={{ color: "#818cf8" }}>Intelligently.</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontSize: "17px",
          color: "#6b7db3",
          textAlign: "center",
          maxWidth: "520px",
          lineHeight: 1.7,
          marginBottom: "32px",
        }}
      >
        AI-powered hiring that removes subjectivity. Every candidate evaluated
        fairly. Every opportunity matched precisely.
      </motion.p>

      {/* Live presence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ marginBottom: "40px" }}
      >
        <LivePresence />
      </motion.div>

      {/* Constellation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          width: "100%",
          maxWidth: "720px",
          height: "200px",
          background: "#070c1a",
          border: "0.5px solid #1e2a4a",
          borderRadius: "16px",
          marginBottom: "40px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Constellation />

        {/* Role labels */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-around",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />
            <span style={{ fontSize: "11px", color: "#4b5a8a" }}>Talent seeking opportunity</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#818cf8" }} />
            <span style={{ fontSize: "11px", color: "#4b5a8a" }}>Organizations hiring</span>
          </div>
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}
      >
        <a
          href="https://serin-ai.com/signup"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#1d4ed8",
            color: "#e0eaff",
            fontSize: "15px",
            fontWeight: 500,
            padding: "12px 28px",
            borderRadius: "10px",
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1d4ed8")}
        >
          Get Started →
        </a>
        <a
          href="https://docs.serin-ai.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "transparent",
            color: "#6b7db3",
            fontSize: "15px",
            fontWeight: 500,
            padding: "12px 28px",
            borderRadius: "10px",
            textDecoration: "none",
            border: "0.5px solid #2a3a6a",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#e8eaf6";
            e.currentTarget.style.borderColor = "#4b5a8a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6b7db3";
            e.currentTarget.style.borderColor = "#2a3a6a";
          }}
        >
          Read the Docs
        </a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{ position: "absolute", bottom: "32px" }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#2a3a6a", fontSize: "20px" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}