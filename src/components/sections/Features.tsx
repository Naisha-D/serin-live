"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStorage, useMutation, useOthers } from "@/liveblocks/config";

const FEATURES = [
  {
    id: "feature1",
    num: "01",
    title: "AI-Powered Job Creation",
    description:
      "Create job postings in seconds with AI assistance. Our intelligent system analyzes your requirements and generates comprehensive job descriptions tailored to attract the right candidates.",
    icon: "✦",
    threshold: 2,
  },
  {
    id: "feature2",
    num: "02",
    title: "Live AI Interviews",
    description:
      "Conduct seamless video interviews with built-in Voice Activity Detection and automatic recording. Review conversations with AI-generated transcripts.",
    icon: "◈",
    threshold: 2,
  },
  {
    id: "feature3",
    num: "03",
    title: "Smart Application Tracking",
    description:
      "Visualize your entire hiring pipeline with Kanban boards. Drag-and-drop candidates through stages and never lose track of promising talent.",
    icon: "⬡",
    threshold: 3,
  },
  {
    id: "feature4",
    num: "04",
    title: "Data-Driven Insights",
    description:
      "Transform recruitment data into actionable intelligence. Track key metrics, analyze hiring trends, and optimize your talent acquisition strategy.",
    icon: "◎",
    threshold: 3,
  },
];

export default function Features() {
  const [hovering, setHovering] = useState<string | null>(null);

  const featureHovers = useStorage((root) => root.featureHovers);
    const others = useOthers();

    const incrementHover = useMutation(({ storage }, featureId: string) => {
    const validId = featureId as "feature1" | "feature2" | "feature3" | "feature4";
    const hovers = storage.get("featureHovers");
    hovers.set(validId, (hovers.get(validId) ?? 0) + 1);
    }, []);

    if (!featureHovers) return null;

  function handleHoverStart(featureId: string) {
    setHovering(featureId);
    incrementHover(featureId);
  }

  function isUnlocked(featureId: string, threshold: number): boolean {
    if (!featureHovers) return false;
    const validId = featureId as "feature1" | "feature2" | "feature3" | "feature4";
    return (featureHovers[validId] ?? 0) >= threshold;
  }

  function getHoverCount(featureId: string): number {
    if (!featureHovers) return 0;
    const validId = featureId as "feature1" | "feature2" | "feature3" | "feature4";
    return featureHovers[validId] ?? 0;
  }

  return (
    <section
      id="features"
      style={{
        padding: "80px 24px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "16px" }}
      >
        <p style={{ fontSize: "12px", color: "#3b82f6", letterSpacing: "0.1em", marginBottom: "8px" }}>
          FEATURES
        </p>
        <h2 style={{ fontSize: "32px", fontWeight: 500, color: "#e8eaf6", marginBottom: "12px" }}>
          Unlock Serin together
        </h2>
        <p style={{ fontSize: "15px", color: "#6b7db3", lineHeight: 1.6, maxWidth: "500px", margin: "0 auto" }}>
          Hover a card with enough visitors to reveal it for everyone simultaneously.
          {" "}<span style={{ color: "#3b82f6" }}>{others.length + 1} {others.length + 1 === 1 ? "person" : "people"} on the page right now.</span>
        </p>
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "16px",
          marginTop: "40px",
        }}
      >
        {FEATURES.map((feature, index) => {
          const unlocked = isUnlocked(feature.id, feature.threshold);
          const hoverCount = getHoverCount(feature.id);
          const needed = Math.max(0, feature.threshold - hoverCount);

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => handleHoverStart(feature.id)}
              onHoverEnd={() => setHovering(null)}
              className={unlocked ? "feature-unlock" : ""}
              style={{
                background: "#0a1228",
                border: `0.5px solid ${hovering === feature.id ? "#3b82f6" : unlocked ? "#1e4d9a" : "#1e2a4a"}`,
                borderRadius: "16px",
                padding: "28px",
                cursor: "default",
                transition: "border-color 0.3s ease",
                position: "relative",
                overflow: "hidden",
                opacity: unlocked ? 1 : 0.75,
              }}
            >
              {/* Unlock glow */}
              {unlocked && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
                  }}
                />
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <span style={{ fontSize: "11px", color: "#3b82f6", letterSpacing: "0.05em" }}>
                  {feature.num}
                </span>
                <span style={{ fontSize: "20px", color: unlocked ? "#3b82f6" : "#2a3a6a" }}>
                  {feature.icon}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: unlocked ? "#e8eaf6" : "#4b5a8a",
                  marginBottom: "10px",
                  transition: "color 0.3s ease",
                }}
              >
                {feature.title}
              </h3>

              {unlocked ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ fontSize: "14px", color: "#6b7db3", lineHeight: 1.7 }}
                >
                  {feature.description}
                </motion.p>
              ) : (
                <div>
                  <p style={{ fontSize: "14px", color: "#2a3a6a", lineHeight: 1.7, marginBottom: "12px" }}>
                    {feature.description.slice(0, 40)}...
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        flex: 1,
                        height: "2px",
                        background: "#0f1a38",
                        borderRadius: "1px",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        style={{
                          height: "100%",
                          background: "#3b82f6",
                          borderRadius: "1px",
                          width: `${Math.min((hoverCount / feature.threshold) * 100, 100)}%`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span style={{ fontSize: "11px", color: "#2a3a6a", whiteSpace: "nowrap" }}>
                      {needed} more {needed === 1 ? "hover" : "hovers"} to unlock
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}