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
  duration?: number; // seconds for full loop (desktop)
};

export default function ReviewsCarousel({ duration = 20 }: Props) {
  const looped = [...reviews, ...reviews];
  const [active, setActive] = useState(0);
  const [scrollDuration, setScrollDuration] = useState(duration);

  // Adjust scroll speed for screen size
  useEffect(() => {
    const updateSpeed = () => {
      if (window.innerWidth < 640) {
        setScrollDuration(duration * 1.4); // slower on mobile
      } else {
        setScrollDuration(duration);
      }
    };
    updateSpeed();
    window.addEventListener("resize", updateSpeed);
    return () => window.removeEventListener("resize", updateSpeed);
  }, [duration]);

  // Auto-change active dot
  useEffect(() => {
    const tickMs = Math.max(
      300,
      Math.round((scrollDuration * 1000) / reviews.length)
    );
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % reviews.length);
    }, tickMs);
    return () => clearInterval(interval);
  }, [scrollDuration]);

  return (
    <section className="relative text-white py-12 overflow-hidden max-w-[1300px] w-[calc(100dvw-32px)]">
      <h2 className="text-center text-2xl md:text-3xl font-semibold">
        Over <span className="text-pink-500 font-bold">300k</span> 5-star
        reviews
      </h2>

      <div className="mt-8 relative">
        {/* Left & Right fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-r from-[var(--gray-dark)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-l from-[var(--gray-dark)] to-transparent" />

        <div className="relative overflow-hidden w-full">
          <div
            className="flex w-full"
            style={{
              gap: "32px",
              animation: `scroll ${scrollDuration}s linear infinite`,
            }}
          >
            {looped.map((r, idx) => (
              <article
                key={`${r.name}-${idx}`}
                className="review-card w-[260px] sm:w-[300px] md:w-[340px] flex-shrink-0"
                aria-label={`Review by ${r.name}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center bg-[#1e1e1e]">
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
          gap: 16px;
          padding: 24px;
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
