"use client";

import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface LoaderProps {
  onFinish: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // 7 sentences => 7 spans (do not split)
  const paragraphParts = [
    "While words can capture some aspects of their essence,",
    "the depth of a mother's love and connection often transcends mere description.",
    "It's a unique and cherished bond that shapes our lives in countless ways,",
    "and it's essential to honor and appreciate this relationship.",
    "So, whether you use a few words or many,",
    "always express your gratitude and affection for your mother,",
    "as she plays a significant role in shaping who you are and how you navigate the world.",
  ];

  // Per-span styling + entry offsets
  const SPAN_CONFIG = [
    { padding: "pl-32", from: { x: 0, y: 0 } }, 
    { padding: "pl-0", from: { x: 0, y: 0  } }, 
    { padding: "pl-0", from: { x: 0, y: 0  } }, 
    { padding: "pl-0", from: { x: 0, y: 0  } },
    { padding: "pl-16", from: { x: 0, y: 0 } },
    { padding: "pl-32", from: { x: 0, y: 0 } },
    { padding: "pl-32", from: { x: 0, y: 0 } },
  ] as const;

  useEffect(() => {
    const tl = gsap.timeline();

    // Line animation (bottom → top)
    tl.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 3, ease: "power2.out" }
    );

    // logo appears
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=2.5"
    );

    // pulse while the logo is visible
    tl.to(
      logoRef.current,
      {
        scale: 1.1,
        duration: 0.8,
        yoyo: true,
        repeat: 2,
        ease: "power1.inOut",
      },
      "-=1"
    );

    // logo fades out
    tl.to(
      logoRef.current,
      { opacity: 0, duration: 0.8, ease: "power2.inOut" },
      "+=0.5"
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
        duration: 2,
        ease: "power3.out",
        stagger: 0.9, // cascade
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

    // Looping dots animation
    const dots = dotsRef.current.filter(Boolean) as HTMLSpanElement[];
    gsap.to(dots, {
      y: -4,
      opacity: 1,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.2,
    });
  }, []);

  const handleExit = () => {
    if (!containerRef.current) {
      onFinish();
      return;
    }

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
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/loader-moc-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >


        {/* Line + progress */}
       <div className="absolute left-8 top-0 bottom-0 flex flex-col items-center px-4">
        <div
          ref={lineRef}
          className="w-px h-full bg-white origin-bottom scale-y-0"
        />
        <span className="absolute px-2 -left-12 bottom-7 -translate-y-1/2 -rotate-90 font-hahmlet font-thin text-[13px] text-gray-300 animate-pulse">
          Loading
        </span>
      </div>


        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white">
          
          {/* Dots 
          {[0, 1, 2].map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                dotsRef.current[i] = el;
              }}
              className="inline-block w-[4px] h-[4px] rounded-full bg-white opacity-30"
            />
          ))}*/}

          {/* Logo */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 z-20"
        >
          <Image
            src="/assets/images/moc-logo.png"
            alt="Mothers of Chibok Awards"
            width={50}
            height={50}
          />
        </div>

        {/* Paragraph: 4 spans, each with its own padding */}
        <div
          ref={paragraphRef}
          className="max-w-2xl -space-y-1 text-[16px] text-white font-hahmlet font-thin leading-normal tracking-tight8"
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
          className="absolute bottom-8 px-6 py-3 flex items-center gap-3 text-md text-white transition-opacity opacity-0 z-30 font-productsFont tracking-tight4"
        >
          Enter the site{" "}
          <ArrowRight className="w-4 h-4 bg-white rounded-full text-black" />
        </button>
        </div>
    </div>
  );
}
