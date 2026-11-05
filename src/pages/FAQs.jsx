import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight, Calendar, CheckCircle2 } from "lucide-react";
import { RadialRevealWord } from "../components/Site";
import brandJourney from "../assets/brand-journey.jpeg";

const EASE = [0.22, 1, 0.36, 1];

const faqItems = [
  {
    number: "01",
    label: "Executive voice",
    question:
      "How can a team of young writers represent the voice of senior executives?",
    answer:
      "We begin by learning the executive’s language, experiences, opinions and professional context. Through structured conversations, research and iterative editing, we build a voice guide that keeps drafts grounded in the client’s perspective. Provisional answer — confirm the agency’s actual process.",
    boxTag: "VOICE ARCHITECTURE",
    boxHighlight: "Voice Guide",
    boxSub: "Built before we write a single post.",
    boxRows: [
      ["01.1", "Language & vocabulary audit"],
      ["01.2", "Structured executive conversations"],
      ["01.3", "Iterative editing & tone calibration"],
    ],
  },
  {
    number: "02",
    label: "Expected results",
    question: "What results can I expect from personal branding?",
    answer:
      "The aim is to build consistent visibility, a recognisable point of view and relevant professional conversations. Reach, engagement, audience growth, profile activity and qualified opportunities may be measured. Outcomes vary and specific results are not guaranteed.",
    boxTag: "KEY OUTCOMES",
    boxHighlight: "Credibility",
    boxSub: "Consistent visibility with the right audience.",
    boxRows: [
      ["02.1", "Reach & out-of-network discovery"],
      ["02.2", "Meaningful peer engagement"],
      ["02.3", "Profile activity & conversations"],
    ],
  },
  {
    number: "03",
    label: "Research & interviews",
    question:
      "Do you research content on my behalf or is it completely based on interviews?",
    answer:
      "A content programme can combine executive interviews, independent research, industry developments and the client’s own expertise. The final balance should reflect the agency’s approved workflow.",
    boxTag: "CONTENT INPUTS",
    boxHighlight: "Hybrid Model",
    boxSub: "Your lived insight + our editorial research.",
    boxRows: [
      ["03.1", "Focused executive interviews"],
      ["03.2", "Independent sector & macro research"],
      ["03.3", "Timely industry commentary"],
    ],
  },
  {
    number: "04",
    label: "Tone authenticity",
    question: "How do you make sure the content sounds like me?",
    answer:
      "We learn from existing writing, interviews, preferred vocabulary, opinions and feedback. Drafts are reviewed and refined so the voice becomes more consistent over time.",
    boxTag: "AUTHENTICITY LOOP",
    boxHighlight: "100% You",
    boxSub: "Refined continuously through direct feedback.",
    boxRows: [
      ["04.1", "Past writing & keynote analysis"],
      ["04.2", "Preferred phrasing & cadence capture"],
      ["04.3", "Line-by-line draft refinement"],
    ],
  },
  {
    number: "05",
    label: "LinkedIn engagement",
    question: "Do you manage comments and LinkedIn engagement?",
    answer:
      "Engagement support may include identifying relevant conversations, preparing thoughtful responses and helping maintain a consistent presence. Exact scope and approval processes need agency confirmation.",
    boxTag: "NETWORK PRESENCE",
    boxHighlight: "Active Dialogue",
    boxSub: "Thoughtful visibility beyond your own posts.",
    boxRows: [
      ["05.1", "Identifying high-value industry threads"],
      ["05.2", "Drafting insightful executive replies"],
      ["05.3", "Approval-first engagement workflow"],
    ],
  },
  {
    number: "06",
    label: "Time investment",
    question: "How much time do I need to invest every week?",
    answer:
      "The intention is to make the process manageable through planned interviews, focused inputs and an agreed approval rhythm. The time commitment depends on the service scope.",
    boxTag: "EXECUTIVE RHYTHM",
    boxHighlight: "Low Friction",
    boxSub: "Designed around a demanding schedule.",
    boxRows: [
      ["06.1", "Planned interview sessions"],
      ["06.2", "Quick async voice-note inputs"],
      ["06.3", "Streamlined batch approvals"],
    ],
  },
  {
    number: "07",
    label: "Confidentiality",
    question: "Is ghostwriting confidential?",
    answer:
      "Confidentiality is central to this service positioning. Client identities and working arrangements are not disclosed publicly unless explicit permission has been provided.",
    boxTag: "PRIVACY PROTOCOL",
    boxHighlight: "Strict NDA",
    boxSub: "The person stays in the spotlight.",
    boxRows: [
      ["07.1", "100% confidential working arrangement"],
      ["07.2", "No public client attribution without consent"],
      ["07.3", "Full client ownership of all drafts"],
    ],
  },
  {
    number: "08",
    label: "Performance tracking",
    question: "How do you measure performance?",
    answer:
      "Performance can be reviewed through agreed reporting periods and metrics such as impressions, members reached, engagement, follower growth, profile activity and relevant conversations.",
    boxTag: "REPORTING METRICS",
    boxHighlight: "Clear Data",
    boxSub: "Measured across agreed reporting windows.",
    boxRows: [
      ["08.1", "Impressions & unique members reached"],
      ["08.2", "Follower growth & profile activity"],
      ["08.3", "Relevant executive conversations"],
    ],
  },
];

function StackingFaqCard({
  item,
  index,
  total,
  scrollYProgress,
  onBecomeActive,
}) {
  const cardRef = useRef(null);

  // Detect when this card is in the active reading zone to highlight the left index
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start 58%", "end 32%"],
  });

  useMotionValueEvent(cardScroll, "change", (val) => {
    if (val > 0.05 && val < 0.95) {
      onBecomeActive(index);
    }
  });

  // Smooth scale-down as subsequent cards stack over this card
  const startScale = index / total;
  const targetScale = 1 - (total - index) * 0.022;
  const scale = useTransform(
    scrollYProgress,
    [startScale, 1],
    [1, Math.max(0.87, targetScale)]
  );

  // Progressive sticky top offset so previous cards remain visible as a physical stack
  const stickyTop = 96 + index * 15;

  return (
    <div
      ref={cardRef}
      id={`faq-stack-card-${index}`}
      style={{ top: `${stickyTop}px` }}
      className="sticky mb-10 last:mb-0 md:mb-14"
    >
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className="overflow-hidden rounded-[24px] border border-[#1a2b6b]/12 bg-white p-6 shadow-[0_18px_48px_rgba(26,43,107,0.08)] md:rounded-[28px] md:p-9"
      >
        <div className="grid items-stretch gap-7 md:grid-cols-[1.15fr_0.9fr] md:gap-9">
          {/* Left Half of Card: Question & Answer */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-block font-mono text-xs font-extrabold tracking-[.16em] text-[#3f6cd4]">
                {item.number}
              </span>

              <h2 className="font-display mt-3 text-2xl font-medium leading-[1.2] tracking-[-.035em] text-[#1a2b6b] md:text-[28px]">
                {item.question}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#62677e] md:text-[15px]">
                {item.answer}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-2 border-t border-[#1a2b6b]/10 pt-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#1a2b6b]/70">
                <CheckCircle2 size={13} className="text-[#3f6cd4]" />
                {item.label}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[.14em] text-[#a0a4b3]">
                Provisional answer · confirm with agency
              </span>
            </div>
          </div>

          {/* Right Half of Card: Visual Summary Box (Matching the Video) */}
          <div className="flex flex-col justify-between rounded-[20px] border border-[#b4b7f7]/45 bg-[#f7f5fd] p-5 md:p-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[#3f6cd4]">
                  {item.boxTag}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#3f6cd4]" />
              </div>

              <p className="font-display mt-4 text-3xl font-semibold tracking-[-.045em] text-[#1a2b6b] md:text-4xl">
                {item.boxHighlight}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#62677e]">
                {item.boxSub}
              </p>
            </div>

            <div className="mt-6 space-y-2 border-t border-[#1a2b6b]/10 pt-4">
              {item.boxRows.map(([code, text]) => (
                <div
                  key={code}
                  className="flex items-center gap-2.5 rounded-xl border border-[#1a2b6b]/6 bg-white px-3 py-2 text-xs shadow-[0_2px_6px_rgba(26,43,107,0.03)]"
                >
                  <span className="font-mono text-[10px] font-extrabold text-[#3f6cd4]">
                    {code}
                  </span>
                  <span className="font-medium text-[#171a2e]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function FAQs() {
  const stackSectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stackSectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress bar scale for the left tracker
  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0.12, 1]);

  const scrollToCard = (index) => {
    const el = document.getElementById(`faq-stack-card-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const supportingWords =
    "Everything you need to know about how we capture your voice, protect your confidentiality, and turn your expertise into lasting LinkedIn credibility.".split(
      " "
    );

  return (
    <main>
      {/* 1. HERO SECTION (Same large typography, reveal & radial hover as Case Study / Home page) */}
      <section className="relative isolate overflow-hidden bg-[#fffdf9] px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        {/* Soft white → lavender fade at the bottom of the hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[130px] bg-gradient-to-b from-[#fffdf9] via-[#f1ecfa] to-[#e8e3f7] md:h-[180px]"
        />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="max-w-4xl">
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
                FAQs
              </motion.p>
            </div>

            {/* Large Curtain-Reveal Heading + Radial Hover on "answered" */}
            <h1 className="font-display mt-6 text-[3.5rem] font-medium leading-[.96] tracking-[-.065em] text-[#171a2e] md:text-[clamp(3.8rem,6.8vw,7rem)]">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "110%", rotateZ: 1.5, opacity: 0 }}
                  animate={{ y: "0%", rotateZ: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
                  className="block origin-bottom-left"
                >
                  All your questions,
                </motion.span>
              </span>

              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "110%", rotateZ: 1.5, opacity: 0 }}
                  animate={{ y: "0%", rotateZ: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
                  className="block origin-bottom-left"
                >
                  <RadialRevealWord
                    lightColor="#8f96ff"
                    originalColor="#1756e8"
                    size={170}
                  >
                    answered
                  </RadialRevealWord>{" "}
                  here.
                </motion.span>
              </span>
            </h1>

            {/* Supporting Description — Word-by-word blur-to-crisp reveal */}
            <p className="mt-8 flex max-w-2xl flex-wrap gap-x-1.5 text-base leading-8 text-[#62677e] md:text-lg">
              {supportingWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + idx * 0.03,
                    ease: EASE,
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* 2. LEFT-RIGHT SPLIT SECTION: Sticky 01–08 Index Tracker (Left) + Stacking Cards (Right) */}
      <section className="bg-gradient-to-b from-[#e8e3f7] via-[#f4f0fa] to-[#fffdf9] px-5 py-14 md:px-10 md:py-24">
        <div
          ref={stackSectionRef}
          className="mx-auto max-w-[1440px] lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start lg:gap-14 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-20"
        >
          {/* LEFT COLUMN: Clean 01–08 Tracking Index + Progress Indicator Only */}
          <aside className="mb-10 hidden lg:sticky lg:top-32 lg:mb-0 lg:block">
            <div className="rounded-[22px] border border-[#1a2b6b]/10 bg-white/80 p-6 shadow-[0_10px_30px_rgba(26,43,107,0.05)] backdrop-blur-md">
              {/* Top Progress Counter */}
              <div className="flex items-center justify-between border-b border-[#1a2b6b]/10 pb-3.5 text-[10px] font-extrabold uppercase tracking-[.2em] text-[#62677e]">
                <span>Index</span>
                <span className="font-mono text-[#3f6cd4]">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(faqItems.length).padStart(2, "0")}
                </span>
              </div>

              {/* 01 – 08 List with Vertical Scroll Progress Line */}
              <div className="relative mt-4 pl-4">
                {/* Background track line */}
                <div className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-[#1a2b6b]/10" />

                {/* Active scroll progress fill line */}
                <motion.div
                  style={{ scaleY: progressScaleY }}
                  className="absolute bottom-2 left-0 top-2 w-[2px] origin-top rounded-full bg-[#3f6cd4]"
                />

                <ul className="space-y-1.5">
                  {faqItems.map((item, idx) => {
                    const isActive = activeIndex === idx;
                    const isPassed = idx < activeIndex;

                    return (
                      <li key={item.number}>
                        <button
                          type="button"
                          onClick={() => scrollToCard(idx)}
                          className={`group flex w-full cursor-pointer items-center gap-3.5 rounded-lg px-2.5 py-2 text-left text-xs transition-all duration-200 ${
                            isActive
                              ? "bg-[#e8e3f7]/70 font-extrabold text-[#1a2b6b]"
                              : isPassed
                                ? "font-semibold text-[#1a2b6b]/70 hover:text-[#1a2b6b]"
                                : "font-medium text-[#62677e]/60 hover:text-[#1a2b6b]"
                          }`}
                        >
                          <span
                            className={`font-mono text-[11px] transition-colors ${
                              isActive
                                ? "font-extrabold text-[#3f6cd4]"
                                : "text-[#62677e]/50 group-hover:text-[#3f6cd4]"
                            }`}
                          >
                            {item.number}
                          </span>

                          <span className="truncate">{item.label}</span>

                          {isActive && (
                            <motion.span
                              layoutId="faq-active-pill"
                              className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[#3f6cd4]"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Scroll-Driven Stacking FAQ Cards */}
          <div className="relative pb-6">
            {faqItems.map((item, index) => (
              <StackingFaqCard
                key={item.number}
                item={item}
                index={index}
                total={faqItems.length}
                scrollYProgress={scrollYProgress}
                onBecomeActive={setActiveIndex}
              />
            ))}
          </div>
        </div>

        {/* 3. POST-STACK DISCOVERY CALL SECTION (Right before Footer) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-16 max-w-[1440px] md:mt-24"
        >
          <div className="relative overflow-hidden rounded-[28px] bg-[#1a2b6b] px-7 py-12 text-white shadow-[0_20px_50px_rgba(26,43,107,0.16)] md:px-16 md:py-16">
            {/* Decorative circle matching brand style */}
            <div className="pointer-events-none absolute -right-20 -top-48 h-[440px] w-[440px] rounded-full border border-white/15" />

            <p className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.25em] text-[#b4b7f7]">
              <Calendar size={13} />
              Direct Consultation
            </p>

            <h2 className="font-display mt-5 max-w-3xl text-4xl font-medium leading-[.98] tracking-[-.05em] md:text-6xl">
              Still have questions?
              <br />
              <span className="text-[#b4b7f7]">
                Book a free discovery call.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 md:text-base">
              Spend 20 minutes with our team to walk through how confidential
              executive ghostwriting and personal brand management work for you.
            </p>

            <a
              href="mailto:hello@incrediblecomms.com?subject=Book%20a%20Free%20Discovery%20Call"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#fffdf9] px-7 py-4 text-[11px] font-extrabold uppercase tracking-[.15em] text-[#1a2b6b] transition-transform duration-300 hover:-translate-y-1"
            >
              Book a free discovery call
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>
      </section>
      
      {/* PERSONAL BRAND JOURNEY — EDITORIAL IMAGE SECTION */}
      <section className="relative isolate overflow-hidden bg-transparent px-5 py-20 md:px-10 md:py-28">

        {/* Lavender ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b4b7f7]/25 blur-[130px]"
        />

        <div className="mx-auto max-w-[1440px]">

          {/* Section introduction */}
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">

            <p className="text-[10px] font-extrabold uppercase tracking-[.25em] text-[#3f6cd4]">
              The personal brand journey
            </p>

            <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] tracking-[-.055em] text-[#171a2e] md:text-6xl">
              From expertise to{" "}
              <span className="text-[#3f6cd4]">influence.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#62677e] md:text-base">
              Every professional has a story worth sharing.
              Sometimes, all it takes is the right perspective,
              a little consistency and the confidence to begin.
            </p>

          </div>

          {/* Artwork frame */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mx-auto max-w-[1320px]"
          >

            {/* Soft outer glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#b4b7f7]/35 via-[#e8e3f7]/30 to-[#3f6cd4]/15 blur-2xl"
            />

            <div className="overflow-hidden rounded-[20px] border border-white/80 bg-white/70 p-2 shadow-[0_25px_80px_rgba(26,43,107,0.12)] backdrop-blur-sm md:rounded-[28px] md:p-3">

              <img
                src={brandJourney}
                alt="An illustrated personal brand journey, from initial hesitation through discovery to professional impact."
                className="block h-auto w-full rounded-[13px] md:rounded-[19px]"
                loading="lazy"
                />

            </div>
          </motion.div>

          {/* Closing statement */}
          <div className="mt-10 text-center md:mt-14">
            <p className="font-display text-xl font-medium tracking-[-.025em] text-[#1a2b6b] md:text-2xl">
              Your personal brand is not about self-promotion.
            </p>

            <p className="mt-2 text-sm leading-7 text-[#62677e]">
              It is about making your expertise visible, valuable and remembered.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}