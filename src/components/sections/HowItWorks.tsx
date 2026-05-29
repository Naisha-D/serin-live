"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Create a Job",
    description:
      "Paste a job title and brief description. Serin's AI instantly structures it into a comprehensive role profile — skills, expectations, and evaluation criteria — ready in seconds.",
    detail: "AI-Powered Job Creation",
    color: "#3b82f6",
  },
  {
    num: "02",
    title: "AI Conducts the Interview",
    description:
      "Candidates receive an invitation and complete a live AI video interview. The agent builds understanding from their resume, then asks tailored questions based on their background.",
    detail: "Consistent. Fair. Intelligent.",
    color: "#818cf8",
  },
  {
    num: "03",
    title: "Review the Report",
    description:
      "Receive a detailed session report explaining exactly how the candidate was assessed — objectives used, performance on each, and overall fit. Fast, repeatable, unbiased.",
    detail: "Structured Evaluation Report",
    color: "#60a5fa",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
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
        style={{ textAlign: "center", marginBottom: "64px" }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#3b82f6",
            letterSpacing: "0.1em",
            marginBottom: "8px",
          }}
        >
          HOW IT WORKS
        </p>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 500,
            color: "#e8eaf6",
            marginBottom: "12px",
          }}
        >
          Hiring, reimagined in three steps
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#6b7db3",
            lineHeight: 1.6,
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          From job creation to candidate report — Serin handles the entire
          evaluation pipeline intelligently.
        </p>
      </motion.div>

      {/* Steps */}
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "28px",
            top: "40px",
            bottom: "40px",
            width: "0.5px",
            background: "linear-gradient(to bottom, #3b82f6, #818cf8, #60a5fa)",
            opacity: 0.3,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {STEPS.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#0a1228",
                  border: `0.5px solid ${step.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: step.color,
                  }}
                >
                  {step.num}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  flex: 1,
                  background: "#0a1228",
                  border: "0.5px solid #1e2a4a",
                  borderRadius: "16px",
                  padding: "24px 28px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: "#0f1a38",
                    border: `0.5px solid ${step.color}30`,
                    borderRadius: "6px",
                    padding: "3px 10px",
                    fontSize: "11px",
                    color: step.color,
                    marginBottom: "12px",
                  }}
                >
                  {step.detail}
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#e8eaf6",
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7db3",
                    lineHeight: 1.7,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          marginTop: "64px",
          textAlign: "center",
          padding: "32px",
          background: "#070c1a",
          border: "0.5px solid #1e2a4a",
          borderRadius: "16px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            color: "#94a3b8",
            lineHeight: 1.7,
            fontStyle: "italic",
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          "Modern hiring wasn't designed for modern work. It's expensive, slow,
          and deeply dependent on subjective interpretation.{" "}
          <span style={{ color: "#e8eaf6", fontStyle: "normal" }}>
            Serin introduces a different path.
          </span>
          "
        </p>
      </motion.div>
    </section>
  );
}