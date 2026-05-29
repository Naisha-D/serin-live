"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOthers, useSelf } from "@/liveblocks/config";

export default function LivePresence() {
  const others = useOthers();
  const self = useSelf();

  const totalCount = others.length + (self ? 1 : 0);

  const talentCount = others.filter(
    (u) => u.presence.role === "talent"
    ).length + (self?.presence.role === "talent" ? 1 : 0);

    const orgCount = others.filter(
    (u) => u.presence.role === "organization"
    ).length + (self?.presence.role === "organization" ? 1 : 0);

    const browsingCount = others.filter(
    (u) => u.presence.role === null
    ).length;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Total live count */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 8px rgba(34, 197, 94, 0.6)",
          }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={totalCount}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: "13px", color: "#4ade80", fontWeight: 500 }}
          >
            {totalCount} {totalCount === 1 ? "person" : "people"} exploring Serin right now
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Talent vs Org breakdown */}
      {totalCount > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#3b82f6",
              }}
            />
            <span style={{ fontSize: "11px", color: "#6b7db3" }}>
              {talentCount} talent
            </span>
          </div>
          <div style={{ width: "1px", height: "10px", background: "#1e2a4a" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#818cf8",
              }}
            />
            <span style={{ fontSize: "11px", color: "#6b7db3" }}>
              {orgCount} hiring
            </span>
          </div>
          {browsingCount > 0 && (
            <>
              <div style={{ width: "1px", height: "10px", background: "#1e2a4a" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4b5a8a" }} />
                <span style={{ fontSize: "11px", color: "#6b7db3" }}>
                  {browsingCount} browsing
                </span>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}