"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/common/Navigation";

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);

  // Animation variants for cinematic text reveal
  const letterAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.6 },
    }),
  };

  const subtitleAnimation: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.05 + 0.6, duration: 0.4 },
    }),
  };

  const title = "Mothers of Chibok";
  const subtitle =
    "A story of hope, resilience, and healing, through mothers, memory, and peanuts";

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/video/moc-video.mp4"
        autoPlay
        loop
        muted={muted}
      />

      {/* Overlay with Fade-in Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-black"
      />

      {/* Navigation Component */}
      <Navigation muted={muted} setMuted={setMuted} />

      {/* Top Right Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-4 right-6 text-white font-bold text-xl"
      >
        <Image
          src="/assets/images/moc-logo.png"
          alt="Mothers of Chibok Awards"
          width={80}
          height={80}
        />
      </motion.div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center  h-full text-center text-white px-6">
        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-2"
        >
          <Image
            src="/assets/images/moc-awards-logo.png"
            alt="Mothers of Chibok Awards"
            width={150}
            height={150}
          />
        </motion.div>

        {/* Title with cinematic reveal */}
        <h1 className="text-4xl sm:text-5xl md:text-[165px] font-afolkalips tracking-tight4 leading-0 flex flex-wrap justify-center text-white">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle with fade-in word sequence */}
        <p className="text-[21px] tracking-tight3 font-normal max-w-xs sm:max-w-md md:max-w-3xl -mt-7 mb-2 flex flex-wrap font-productsFont text-white">
          {subtitle.split(" ").map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={subtitleAnimation}
              initial="hidden"
              animate="visible"
              className="mr-1"
            >
              {word}
            </motion.span>
          ))}
        </p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="bg-[#B89C58] hover:bg-yellow-600 text-white font-productsFont tracking-tight3 px-6 py-2 font-medium text-[18px]"
          onClick={() => setOpen(true)}
        >
          Follow the journey
        </motion.button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <DialogContent className="sm:max-w-2xl p-0  overflow-hidden rounded-lg border-none">
              {/* Required accessible title (can be hidden) */}
              <DialogTitle>
                <VisuallyHidden>Sign out confirmation</VisuallyHidden>
              </DialogTitle>

              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="p-6 sm:p-10"
              >
                <p className="text-gray-200 mb-10 text-sm">
                  <span className="pl-20">
                    The headlines may have faded, and the world may have moved
                    on
                  </span>
                  <br />
                  <span className="pl-10">
                    But in Chibok, the mothers still carry faith like a seed in
                    their hands.
                  </span>{" "}
                  <br />
                  <span className="pl-24">
                    Send them a short message of hope as they continue to wait.
                  </span>
                </p>
                <div className="mt-4 space-y-4 max-w-md mx-auto">
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-3 bg-gray-800 text-white placeholder-gray-500 rounded-md"
                  />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full p-3 bg-gray-800 text-white placeholder-gray-500 rounded-md"
                  />
                  <Button className="mt-4 w-full bg-[#B89C58] hover:bg-yellow-600 text-white">
                    Join the journey
                  </Button>
                </div>

                <div className="text-center mt-32">
                  <Button
                    onClick={() => setOpen(false)}
                    className="mt-4 text-white text-center gap-2"
                  >
                    <span>
                      Close <br />
                      <X className="w-4 h-4 ml-2" />
                    </span>
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 right-6 text-[18px] text-white tracking-tight3 z-10"
      >
        Hope, resilience, and healing.
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          delay: 2.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white text-[18px] tracking-tight3 z-10"
      >
        <a
          href="#"
          className="cursor-pointer text-center flex flex-col items-center"
        >
          <span>Scroll</span>
          <span className="-mt-2">↓</span>
        </a>
      </motion.div>
    </div>
  );
}
