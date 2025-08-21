"use client";

import gsap from "gsap";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface NavigationProps {
  muted: boolean;
  setMuted: (value: boolean) => void;
}

const MENU_ITEMS = [
  {label: "The Film", image: "/assets/images/moc-the-film-bckground.png", href: "#the-film"}, 
  {label: "The Mothers", image: "/assets/images/moc-the-mothers-bckground.png", href: "#the-film"}, 
  {label: "The Impact", image: "/assets/images/moc-the-impact-bckground.png", href: "#the-film"}, 
  {label: "About/Contact", image: "/assets/images/moc-contact-bckground.png", href: "#the-film"}, 
  {label: "Donate", image: "/assets/images/moc-donate-bckground.png", href: "#the-film"},
]

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
      <div className="absolute inset-y-0 left-0 flex flex-col items-center justify-between py-6 px-4 text-white text-xs tracking-wide border-l-0 border-r-2 border-[#818181] z-40">
        {/* Top Text */}
        <span className="rotate-180 font-productsFont tracking-tight3 text-[18px] [writing-mode:vertical-rl]">
          By Kachi Benson
        </span>

        {/* Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)} // ✅ now opens overlay
          className="p-2 hover:text-yellow-500 transition cursor-pointer"
        >
          {menuOpen ? <X size={20} /> : <Image src="/assets/images/menu-icon.png" alt="Mother of Chibok Menu Icon" width={20} height={20} />}
        </button>

        {/* Bottom Text + Sound Toggle */}
        <div className="flex flex-col items-center space-y-4">
          <span className="rotate-180 font-productsFont tracking-tight3 text-[18px] [writing-mode:vertical-rl]">
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
        className="fixed inset-0 flex flex-col z-30 items-center min-h-screen text-white text-4xl font-bold opacity-0"
      >
        {/* Menu Items */}
        <nav className="flex flex-col w-full h-full ml-[140px]">
  {/* First 3 full-width items */}
  {MENU_ITEMS.slice(0, 3).map((item, i) => (
    <a
      key={item.label}
      href={item.href}
      ref={(el) => {
        itemsRef.current[i] = el;
      }}
      className="flex-1 relative flex items-center  text-center text-[#DFDFDF] text-5xl font-productsFont tracking-tight4 opacity-0 group"
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
      <span className="relative z-10 font-afolkalips text-[120px] px-10 py-5">{item.label}</span>
    </a>
  ))}

  {/* Last row: 2-column grid for About/Contact + Donate */}
  <div className="flex flex-1 w-full">
    {MENU_ITEMS.slice(3).map((item, i) => (
      <a
        key={item.label}
        href={item.href}
        ref={(el) => {
          itemsRef.current[i + 3] = el; // offset index since we sliced
        }}
        className="flex-1 relative flex items-center text-center text-[#DFDFDF] text-5xl font-productsFont tracking-tight4 opacity-0 group"
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
        <span className="relative z-10 font-afolkalips text-[120px] px-10 py-5">{item.label}</span>
      </a>
    ))}
  </div>
</nav>


      </div>
    </>
  );
}
