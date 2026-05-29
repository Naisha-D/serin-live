"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOthers } from "@/liveblocks/config";

export default function LiveCursor() {
  const others = useOthers();

  return (
    <div className="cursor-layer">
      <AnimatePresence>
        {others.map((user) => {
          const cursor = user.presence.cursor;
          const color = user.presence.color ?? "#3b82f6";
          const role = user.presence.role;

          if (!cursor) return null;

          return (
            <motion.div
              key={user.connectionId}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "fixed",
                left: `${cursor.x}%`,
                top: `${cursor.y}%`,
                pointerEvents: "none",
                transform: "translate(-2px, -2px)",
              }}
            >
              {/* Cursor SVG */}
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 0.5L0.5 17.5L4.5 13.5L7.5 20.5L10 19.5L7 12.5L12.5 12.5L0.5 0.5Z"
                  fill={color}
                  stroke="#0a1228"
                  strokeWidth="1"
                />
              </svg>

              {/* Role label */}
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  position: "absolute",
                  top: "18px",
                  left: "14px",
                  background: color,
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: "6px",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.02em",
                }}
              >
                {role === "talent" ? "Talent" : role === "organization" ? "Org" : "Visitor"}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}