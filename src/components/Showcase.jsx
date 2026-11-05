import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import {
  Heart,
  MessageCircle,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cases } from "../data/cases";
import { RadialRevealWord } from "./Site";

const EASE = [0.22, 1, 0.36, 1];

// 7-column × 8-row grid with your 17 requested merged cells.
// The remaining five cells stay as individual cards.
const gridCells = [
  // Column 1 — four vertically merged cards
  { row: 1, col: 1, rowSpan: 2 },
  { row: 3, col: 1, rowSpan: 2 },
  { row: 5, col: 1, rowSpan: 2 },
  { row: 7, col: 1, rowSpan: 2 },

  // Column 3 — four vertically merged cards
  { row: 1, col: 3, rowSpan: 2 },
  { row: 3, col: 3, rowSpan: 2 },
  { row: 5, col: 3, rowSpan: 2 },
  { row: 7, col: 3, rowSpan: 2 },

  // Column 4
  { row: 1, col: 4, rowSpan: 3 },

  // Column 5
  { row: 1, col: 5, rowSpan: 3 },
  { row: 5, col: 5, rowSpan: 2 },
  { row: 7, col: 5, rowSpan: 2 },

  // Column 6
  { row: 1, col: 6, rowSpan: 3 },

  // Column 7 — four vertically merged cards
  { row: 1, col: 7, rowSpan: 2 },
  { row: 3, col: 7, rowSpan: 2 },
  { row: 5, col: 7, rowSpan: 2 },
  { row: 7, col: 7, rowSpan: 2 },

  // Remaining individual cards
  { row: 1, col: 2, rowSpan: 1 },
  { row: 3, col: 2, rowSpan: 1 },
  { row: 8, col: 2, rowSpan: 1 },
  { row: 8, col: 4, rowSpan: 1 },
  { row: 8, col: 6, rowSpan: 1 },
];

const samplePosts = [
  "The best financial decisions are rarely made in isolation.",
  "A clear point of view is a leadership advantage.",
  "Transformation begins with the questions we ask.",
  "Expertise becomes influence when it is shared.",
  "The strongest networks are built through relevance.",
  "A business grows when its message is understood.",
  "Good leadership makes complex things clearer.",
  "Consistency turns insight into recognition.",
  "The future of work is still a human question.",
  "A useful conversation can change a business.",
  "Build trust before asking for attention.",
  "The right idea deserves the right audience.",
];

const sampleMetrics = [
  ["Impressions", "1.8M"],
  ["Audience growth", "+42%"],
  ["Members reached", "214K"],
  ["Engagement", "8.6%"],
  ["Profile views", "+36%"],
  ["New followers", "+700"],
  ["Post reach", "74.6K"],
  ["Comments", "186"],
  ["Reactions", "2.4K"],
  ["Search appearances", "+28%"],
  ["Engagements", "2,569"],
  ["Outreach replies", "38"],
];

const tiles = gridCells.map((cell, index) => {
  const caseItem = cases[index % cases.length];
  const isMetric = index % 4 === 1 || index % 7 === 0;
  const isComment = index % 9 === 4;

  // Calculate radial distance from center of the 7x8 grid (col 4, row 4.5)
  // so cards animate outward in a ripple wave
  const centerCol = 4;
  const centerRow = 4.5;
  const cellCenterRow = cell.row + cell.rowSpan / 2;
  const distanceFromCenter = Math.hypot(
    cell.col - centerCol,
    cellCenterRow - centerRow
  );

  return {
    ...cell,
    index,
    distanceFromCenter,
    caseSlug: caseItem.slug,
    caseId: caseItem.id,
    type: isMetric ? "metric" : isComment ? "comment" : "post",
    headline: isMetric
      ? sampleMetrics[index % sampleMetrics.length][0]
      : isComment
        ? "Executive conversation"
        : `Confidential profile · ${caseItem.id}`,
    value: isMetric ? sampleMetrics[index % sampleMetrics.length][1] : null,
    copy: isComment
      ? "A thoughtful perspective. This is exactly the conversation more leaders should be having."
      : samplePosts[index % samplePosts.length],
    reactions: ["842", "1.2K", "2.4K", "756", "980", "1.1K"][index % 6],
    comments: ["47", "73", "186", "52", "71", "94"][index % 6],
    variant: index % 5,
  };
});

function MiniPost({ item, isHovered }) {
  const gradients = [
    "from-[#1A2B6B] to-[#3F6CD4]",
    "from-[#3F6CD4] to-[#AEBBFF]",
    "from-[#173A72] to-[#7FA6E9]",
    "from-[#323C8A] to-[#B4B7F7]",
    "from-[#0E4C91] to-[#80C4E8]",
  ];

  return (
    <div className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[9px] border border-[#1A2B6B]/10 bg-white p-3 shadow-[0_5px_14px_rgba(6,20,65,.2)] transition-all duration-300 group-hover:border-[#3F6CD4]/50 group-hover:shadow-[0_16px_32px_rgba(6,20,65,.38)] sm:rounded-[11px] sm:p-4">
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E8E3F7] text-[7px] font-extrabold text-[#1A2B6B] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#1A2B6B] group-hover:text-white">
          IC
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[7px] font-extrabold text-[#202642] sm:text-[9px]">
            {item.caseId}
          </p>
          <p className="truncate text-[6px] text-[#85899a]">
            Confidential profile · 2d
          </p>
        </div>
        <ArrowUpRight
          size={11}
          className="shrink-0 text-[#3F6CD4] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        />
      </div>

      <p className="mt-2 line-clamp-3 flex-1 text-[8px] font-semibold leading-[1.4] text-[#202642] sm:text-[10px]">
        {item.copy}
      </p>

      <div
        className={`relative mt-2 flex min-h-[28px] items-center overflow-hidden rounded-md bg-gradient-to-r ${gradients[item.variant]} px-2`}
      >
        {/* Subtle shimmer sweep on hover */}
        <motion.div
          initial={false}
          animate={{ x: isHovered ? ["100%", "-100%"] : "100%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        <span className="relative z-10 text-[7px] font-semibold text-white sm:text-[9px]">
          A perspective worth sharing.
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-1 border-b border-[#e9eaf1] pb-1.5 text-[6px] text-[#737991] sm:text-[8px]">
        <span className="flex items-center gap-1">
          <Heart
            size={9}
            className="text-[#3F6CD4] transition-transform duration-300 group-hover:scale-125 group-hover:fill-[#3F6CD4]"
          />
          {item.reactions}
        </span>
        <span>{item.comments} comments</span>
      </div>

      <div className="mt-1.5 flex justify-around text-[7px] font-bold text-[#747b91] transition-colors group-hover:text-[#1A2B6B]">
        <span>Like</span>
        <span>Comment</span>
        <span>Share</span>
      </div>
    </div>
  );
}

function MetricTile({ item, isHovered }) {
  const barHeights = [25, 42, 32, 58, 48, 72, 61, 88];

  return (
    <div className="group flex h-full min-h-0 flex-col rounded-[9px] border border-[#1A2B6B]/10 bg-white p-2 shadow-[0_5px_14px_rgba(6,20,65,.2)] transition-all duration-300 group-hover:border-[#3F6CD4]/50 group-hover:shadow-[0_16px_32px_rgba(6,20,65,.38)] sm:rounded-[11px] sm:p-3">
      <div className="flex items-center justify-between gap-1">
        <p className="line-clamp-2 text-[7px] font-extrabold uppercase tracking-[.06em] text-[#747b91] sm:text-[9px]">
          {item.headline}
        </p>
        <motion.div
          animate={isHovered ? { y: -2, x: 2, scale: 1.15 } : { y: 0, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
        >
          <TrendingUp size={12} className="shrink-0 text-[#3F6CD4]" />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
        className="font-display mt-3 text-[clamp(17px,1.8vw,30px)] font-semibold leading-none tracking-[-.06em] text-[#1A2B6B] transition-colors group-hover:text-[#3F6CD4]"
      >
        {item.value}
      </motion.p>

      {/* Animated Sparkline Bars */}
      <div className="mt-auto flex h-8 items-end gap-[3px] pt-2">
        {barHeights.map((height, i) => (
          <motion.span
            key={i}
            initial={{ height: "0%" }}
            whileInView={{
              height: isHovered
                ? `${Math.min(100, height + ((i % 3) + 1) * 6)}%`
                : `${height}%`,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.1 + i * 0.04,
              ease: EASE,
            }}
            className="flex-1 rounded-t-[2px] bg-gradient-to-t from-[#3F6CD4] to-[#B4B7F7] transition-colors group-hover:from-[#1A2B6B] group-hover:to-[#3F6CD4]"
          />
        ))}
      </div>

      <p className="mt-1 text-[6px] font-bold uppercase tracking-[.08em] text-[#3F6CD4]">
        Illustrative data
      </p>
    </div>
  );
}

function CommentTile({ item, isHovered }) {
  return (
    <div className="group flex h-full min-h-0 flex-col rounded-[9px] border border-[#1A2B6B]/10 bg-white p-3 shadow-[0_5px_14px_rgba(6,20,65,.2)] transition-all duration-300 group-hover:border-[#3F6CD4]/50 group-hover:shadow-[0_16px_32px_rgba(6,20,65,.38)] sm:rounded-[11px] sm:p-4">
      <div className="flex items-center gap-1.5">
        <motion.span
          animate={isHovered ? { rotate: [-8, 8, 0], scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E8E3F7] text-[#1A2B6B] transition-colors group-hover:bg-[#3F6CD4] group-hover:text-white"
        >
          <MessageCircle size={11} />
        </motion.span>
        <p className="truncate text-[8px] font-extrabold text-[#202642] sm:text-[9px]">
          {item.headline}
        </p>
      </div>

      <p className="mt-2 flex-1 text-[8px] leading-[1.5] text-[#50566e] sm:text-[10px]">
        “{item.copy}”
      </p>

      <div className="mt-2 flex items-center justify-between gap-1 text-[6px] text-[#85899a]">
        <span className="flex items-center gap-1">
          <Heart
            size={8}
            className="transition-colors group-hover:fill-[#3F6CD4] group-hover:text-[#3F6CD4]"
          />
          Professional conversation · sample
        </span>
        <ArrowUpRight
          size={10}
          className="text-[#3F6CD4] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}

function MosaicCard({
  item,
  activeFilter,
  hoveredIndex,
  setHoveredIndex,
}) {
  const isHovered = hoveredIndex === item.index;
  const isFilteredOut =
    activeFilter !== "all" && item.type !== activeFilter;
  const isDimmedByHover =
    hoveredIndex !== null && hoveredIndex !== item.index;

  return (
    <Link
      to={`/case-studies/${item.caseSlug}`}
      aria-label={`Open ${item.caseId} anonymous case study`}
      onMouseEnter={() => setHoveredIndex(item.index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`group relative block min-h-0 min-w-0 transition-all duration-300 ease-out ${
        isHovered ? "z-50" : "z-10"
      }`}
      style={{
        gridColumn: item.col,
        gridRow: `${item.row} / span ${item.rowSpan}`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.84, y: 24 }}
        whileInView={{
          opacity: isFilteredOut ? 0.22 : isDimmedByHover ? 0.72 : 1,
          scale: isFilteredOut
            ? 0.95
            : isHovered
              ? 1.055
              : 1,
          y: isHovered ? -7 : 0,
        }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          opacity: { duration: 0.25 },
          scale: { type: "spring", stiffness: 320, damping: 22 },
          y: { type: "spring", stiffness: 320, damping: 22 },
          delay: item.distanceFromCenter * 0.045,
        }}
        className={`h-full ${
          isFilteredOut ? "pointer-events-none blur-[0.5px]" : ""
        }`}
      >
        {item.type === "metric" ? (
          <MetricTile item={item} isHovered={isHovered} />
        ) : item.type === "comment" ? (
          <CommentTile item={item} isHovered={isHovered} />
        ) : (
          <MiniPost item={item} isHovered={isHovered} />
        )}
      </motion.div>
    </Link>
  );
}

export default function Showcase() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const boardRef = useRef(null);

  // Cursor-following ambient radial glow inside the blue showcase container
  const mouseX = useMotionValue(600);
  const mouseY = useMotionValue(380);
  const springX = useSpring(mouseX, { stiffness: 140, damping: 26 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 26 });

  const handleBoardMouseMove = (e) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.18), transparent 70%)`;

  const filterTabs = [
    { id: "all", label: "All Signals" },
    { id: "post", label: "Thought Leadership" },
    { id: "metric", label: "Momentum Metrics" },
    { id: "comment", label: "Conversations" },
  ];

  return (
    <section
      id="showcase"
      className="relative overflow-hidden bg-[#e8e3f7] px-4 py-12 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Section Heading with Curtain Reveal & Radial Hover */}
        <div className="mb-6 flex flex-col justify-between gap-3 md:mb-8 md:flex-row md:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[.22em] text-[#3F6CD4]"
            >
            </motion.div>

            <h2 className="font-display mt-2 max-w-3xl overflow-hidden text-4xl font-medium leading-[.98] tracking-[-.055em] text-[#1A2B6B] md:text-6xl">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE }}
                className="block pb-1"
              >
                Case studies of{" "}
                <RadialRevealWord
                  lightColor="#8f96ff"
                  originalColor="#1756e8"
                  size={150}
                >
                  transformation.
                </RadialRevealWord>
              </motion.span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            className="max-w-lg text-[9px] font-extrabold uppercase leading-5 tracking-[.14em] text-[#3F6CD4] md:text-xs"
          >
            A closer look at the posts, conversations and results behind
            exceptional executive brands.
          </motion.p>
        </div>

        {/* Main Interactive Blue Mosaic Board */}
        <motion.div
          ref={boardRef}
          onMouseMove={handleBoardMouseMove}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="relative flex min-h-[100svh] flex-col overflow-hidden rounded-[26px] border border-white/40 bg-[#0B66C3] p-4 shadow-[0_20px_50px_rgba(26,43,107,.16)] sm:p-5 md:p-7"
        >
          {/* Static ambient highlights */}
          <div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0"
  style={{
    background: `
      radial-gradient(ellipse at 12% 8%, rgba(255,255,255,0.20) 0%, transparent 38%),
      radial-gradient(ellipse at 88% 18%, rgba(180,183,247,0.30) 0%, transparent 36%),
      radial-gradient(ellipse at 50% 100%, rgba(8,76,160,0.35) 0%, transparent 55%),
      linear-gradient(135deg, #0066C7 0%, #0874D5 48%, #0056B3 100%)
    `,
  }}
/>

          {/* Dynamic cursor-following glow */}
          <motion.div
            aria-hidden
            style={{ background: spotlightBg }}
            className="pointer-events-none absolute inset-0 z-0"
          />

          {/* Top Editorial Quote + Interactive Filter Bar */}
          <div className="relative z-10 mx-auto mb-5 flex w-full max-w-[1180px] shrink-0 flex-col items-center justify-between gap-4 text-center text-white md:mb-6 lg:flex-row lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="font-display text-lg font-medium leading-tight tracking-[-.04em] sm:text-xl md:text-2xl"
            >
              Click any card to explore the case study.
              <br />
              <span className="text-[#D5D7FF]">Explore on your own</span>
            </motion.p>

            {/* Interactive Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md">
              {filterTabs.map((tab) => {
                const active = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`relative cursor-pointer rounded-full px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] transition-colors ${
                      active
                        ? "text-[#1A2B6B]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="showcase-filter-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute inset-0 rounded-full bg-white shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop: exact 7 × 8 merged grid with center-outward ripple */}
          <div className="relative z-10 mx-auto hidden h-[min(76svh,760px)] min-h-[580px] w-full max-w-[1180px] shrink-0 lg:block">
            <div className="grid h-full grid-cols-7 grid-rows-8 gap-0.5 xl:gap-1">
              {tiles.map((item) => (
                <MosaicCard
                  key={`${item.caseSlug}-${item.index}`}
                  item={item}
                  activeFilter={activeFilter}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
            </div>
          </div>

          {/* Mobile and tablet */}
          <div className="relative z-10 mx-auto grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-3 lg:hidden">
            {tiles
              .filter(
                (item) => activeFilter === "all" || item.type === activeFilter
              )
              .slice(0, 18)
              .map((item, idx) => (
                <motion.div
                  key={`${item.caseSlug}-mobile-${item.index}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                >
                  <Link
                    to={`/case-studies/${item.caseSlug}`}
                    className="block aspect-[1.35/1] min-w-0 transition-transform duration-300 hover:-translate-y-1"
                  >
                    {item.type === "metric" ? (
                      <MetricTile item={item} isHovered={false} />
                    ) : item.type === "comment" ? (
                      <CommentTile item={item} isHovered={false} />
                    ) : (
                      <MiniPost item={item} isHovered={false} />
                    )}
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}