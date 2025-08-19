"use client";

import gsap from "gsap";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface NavigationProps {
  muted: boolean;
  setMuted: (value: boolean) => void;
}

export default function Navigation({ muted, setMuted }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (menuOpen) {
      // Reset overlay off-screen before animating
      gsap.set(overlayRef.current, { x: "-100%", autoAlpha: 1 });

      // Slide overlay in
      gsap.to(overlayRef.current, {
        x: "0%",
        duration: 0.6,
        ease: "power2.out",
      });

      // Animate menu items with stagger
      gsap.fromTo(
        itemsRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      // Slide overlay out
      gsap.to(overlayRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { autoAlpha: 0 });
        },
      });
    }
  }, [menuOpen]);

  return (
    <>
      {/* Vertical Navigation (Left side) */}
      <div className="absolute inset-y-0 left-0 flex flex-col items-center justify-between py-6 text-white text-xs tracking-wide border-r-2 border-gray-300 z-20">
        {/* Top Text */}
        <span className="rotate-180 [writing-mode:vertical-rl]">
          By Kachi Benson
        </span>

        {/* Menu Icon */}
        <button
          onClick={() => setMenuOpen(true)} // ✅ now opens overlay
          className="p-2 hover:text-yellow-500 transition cursor-pointer"
        >
          <Menu size={24} />
        </button>

        {/* Bottom Text + Sound Toggle */}
        <div className="flex flex-col items-center space-y-4">
          <span className="rotate-180 [writing-mode:vertical-rl] text-center">
            Powered by Uwaosi Rhoda Foundation
          </span>
          <button
            onClick={() => setMuted(!muted)}
            className="hover:text-yellow-500 transition"
          >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>

      {/* Fullscreen Navigation Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-95 z-30 flex flex-col items-center justify-center text-white text-4xl font-bold opacity-0"
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)} // ✅ closes overlay
          className="absolute top-6 left-6 text-white hover:text-yellow-500 transition"
        >
          <X size={28} />
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col items-center space-y-10">
          {[
            "THE FILM",
            "THE MOTHERS",
            "THE IMPACT",
            "ABOUT / CONTACT",
            "DONATE",
          ].map((label, i) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="opacity-0 hover:text-yellow-500 transition"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
