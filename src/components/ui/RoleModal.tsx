"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMyPresence } from "@/liveblocks/config";
import { useState, useEffect } from "react";

type Props = {
  onSelect: (role: "talent" | "organization") => void;
};

export default function RoleModal({ onSelect }: Props) {
  const [, updatePresence] = useMyPresence();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so the page renders first
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  function handleSelect(role: "talent" | "organization") {
    onSelect(role);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(4, 8, 15, 0.85)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              background: "#0a1228",
              border: "0.5px solid #1e2a4a",
              borderRadius: "16px",
              padding: "36px 32px",
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)" }} />
              <span style={{ fontSize: "18px", fontWeight: 500, color: "#e8eaf6" }}>Serin</span>
            </div>

            <p style={{ fontSize: "12px", color: "#4b5a8a", marginBottom: "6px", letterSpacing: "0.05em" }}>
              WELCOME
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: 500, color: "#e8eaf6", marginBottom: "8px" }}>
              What brings you here?
            </h2>
            <p style={{ fontSize: "13px", color: "#6b7db3", marginBottom: "28px", lineHeight: 1.6 }}>
              Your choice personalizes your experience — and places you on the live map.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              {/* Talent */}
              <button
                onClick={() => handleSelect("talent")}
                style={{
                  flex: 1,
                  padding: "18px 12px",
                  borderRadius: "12px",
                  background: "#0a1e3d",
                  border: "0.5px solid #1e4d9a",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#3b82f6")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1e4d9a")}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>🎯</div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#93c5fd", marginBottom: "4px" }}>
                  I'm looking for work
                </div>
                <div style={{ fontSize: "11px", color: "#4b5a8a" }}>Talent</div>
              </button>

              {/* Organization */}
              <button
                onClick={() => handleSelect("organization")}
                style={{
                  flex: 1,
                  padding: "18px 12px",
                  borderRadius: "12px",
                  background: "#0f0a2e",
                  border: "0.5px solid #3730a3",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#818cf8")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#3730a3")}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>🏢</div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#a5b4fc", marginBottom: "4px" }}>
                  I'm hiring
                </div>
                <div style={{ fontSize: "11px", color: "#4b5a8a" }}>Organization</div>
              </button>
            </div>

            <p style={{ fontSize: "11px", color: "#2a3a6a", marginTop: "20px" }}>
              You're joining {" "}
              <span style={{ color: "#3b82f6" }}>a live experience</span>
              {" "} — others can see your presence on this page.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}