import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

// ==========================================
// RADIAL CURSOR REVEAL WORD ("Visibility.")
// ==========================================
// Add inside Site.jsx
export function RadialRevealWord({
  children = "Visibility.",
  lightColor = "#c7caff", // Light lavender when cursor is away
  originalColor = "#3f6cd4", // Original blue revealed radially on hover
  size = 150, // Size of the radial spotlight in px
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const currentRadius = hovered ? size : 0;
  const radialMask = `radial-gradient(${currentRadius}px circle at ${coords.x}px ${coords.y}px, #000 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.2) 75%, transparent 100%)`;

  return (
    <span
      ref={ref}
      onMouseEnter={(e) => {
        handleMove(e);
        setHovered(true);
      }}
      onMouseMove={handleMove}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-block cursor-pointer select-none"
    >
      {/* 1. Default Light State */}
      <span style={{ color: lightColor }}>{children}</span>

      {/* 2. Radial Original Blue Reveal on Cursor Hover */}
      <span
        aria-hidden="true"
        style={{
          color: originalColor,
          WebkitMaskImage: radialMask,
          maskImage: radialMask,
          transition: hovered
            ? "none"
            : "-webkit-mask-image 0.35s ease, mask-image 0.35s ease",
        }}
        className="pointer-events-none absolute inset-0"
      >
        {children}
      </span>
    </span>
  );
}
// ==========================================
// HERO SECTION
// ==========================================
export function Hero() {
  const headlineLines = [
    { text: "Real Professionals.", highlight: false },
    { text: "Measurable ", highlight: "Visibility." },
    { text: "Lasting Credibility.", highlight: false },
  ];

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-[#1a2b6b]/15 bg-white/80 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[.22em] text-[#1a2b6b] shadow-xs backdrop-blur-md"
        >
          <Sparkles size={12} className="text-[#3f6cd4]" />
          LinkedIn Personal Branding & Executive Ghostwriting
        </motion.div>

        {/* Staggered Line-by-Line Reveal + Radial "Visibility." */}
        <h1 className="font-display mt-7 max-w-5xl text-5xl font-medium leading-[1.02] tracking-[-.05em] text-[#171a2e] sm:text-6xl md:text-7xl lg:text-[84px]">
          {headlineLines.map((line, index) => (
            <span key={index} className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.75,
                  delay: 0.12 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {line.text}
                {line.highlight && (
                  <RadialRevealWord
                    baseColor="text-[#b4b7f7]"
                    revealColor="text-[#3f6cd4]"
                    radius={145}
                  >
                    {line.highlight}
                  </RadialRevealWord>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Supporting Subtext & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.52,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 flex flex-col items-start justify-between gap-8 border-t border-[#1a2b6b]/10 pt-8 md:flex-row md:items-end"
        >
          <p className="max-w-xl text-base leading-relaxed text-[#62677e] md:text-lg">
            Every personal brand has a different story. We help translate your
            expertise into a recognisable voice that builds trust, reaches
            decision-makers, and creates meaningful opportunities.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#1a2b6b] px-6 py-3.5 text-xs font-extrabold uppercase tracking-[.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3f6cd4] hover:shadow-lg hover:shadow-[#3f6cd4]/25"
            >
              Explore Case Studies
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// HEADER
// ==========================================
export function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const scrollUp = useRef(0);
  const scrollDown = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      const difference = currentY - lastScrollY.current;

      setScrolled(currentY > 24);

      if (currentY <= 10) {
        setVisible(true);
        scrollUp.current = 0;
        scrollDown.current = 0;
      } else if (difference > 0) {
        scrollDown.current += difference;
        scrollUp.current = 0;

        if (scrollDown.current > 8) {
          setVisible(false);
          setOpen(false);
        }
      } else if (difference < 0) {
        scrollUp.current += Math.abs(difference);
        scrollDown.current = 0;

        if (scrollUp.current > 4) {
          setVisible(true);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Case studies" },
    { to: "/faqs", label: "FAQs" },
  ];

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: visible ? "0%" : "-110%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-[#1a2b6b]/12 bg-[#fffdf9]/90 shadow-[0_8px_30px_rgb(26,43,107,0.04)] backdrop-blur-xl"
            : "border-[#1a2b6b]/10 bg-[#fffdf9]/80 backdrop-blur-md"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
          {/* Logo with subtle spring hover */}
          <Link
            to="/"
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <motion.span
              whileHover={{ rotate: -6, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="grid h-9 w-9 place-items-center rounded-xl bg-[#1a2b6b] text-sm font-extrabold text-white transition-colors group-hover:bg-[#3f6cd4]"
            >
              i.
            </motion.span>

            <span className="font-display text-[17px] font-bold tracking-[-.04em]">
              incredible<span className="text-[#3f6cd4]">.</span>
              <span className="mt-1 block font-sans text-[8px] font-bold uppercase tracking-[.2em] text-[#62677e]">
                Corporate Communications
              </span>
            </span>
          </Link>

          {/* Desktop navigation with animated active indicator */}
          <nav className="hidden items-center gap-8 text-xs font-bold md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative py-1 transition-colors ${
                    isActive
                      ? "text-[#1a2b6b]"
                      : "text-[#62677e] hover:text-[#1a2b6b]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-[#3f6cd4]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:hello@incrediblecomms.com"
              className="group inline-flex items-center gap-2 rounded-full bg-[#1a2b6b] px-5 py-3 text-white transition-colors hover:bg-[#3f6cd4]"
            >
              Start a conversation
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-[#1a2b6b]/15 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-[#1a2b6b]/10 px-5 md:hidden"
            >
              <div className="flex flex-col gap-5 py-6 text-sm font-bold">
                <Link to="/" onClick={() => setOpen(false)}>
                  Case studies
                </Link>
                <Link to="/faqs" onClick={() => setOpen(false)}>
                  FAQs
                </Link>
                <a
                  href="mailto:hello@incrediblecomms.com"
                  className="text-[#3f6cd4]"
                >
                  Start a conversation ↗
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Space reserved for navbar */}
      <div className="h-[73px]" />
    </>
  );
}

// ==========================================
// CALL TO ACTION
// ==========================================
export function CTA() {
  return (
    <section className="bg-gradient-to-b from-[#e8e3f7] via-[#f4f0fa] to-[#fffdf9] px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-[#1a2b6b] px-7 py-12 text-white md:px-16 md:py-16"
      >
        {/* Subtle breathing decorative circles */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-20 -top-48 h-[440px] w-[440px] rounded-full border border-white/15"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-36 right-16 h-[280px] w-[280px] rounded-full border border-[#b4b7f7]/15"
        />

        <p className="text-[10px] font-extrabold uppercase tracking-[.25em] text-[#b4b7f7]">
          Your next chapter
        </p>

        <h2 className="font-display mt-6 max-w-3xl text-5xl font-medium leading-[.98] tracking-[-.055em] md:text-7xl">
          Your expertise deserves to be{" "}
          <RadialRevealWord
            baseColor="text-[#b4b7f7]"
            revealColor="text-[#38bdf8]"
            radius={120}
          >
            seen.
          </RadialRevealWord>
        </h2>

        <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">
          Let's turn your experience into a personal brand people recognise,
          trust and remember.
        </p>

        <motion.a
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="mailto:hello@incrediblecomms.com"
          className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#fffdf9] px-6 py-4 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#1a2b6b] shadow-lg transition-colors hover:bg-[#b4b7f7]"
        >
          Book a free discovery call
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.a>
      </motion.div>
    </section>
  );
}

// ==========================================
// FOOTER
// ==========================================
export function Footer() {
  return (
    <footer className="bg-[#121b42] px-5 py-12 text-white md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 md:flex-row">
        <div>
          <p className="font-display text-3xl font-semibold">
            Your expertise deserves
            <br />
            to be <span className="text-[#b4b7f7]">recognised.</span>
          </p>

          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            Confidential personal branding and executive ghostwriting for people
            with something worth saying.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-white/70">
          <Link to="/" className="transition-colors hover:text-[#b4b7f7]">
            Case studies
          </Link>
          <Link to="/faqs" className="transition-colors hover:text-[#b4b7f7]">
            FAQs
          </Link>
          <a
            href="mailto:hello@incrediblecomms.com"
            className="transition-colors hover:text-[#b4b7f7]"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col justify-between gap-3 border-t border-white/15 pt-5 text-[10px] uppercase tracking-[.16em] text-white/40 md:flex-row">
        <span>
          © {new Date().getFullYear()} Incredible Corporate Communications
        </span>
        <span>Building visibility. Keeping credibility.</span>
      </div>
    </footer>
  );
}

// ==========================================
// SCROLL TO TOP ON ROUTE CHANGE
// ==========================================
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}