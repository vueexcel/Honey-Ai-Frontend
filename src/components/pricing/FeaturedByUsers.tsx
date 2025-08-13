"use client";

import React from "react";
// import Image from "next/image";
import { BadgeCheck } from "lucide-react";

const users = [
  {
    name: "Annette Boucher",
    img: "https://get-honey.ai/assets/annette-boucher-Bk3lMaqy.avif",
  },
  {
    name: "Isla Morgan",
    img: "https://get-honey.ai/assets/isla-morgan-C0YXhfYv.avif",
  },
  {
    name: "Veronika Krizova",
    img: "https://get-honey.ai/assets/elena-vasquez-C3OJxykf.avif",
  },
  {
    name: "Olivia Fox",
    img: "https://get-honey.ai/assets/veronika-krizova-DSTrenWx.avif",
  },
  {
    name: "Hana Yamada",
    img: "https://get-honey.ai/assets/hana-yamada-DdSOwvIt.avif",
  },
  {
    name: "Yuki Nakamura",
    img: "https://get-honey.ai/assets/grace-wilson-D8KI5K5n.avif",
  },
  {
    name: "Elena Vasquez",
    img: "https://get-honey.ai/assets/olivia-fox-Ds52S0za.avif",
  },
  {
    name: "Anika Raffaela",
    img: "https://get-honey.ai/assets/anika-raffaela-jDKINcVk.avif",
  },
  {
    name: "Grace Wilson",
    img: "https://get-honey.ai/assets/yuki-nakamura-BxIpfIq-.avif",
  },
];

// Perspective grid/cube sized by its parent (no fixed height)
function PerspectiveGrid() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 996 820" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="grid-stroke" x1="0" y1="0" x2="996" y2="820" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Concentric rectangles */}
      {Array.from({ length: 7 }).map((_, i) => {
        const pad = 28 + i * 60;
        return (
          <rect
            key={i}
            x={pad}
            y={pad}
            width={996 - pad * 2}
            height={820 - pad * 2}
            rx="12"
            stroke="url(#grid-stroke)"
            opacity={0.35 - i * 0.045}
          />
        );
      })}

      {/* Corner + mid-edge rays */}
      <g stroke="url(#grid-stroke)" opacity="0.35">
        <line x1="0" y1="0" x2="498" y2="410" />
        <line x1="996" y1="0" x2="498" y2="410" />
        <line x1="0" y1="820" x2="498" y2="410" />
        <line x1="996" y1="820" x2="498" y2="410" />
        <line x1="498" y1="0" x2="498" y2="410" />
        <line x1="498" y1="820" x2="498" y2="410" />
        <line x1="0" y1="410" x2="498" y2="410" />
        <line x1="996" y1="410" x2="498" y2="410" />
      </g>
    </svg>
  );
}

export default function FeaturedByUsers() {
  return (
    <section className="relative py-12 px-4">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Featured by users</h2>
      <div className="relative mx-auto max-w-[996px] min-h-[860px] pb-6">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          <PerspectiveGrid />
        </div>

        <div className="flex justify-center gap-6 mx-auto">
          <div className="flex flex-col items-center">
            <div className="mt-70">
              <UserCard user={users[0]} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="mt-30">
              <UserCard user={users[1]} />
            </div>
            <div>
              <UserCard user={users[2]} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="mt-0">
              <UserCard user={users[3]} highlight />
            </div>
            <div>
              <UserCard user={users[4]} />
            </div>
            <div>
              <UserCard user={users[5]} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="mt-30">
              <UserCard user={users[6]} />
            </div>
            <div>
              <UserCard user={users[7]} />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mt-70">
              <UserCard user={users[8]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UserCard({ user, highlight = false }: { user: { name: string; img: string }; highlight?: boolean }) {
  return (
    <div
      className={[
        "relative shrink-0 w-[180px] min-w-[180px] max-w-[180px] h-[250px] min-h-[250px] max-h-[250px]",
        "p-3 flex flex-col justify-end items-start gap-2",
        "rounded-[24px] overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md",
        "text-white text-left shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        "transition-transform duration-200 will-change-transform hover:-translate-y-0.5",
        highlight ? "ring-1 ring-emerald-400/80 shadow-[0_0_24px_rgba(16,185,129,0.25)]" : "ring-0",
      ].join(" ")}
    >
      <img
        src={user.img || "/placeholder.svg"}
        alt={user.name}
        fill
        sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 180px"
        className="absolute inset-0 w-full h-full object-cover z-0"
        priority={highlight}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/25 to-black/80" />
      <div className="relative z-10">
        <div
          className="mb-1.5 flex items-center gap-1 text-[13px] text-amber-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
          aria-label="Rating: 5 out of 5 stars"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} aria-hidden="true">
              ★
            </span>
          ))}
        </div>
        <div className="text-[15px] font-semibold leading-tight">{user.name}</div>
        <div className="mt-1 flex items-center gap-1.5 text-[13px] text-white/90">
          <span>Verified</span>
          <BadgeCheck className="h-4 w-4 text-sky-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
