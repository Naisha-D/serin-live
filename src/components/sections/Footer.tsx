"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStorage, useMutation, useOthers, useSelf } from "@/liveblocks/config";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const others = useOthers();
  const self = useSelf();
  const totalCount = others.length + (self ? 1 : 0);

  const betaJoinCount = useStorage((root) => root.betaJoinCount);

  const incrementBetaCount = useMutation(({ storage }) => {
    const current = storage.get("betaJoinCount") ?? 0;
    storage.set("betaJoinCount", current + 1);
  }, []);

  function handleSubmit() {
    if (!email.includes("@")) return;
    incrementBetaCount();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer
      style={{
        borderTop: "0.5px solid #1e2a4a",
        background: "#070c1a",
      }}
    >
      {/* CTA section */}
      <div
        style={{
          padding: "80px 24px",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#3b82f6",
              letterSpacing: "0.1em",
              marginBottom: "8px",
            }}
          >
            JOIN THE BETA
          </p>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 500,
              color: "#e8eaf6",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            Be part of the future of hiring
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#6b7db3",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            Serin is now in private beta.{" "}
            <span style={{ color: "#60a5fa" }}>{betaJoinCount ?? 0} people</span>{" "}
            have joined from this page alone.
          </p>

          {/* Email input */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex",
                  gap: "8px",
                  maxWidth: "460px",
                  margin: "0 auto 16px",
                }}
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Enter your email"
                  type="email"
                  style={{
                    flex: 1,
                    background: "#0a1228",
                    border: "0.5px solid #1e2a4a",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    color: "#e8eaf6",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#1e2a4a")}
                />
                <button
                  onClick={handleSubmit}
                  style={{
                    background: "#1d4ed8",
                    color: "#e0eaff",
                    fontSize: "14px",
                    fontWeight: 500,
                    padding: "12px 24px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#1d4ed8")}
                >
                  Join Beta →
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "#0a2a1a",
                  border: "0.5px solid #166534",
                  borderRadius: "10px",
                  padding: "16px 24px",
                  maxWidth: "460px",
                  margin: "0 auto 16px",
                  color: "#4ade80",
                  fontSize: "14px",
                }}
              >
                ✓ You're on the list — we'll be in touch soon.
              </motion.div>
            )}
          </AnimatePresence>

          <p style={{ fontSize: "12px", color: "#2a3a6a" }}>
            No spam. Just early access when Serin opens up.
          </p>
        </motion.div>
      </div>

      {/* Live stats bar */}
      <div
        style={{
          borderTop: "0.5px solid #1e2a4a",
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              backgroundImage: "url('/serin-logo.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#e8eaf6" }}>
            Serin
          </span>
          <span style={{ fontSize: "12px", color: "#2a3a6a", marginLeft: "4px" }}>
            © 2025
          </span>
        </div>

        {/* Live stats */}
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: 500, color: "#3b82f6" }}>
              {totalCount}
            </div>
            <div style={{ fontSize: "10px", color: "#4b5a8a" }}>live now</div>
          </div>
          <div style={{ width: "0.5px", height: "28px", background: "#1e2a4a" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: 500, color: "#3b82f6" }}>
              {betaJoinCount ?? 0}
            </div>
            <div style={{ fontSize: "10px", color: "#4b5a8a" }}>joined beta</div>
          </div>
          <div style={{ width: "0.5px", height: "28px", background: "#1e2a4a" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: 500, color: "#3b82f6" }}>
              {others.length > 0 ? "Active" : "Quiet"}
            </div>
            <div style={{ fontSize: "10px", color: "#4b5a8a" }}>room status</div>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "20px" }}>
          {[
            { label: "About", href: "https://serin-ai.com/" },
            { label: "Docs", href: "https://docs.serin-ai.com" },
            { label: "Jobs", href: "https://serin-ai.com/job?view=available-jobs" },
            { label: "Contact", href: "https://serin-ai.com/#contact" },
            ].map((link) => (
            <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                fontSize: "12px",
                color: "#4b5a8a",
                textDecoration: "none",
                transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e8eaf6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5a8a")}
            >
                {link.label}
            </a>
        ))}
        </div>
      </div>
    </footer>
  );
}