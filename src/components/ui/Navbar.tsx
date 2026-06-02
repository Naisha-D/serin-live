"use client";

import { motion } from "framer-motion";
import { useOthers } from "@/liveblocks/config";

export default function Navbar() {
  const others = useOthers();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        height: "56px",
        background: "rgba(7, 13, 26, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid #1e2a4a",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <img 
            src="/serin-logo.svg" 
            alt="Serin" 
            style={{ width: "32px", height: "19px", filter: "brightness(0) invert(1)", flexShrink: 0 }} 
            />
        <span style={{ fontSize: "16px", fontWeight: 500, color: "#e8eaf6" }}>
          Serin
        </span>
      </div>

      {/* Nav links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
        }}
        className="nav-links-desktop"
      >
        {[
        { label: "About", href: "#how-it-works" },
        { label: "Features", href: "#features" },
        { label: "Docs", href: "https://docs.serin-ai.com" },
        { label: "Jobs", href: "https://serin-ai.com/job?view=available-jobs" },
        ].map((link) => (
        <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
            fontSize: "13px",
            color: "#6b7db3",
            textDecoration: "none",
            transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e8eaf6")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7db3")}
        >
            {link.label}
        </a>
    ))}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        {/* Live user avatars */}
        {others.length > 0 && (
          <div style={{ display: "flex", alignItems: "center" }}>
            {others.slice(0, 3).map((user, index) => (
              <div
                key={user.connectionId}
                title={user.presence.role ?? "Visitor"}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: user.presence.color ?? "#3b82f6",
                  border: "2px solid #070d1a",
                  marginLeft: index === 0 ? 0 : "-6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  color: "#fff",
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                {user.presence.role === "talent"
                  ? "T"
                  : user.presence.role === "organization"
                  ? "O"
                  : "?"}
              </div>
            ))}
          </div>
        )}


        <a
          href="https://serin-ai.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#1d4ed8",
            color: "#e0eaff",
            fontSize: "12px",
            fontWeight: 500,
            padding: "6px 12px",
            borderRadius: "8px",
            textDecoration: "none",
            transition: "background 0.2s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1d4ed8")}
        >
          Go to Jobs →
        </a>
      </div>
    </motion.nav>
  );
}