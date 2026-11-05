import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Showcase from "../components/Showcase";
import { CTA, RadialRevealWord } from "../components/Site";

const EASE = [0.22, 1, 0.36, 1];

export default function Home() {
  const heroRef = useRef(null);

  // Subtle editorial scroll parallax for the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rightCardY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const heroTitleY = useTransform(scrollYProgress, [0, 1], [0, 25]);

  const supportingWords =
    "Confidential personal brands. Distinctive points of view. Professional visibility built with intention.".split(
      " "
    );

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-[#fffdf9] px-5 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24"
      >
        {/* Subtle ambient glowing orb that drifts softly in the hero background */}
        <motion.div
          aria-hidden
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-24 left-1/3 z-0 h-[420px] w-[420px] rounded-full bg-[#b4b7f7]/20 blur-[110px]"
        />

        {/* Short white → lavender fade, sitting inside the bottom of the hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[130px] bg-gradient-to-b from-[#fffdf9] via-[#f1ecfa] to-[#e8e3f7] md:h-[180px]"
        />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          {/* Hero layout */}
          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,.8fr)]">
            {/* Left: Main heading */}
            <motion.div style={{ y: heroTitleY }} className="max-w-4xl">
              {/* Eyebrow with expanding horizontal line */}
              <div className="ml-2 flex items-center gap-3 overflow-hidden">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="h-[2px] w-7 origin-left bg-[#3f6cd4]"
                />
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
                  className="text-[15px] font-extrabold uppercase tracking-[.24em] text-[#3f6cd4]"
                >
                  Case studies
                </motion.p>
              </div>

              {/* 3-Line Curtain Clip Reveal Headline */}
              <h1 className="font-display mt-6 text-[3.5rem] font-medium leading-[.96] tracking-[-.065em] text-[#171a2e] md:text-[clamp(3.8rem,6.8vw,7rem)]">
                {/* Line 1 */}
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: "110%", rotateZ: 1.5, opacity: 0 }}
                    animate={{ y: "0%", rotateZ: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
                    className="block origin-bottom-left"
                  >
                    Real Professionals.
                  </motion.span>
                </span>

                {/* Line 2 (with RadialRevealWord) */}
                <span className="block overflow-hidden pb-2">
                  <motion.span
                    initial={{ y: "110%", rotateZ: 1.5, opacity: 0 }}
                    animate={{ y: "0%", rotateZ: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
                    className="block origin-bottom-left"
                  >
                    Measurable{" "}
                    <RadialRevealWord
                      lightColor="#8f96ff"
                      originalColor="#1756e8"
                      size={160}
                    >
                      Visibility.
                    </RadialRevealWord>
                  </motion.span>
                </span>

                {/* Line 3 */}
                <span className="block overflow-hidden pb-2">
                  <motion.span
                    initial={{ y: "110%", rotateZ: 1.5, opacity: 0 }}
                    animate={{ y: "0%", rotateZ: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.42, ease: EASE }}
                    className="block origin-bottom-left"
                  >
                    Lasting Credibility.
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            

    
          </div>

          {/* Supporting description — Word-by-word blur-to-crisp reveal */}
          <p className="mt-7 flex max-w-2xl flex-wrap gap-x-1.5 text-base leading-8 text-[#62677e]">
            {supportingWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: 0.65 + idx * 0.04,
                  ease: EASE,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>
      </section>

      {/* Showcase */}
      <Showcase />

      {/* Call to action */}
      <CTA />
    </main>
  );
}