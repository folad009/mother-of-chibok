"use client";

import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LoaderProps {
  onFinish: () => void;
}

interface Dot {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export default function Loader({ onFinish }: LoaderProps) {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState<Dot[]>([]);

  // 4 sentences => 4 spans (do not split)
  const paragraphParts = [
    "While words can capture some aspects of their essence,",
    "the depth of a mother’s love and connection often transcends mere description. It’s a unique and cherished bond that shapes our lives in countless ways, and it’s essential to honor and appreciate this relationship.",
    "So, whether you use a few words or many,",
    "always express your gratitude and affection for your mother, as she plays a significant role in shaping who you are and how you navigate the world.",
  ];

  // Per-span styling + entry offsets
  const SPAN_CONFIG = [
    { padding: "pl-32", from: { x: 40, y: 12 } },
    { padding: "pl-0", from: { x: -32, y: 16 } },
    { padding: "pl-16", from: { x: 28, y: -18 } },
    { padding: "pl-32", from: { x: -44, y: -10 } },
  ] as const;

  useEffect(() => {
    const tl = gsap.timeline();

    // Vertical line/progress
    tl.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 3,
        ease: "slow(0.9, 0.9, false)",
        onUpdate: () => setProgress(Math.round(tl.progress() * 100)),
      }
    );

    // Paragraph spans: distinct X/Y per span + stagger
    const els = sentenceRefs.current.filter(Boolean) as HTMLSpanElement[];
    tl.fromTo(
      els,
      {
        x: (i) => SPAN_CONFIG[i]?.from.x ?? 0,
        y: (i) => SPAN_CONFIG[i]?.from.y ?? 0,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.7, // cascade
      },
      "+=0.2"
    );

    // Button
    tl.fromTo(
      buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "+=0.4"
    );
  }, []);

  // Dots background logic
  useEffect(() => {
    const count = window.innerWidth < 768 ? 40 : 100;
    const initialDots = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));
    setDots(initialDots);

    let animationFrame: number;
    const animate = () => {
      setDots((prev) =>
        prev.map((dot) => {
          let { x, y, dx, dy } = dot;
          x += dx;
          y += dy;
          if (x < 0 || x > window.innerWidth) dx *= -1;
          if (y < 0 || y > window.innerHeight) dy *= -1;
          return { x, y, dx, dy };
        })
      );
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (!dots.length) return;
    document.querySelectorAll(".dot").forEach((dot) => {
      gsap.to(dot, {
        opacity: Math.random() * 0.6 + 0.2,
        duration: Math.random() * 2 + 1,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay: Math.random() * 2,
      });
    });
  }, [dots]);

  const handleExit = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: onFinish,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-black overflow-hidden"
    >
      {/* Dots */}
      <div className="absolute inset-0 z-0">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="dot absolute rounded-full bg-white"
            style={{
              width: "3px",
              height: "3px",
              left: dot.x,
              top: dot.y,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Foreground */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full space-y-6 px-6">
        {/* Line + progress */}
        <div className="absolute left-8 top-0 bottom-0 flex flex-col items-center justify-between py-4">
          
          <div
            ref={lineRef}
            className="w-px h-full bg-white origin-top scale-y-0"
          />
          <span className="text-sm text-gray-300">{progress}%</span>
        </div>

        {/* Paragraph: 4 spans, each with its own padding */}
        <div
          ref={paragraphRef}
          className="max-w-xl -space-y-1 text-sm text-white leading-relaxed"
        >
          {paragraphParts.map((text, i) => (
            <span
              key={i}
              ref={(el) => {
                sentenceRefs.current[i] = el;
              }}
              className={`block opacity-0 ${SPAN_CONFIG[i]?.padding ?? ""}`}
            >
              {text}
            </span>
          ))}
        </div>


        {/* Button */}
        <button
          ref={buttonRef}
          onClick={handleExit}
          className="absolute bottom-8 px-6 py-3 flex items-center gap-3 text-md text-white transition-opacity opacity-0"
        >
          Enter the site{" "}
          <ArrowRight className="w-4 h-4 bg-white rounded-full text-black" />
        </button>
      </div>
    </div>
  );
}
