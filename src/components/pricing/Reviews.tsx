"use client";
import React, { useEffect, useState } from "react";

const reviews = [
  {
    name: "Justin L.",
    text: "Happy that I found a girl I could speak to any time",
    rating: 5,
    avatar: "/avatars/avatar1.png",
  },
  {
    name: "Ryan N.",
    text: "The best choice of the girls I’ve ever seen",
    rating: 5,
    avatar: "/avatars/avatar2.png",
  },
  {
    name: "Steve J.",
    text: "I am so happy to have found this service",
    rating: 5,
    avatar: "/avatars/avatar3.png",
  },
  {
    name: "Emma W.",
    text: "Incredible platform and amazing people",
    rating: 5,
    avatar: "/avatars/avatar4.png",
  },
  {
    name: "Michael P.",
    text: "Fantastic customer experience!",
    rating: 5,
    avatar: "/avatars/avatar5.png",
  },
  {
    name: "Sophie K.",
    text: "Exactly what I was looking for!",
    rating: 5,
    avatar: "/avatars/avatar6.png",
  },
];

type Props = {
  duration?: number; // seconds for full loop
};

export default function ReviewsCarousel({ duration = 20 }: Props) {
  const looped = [...reviews, ...reviews];
  const [active, setActive] = useState(0);

  // Auto-change active dot for visual feedback
  useEffect(() => {
    const tickMs = Math.max(300, Math.round((duration * 1000) / reviews.length));
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % reviews.length);
    }, tickMs);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <section className="relative text-white py-12">
      <h2 className="text-center text-2xl md:text-3xl font-semibold">
        Over <span className="text-pink-500 font-bold">300k</span> 5-star reviews
      </h2>

      <div className="mt-8 relative">
        {/* Left & Right gradient fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 md:w-32 z-20 bg-gradient-to-r from-[var(--gray-dark)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 md:w-32 z-20 bg-gradient-to-l from-[var(--gray-dark)] to-transparent" />

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              gap: "32px",
              animation: `scroll ${duration}s linear infinite`,
            }}
          >
            {looped.map((r, idx) => (
              <article
                key={`${r.name}-${idx}`}
                className="review-card w-[260px] sm:w-[300px] md:w-[340px] flex-shrink-0"
                aria-label={`Review by ${r.name}`}
              >
                {/* Avatar + Name + Stars */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-800">
                    <svg width="40" height="43" viewBox="0 0 40 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="_avatarIcon_1s51v_38"><path d="M28.5002 26.8438C31.2918 26.8439 33.9757 27.9218 35.992 29.8525C38.0083 31.7833 39.2015 34.4179 39.3227 37.2069L39.3335 37.6771V39.8438C39.3338 40.937 38.921 41.99 38.1776 42.7916C37.4342 43.5932 36.4153 44.0843 35.3252 44.1663L35.0002 44.1771H4.66683C3.57358 44.1774 2.5206 43.7645 1.71898 43.0212C0.917349 42.2778 0.426323 41.2589 0.34433 40.1688L0.333496 39.8438V37.6771C0.333657 34.8854 1.4115 32.2016 3.34226 30.1852C5.27302 28.1689 7.90762 26.9757 10.6967 26.8546L11.1668 26.8438H28.5002ZM19.8335 0.84375C22.7067 0.84375 25.4622 1.98512 27.4938 4.01676C29.5255 6.0484 30.6668 8.8039 30.6668 11.6771C30.6668 14.5503 29.5255 17.3058 27.4938 19.3374C25.4622 21.3691 22.7067 22.5104 19.8335 22.5104C16.9603 22.5104 14.2048 21.3691 12.1732 19.3374C10.1415 17.3058 9.00016 14.5503 9.00016 11.6771C9.00016 8.8039 10.1415 6.0484 12.1732 4.01676C14.2048 1.98512 16.9603 0.84375 19.8335 0.84375Z" fill="currentcolor"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <div className="mt-1 flex items-center gap-1" aria-hidden>
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-yellow-400"
                        >
                          <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-gray-400 text-sm leading-relaxed min-h-[48px]">
                  {r.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to review ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all duration-200 ${
              i === active ? "bg-pink-500 w-4" : "bg-gray-600"
            }`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <style jsx>{`
        .review-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 32px;
          padding: 32px;
          border-radius: 24px;
          border: 2px solid rgba(24, 24, 24, 0.25);
          background: var(--gray-dark);
          color: white;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
