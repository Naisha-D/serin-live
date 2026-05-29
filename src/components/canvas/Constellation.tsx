"use client";

import { useEffect, useRef, useMemo } from "react";
import { useOthers, useSelf } from "@/liveblocks/config";

type Node = {
  x: number;
  y: number;
  color: string;
  role: "talent" | "organization" | null;
  id: string | number;
  label?: string;
};

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const others = useOthers();
  const self = useSelf();
  const selfRole = self?.presence.role;

  const nodes: Node[] = [
    // Self
    ...(self
      ? [
          {
            x: selfRole === "talent" ? 25 : selfRole === "organization" ? 70 : 50,
            y: 50,
            color: self.presence.color ?? "#3b82f6",
            role: selfRole ?? null,
            id: "self",
            label: "you",
          },
        ]
      : []),
    // Others — spread them based on connectionId
    ...others.map((user, index) => ({
      x: user.presence.role === "talent"
        ? 15 + ((index * 37) % 35)
        : user.presence.role === "organization"
        ? 55 + ((index * 31) % 35)
        : 20 + ((index * 43) % 60),
      y: 20 + ((index * 53) % 60),
      color: user.presence.color ?? "#818cf8",
      role: user.presence.role ?? null,
      id: user.connectionId,
    })),
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let tick = 0;

    function draw() {
      if (!canvas || !ctx) return;

      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      tick += 0.01;

      // Draw divider line
      ctx.beginPath();
      ctx.moveTo(W / 2, 10);
      ctx.lineTo(W / 2, H - 10);
      ctx.strokeStyle = "rgba(30, 42, 74, 0.8)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Side labels
      ctx.font = "10px system-ui";
      ctx.fillStyle = "rgba(75, 90, 138, 0.8)";
      ctx.fillText("Talent", 14, 18);
      ctx.fillText("Organizations", W / 2 + 12, 18);

      // Draw connection lines between talent and org nodes
      const talentNodes = nodes.filter((n) => n.role === "talent");
      const orgNodes = nodes.filter(
        (n) => n.role === "organization"
      );

      talentNodes.forEach((t) => {
        orgNodes.forEach((o) => {
          const tx = (t.x / 100) * W;
          const ty = (t.y / 100) * H;
          const ox = (o.x / 100) * W;
          const oy = (o.y / 100) * H;

          const dist = Math.sqrt((tx - ox) ** 2 + (ty - oy) ** 2);
          const maxDist = W * 1.5;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(ox, oy);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const x = (node.x / 100) * W;
        const y = (node.y / 100) * H;
        const pulse = Math.sin(tick * 2 + node.id.toString().length) * 0.3 + 0.7;
        const radius = node.id === "self" ? 6 : 5;

        // Outer glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        gradient.addColorStop(0, node.color + "40");
        gradient.addColorStop(1, node.color + "00");
        ctx.beginPath();
        ctx.arc(x, y, radius * 3 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // "you" label
        if (node.label) {
          ctx.font = "9px system-ui";
          ctx.fillStyle = node.color;
          ctx.fillText(node.label, x + 8, y - 6);
        }
      });

      animationId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [nodes]);

  // Resize canvas to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}