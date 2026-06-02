"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStorage, useMutation, useBroadcastEvent } from "@/liveblocks/config";

const PLACEHOLDER_THOUGHTS = [
  "finally, fair hiring",
  "this changes everything",
  "AI interviews are wild",
  "love the concept",
  "applying right now",
  "hiring just got smarter",
  "no more bias",
  "this is the future",
];

const REACTION_OPTIONS = [
  { key: "fast", label: "⚡ Fast" },
  { key: "fair", label: "🎯 Fair" },
  { key: "smart", label: "🧠 Smart" },
  { key: "impressed", label: "✨ Impressed" },
];

export default function ThoughtStream() {
  const [input, setInput] = useState("");
  const storedThoughts = useStorage((root) => root.thoughtStream);
  const [lastReacted, setLastReacted] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reactionCounts = useStorage((root) => root.reactionCounts);

  const broadcastEvent = useBroadcastEvent();

  const addReaction = useMutation(({ storage }, key: string) => {
  const validKey = key as "fast" | "fair" | "smart" | "impressed";
  const counts = storage.get("reactionCounts");
  counts.set(validKey, (counts.get(validKey) ?? 0) + 1);
}, []);

  const removeReaction = useMutation(({ storage }, key: string) => {
  const validKey = key as "fast" | "fair" | "smart" | "impressed";
  const counts = storage.get("reactionCounts");
  counts.set(validKey, Math.max(0, (counts.get(validKey) ?? 0) - 1));
}, []);

  const addThought = useMutation(({ storage }, thought: string) => {
    const stream = storage.get("thoughtStream");
    stream.insert(thought, 0);
    if (stream.length > 8) stream.delete(stream.length - 1);
    }, []);

  {/*const clearThoughts = useMutation(({ storage }) => {
    const stream = storage.get("thoughtStream");
    while (stream.length > 0) stream.delete(0);
    }, []);*/}

  function handleThoughtSubmit() {
    const trimmed = input.trim();
    if (!trimmed || trimmed.length < 2) return;
    addThought(trimmed);
    broadcastEvent({ type: "THOUGHT_ADDED", message: trimmed });
    setInput("");
    }

  function handleReaction(key: string) {
    if (lastReacted === key) {
        removeReaction(key);
        setLastReacted(null);
        return;
    }
    addReaction(key);
    setLastReacted(key);
  }

  return (
    <section
      id="thoughts"
      style={{
        padding: "80px 24px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "48px" }}
      >
        <p style={{ fontSize: "12px", color: "#3b82f6", letterSpacing: "0.1em", marginBottom: "8px" }}>
          LIVE ON THIS PAGE
        </p>
        <h2 style={{ fontSize: "32px", fontWeight: 500, color: "#e8eaf6", marginBottom: "12px" }}>
          What is everyone thinking?
        </h2>
        <p style={{ fontSize: "15px", color: "#6b7db3", lineHeight: 1.6 }}>
          A live stream of thoughts from every visitor right now. Add yours — it appears for everyone instantly.
        </p>
        {/* Clear button - for testing */}
        {/*<button
            onClick={clearThoughts}
            style={{
                marginTop: "12px",
                background: "transparent",
                border: "0.5px solid #1e2a4a",
                borderRadius: "8px",
                padding: "4px 12px",
                fontSize: "11px",
                color: "#4b5a8a",
                cursor: "pointer",
                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.color = "#6b7db3";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e2a4a";
                e.currentTarget.style.color = "#4b5a8a";
            }}
            >
            clear all
            </button>*/}
      </motion.div>

      {/* Thought stream */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          background: "#070c1a",
          border: "0.5px solid #1e2a4a",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "16px",
          minHeight: "80px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <AnimatePresence mode="popLayout">
          {(storedThoughts && storedThoughts.length > 0 ? storedThoughts : PLACEHOLDER_THOUGHTS).map((thought, i) => (
            <motion.div
              key={thought + i}
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#0f1f40",
                border: "0.5px solid #1e3a6a",
                borderRadius: "20px",
                padding: "6px 14px",
                fontSize: "13px",
                color: i === 0 ? "#60a5fa" : "#4b5a8a",
                whiteSpace: "nowrap",
              }}
            >
              {thought}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "40px",
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleThoughtSubmit()}
          placeholder="Share a thought about Serin..."
          maxLength={60}
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
          onClick={handleThoughtSubmit}
          style={{
            background: "#1d4ed8",
            color: "#e0eaff",
            fontSize: "14px",
            fontWeight: 500,
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1d4ed8")}
        >
          Send →
        </button>
      </div>

      {/* Reactions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: "center" }}
      >
        <p style={{ fontSize: "13px", color: "#4b5a8a", marginBottom: "16px" }}>
          React to Serin — your vote updates for everyone live
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          {REACTION_OPTIONS.map(({ key, label }) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReaction(key)}
              style={{
                background: lastReacted === key ? "#0f2d5c" : "#0a1228",
                border: `0.5px solid ${lastReacted === key ? "#3b82f6" : "#1e2a4a"}`,
                borderRadius: "20px",
                padding: "8px 18px",
                fontSize: "14px",
                color: lastReacted === key ? "#60a5fa" : "#6b7db3",
                cursor: lastReacted === key ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              {label}
              <span
                style={{
                  fontSize: "12px",
                  color: "#3b82f6",
                  fontWeight: 500,
                  minWidth: "20px",
                }}
              >
                {reactionCounts
                  ? reactionCounts[key as keyof typeof reactionCounts]
                  : 0}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}