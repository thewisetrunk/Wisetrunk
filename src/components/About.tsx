import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, Lightbulb, Users, Palette, RotateCw } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import Team from "./Team";
import aboutImage2 from "@/assets/gallery-bootcamp-3.webp";
import aboutImage3 from "@/assets/gallery-critical-2.webp";
import aboutImage4 from "@/assets/gallery-critical-1.webp";
import focusDoodle from "@/assets/doodles/focus.svg";
import angerDoodle from "@/assets/doodles/anger.svg";
import sadDoodle from "@/assets/doodles/sad.svg";
import joyDoodle from "@/assets/doodles/joy.svg";
import confidentDoodle from "@/assets/doodles/confident.svg";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const IMAGES = [
  aboutImage2,
  aboutImage3,
  aboutImage4,
];
const INTERVAL_MS = 3500;

// ─── FOCUS AREAS DATA ────────────────────────────────────────────────────────
const focusAreas = [
  {
    icon: Heart,
    title: "Self-Management",
    description: "Building mindfulness and self-reflection skills",
    color: "bg-primary/15",
    textColor: "text-primary",

  },
  {
    icon: Lightbulb,
    title: "Emotional Expression",
    description: "Developing emotional awareness and regulation",
    color: "bg-accent/20",
    textColor: "text-accent/70",

  },
  {
    icon: Users,
    title: "Social & Civic Awareness",
    description: "Fostering collective responsibility and worldview",
    color: "bg-primary/15",
    textColor: "text-primary",

  },
  {
    icon: Palette,
    title: "Imagination & Creativity",
    description: "Nurturing creative thinking and innovation",
    color: "bg-accent/20",
    textColor: "text-accent/70",

  },
];

// ─── POLICY HIGHLIGHTS (replaces wall-of-text for "Why It Matters") ──────────
const policyHighlights = [
  {
    tag: "NEP 2020",
    headline: "National Education Policy",
    body: "Formally recognises Social Emotional Learning as central to holistic student development.",
  },
  {
    tag: "NCF 2023",
    headline: "National Curriculum Framework",
    body: "Mandates the integration of SEL competencies across all stages of school education.",
  },
  {
    tag: "Supreme Court 2025",
    headline: "Fundamental Right",
    body: "Nationwide binding guidelines affirm student mental health as a right under Article 21.",
  },
];

// ─── SLIDESHOW ───────────────────────────────────────────────────────────────
const ImageSlideshow = ({ className = "" }: { className?: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <AnimatePresence initial={false}>
        <motion.img
          key={current}
          src={IMAGES[current]}
          alt="WiseTrunk workshop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" }
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* gradient overlay — bottom fade for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "22px" : "8px",
              height: "8px",
              background: i === current ? "hsl(var(--primary))" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── GOOEY ANIMATION ────────────────────────────────────────────────────────
const morphVariants: any = {
  animate: {
    borderRadius: [
      "30% 70% 70% 30% / 30% 30% 70% 70%",
      "50% 50% 30% 70% / 50% 70% 30% 50%",
      "70% 30% 50% 50% / 30% 30% 70% 70%",
      "30% 70% 70% 30% / 30% 30% 70% 70%",
    ],
    rotate: [0, 90, 180, 270, 360],
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const glowPulseVariants: any = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const AmbientBackground = ({
  variant = "solution",
}: {
  variant?: "problem" | "solution";
}) => {
  const isProblem = variant === "problem";
  const colorPrimary = isProblem ? "bg-yellow-500/30" : "bg-primary/40";
  const colorSecondary = isProblem ? "bg-yellow-400/30" : "bg-accent/30";

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[3rem]">
      {/* Background soft gradients */}
      <motion.div
        variants={glowPulseVariants}
        animate="animate"
        className={`absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full ${colorPrimary} blur-[120px]`}
      />
      <motion.div
        variants={glowPulseVariants}
        animate="animate"
        transition={{ delay: 2 }}
        className={`absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full ${colorSecondary} blur-[120px]`}
      />

      {/* Floating morphing shapes for interest */}
      <motion.div
        variants={morphVariants}
        animate="animate"
        className={`absolute top-1/4 left-1/4 w-64 h-64 ${colorPrimary} opacity-20 blur-3xl`}
      />
      <motion.div
        variants={morphVariants}
        animate="animate"
        transition={{ delay: 5 }}
        className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${colorSecondary} opacity-20 blur-3xl`}
      />
    </div>
  );
};

// ─── FLIP CARD ────────────────────────────────────────────────────────────────
const FlipCard = ({
  frontBadgeColor,
  frontBadgeText,
  frontTextColor,
  frontContent,
  backContent,
  backBadgeText,
  backBadgeColor,
  backTextColor,
  delay,
  inView,
  isFlipped,
  onToggle,
}: any) => {
  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={delay}
      className="cursor-pointer w-full group"
      style={{ perspective: "2000px" }}
      onClick={onToggle}
    >
      {/* Fixed slight tilt — no floating animation */}
      <div
        className="relative w-full"
        style={{ transform: isFlipped ? "rotate(0.5deg)" : "rotate(-0.5deg)" }}
      >
        <motion.div
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1], // Smooth custom cubic bezier
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="relative w-full min-h-[520px] md:min-h-[480px]"
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-14 flex flex-col items-center justify-center text-center overflow-hidden border border-border/40 shadow-2xl bg-white/60 backdrop-blur-md"
            style={{ backfaceVisibility: "hidden" }}
          >
            <AmbientBackground variant="problem" />

            <div className="relative z-10 flex flex-col items-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${frontBadgeColor} px-5 py-1.5 md:px-6 md:py-2 rounded-full mb-6 md:mb-10 shadow-yellow-400 border border-white/20`}
              >
                <span className="text-[12px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-yellow-600" >
                  {frontBadgeText}
                </span>
              </motion.div>

              <div className="text-lg md:text-2xl text-foreground/90 font-bold leading-relaxed md:leading-[1.6] space-y-4 md:space-y-6 max-w-2xl drop-shadow-sm px-2">
                {frontContent}
              </div>

              <div className="flex items-center gap-3 font-bold text-muted-foreground/80 uppercase tracking-[0.2em] md:tracking-[0.4em] mt-8 md:mt-12 transition-colors group-hover:text-primary/60 text-[12px] md:text-xs">
                <RotateCw className="w-3 h-3 md:w-4 md:h-4 animate-spin-slow" />
                tap to explore
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-14 flex flex-col items-center justify-center text-center overflow-hidden border border-border/40 shadow-2xl bg-white/60 backdrop-blur-md"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <AmbientBackground variant="solution" />

            <div className="relative z-10 flex flex-col items-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${backBadgeColor} px-5 py-1.5 md:px-6 md:py-2 rounded-full mb-6 md:mb-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-white/20`}
              >
                <span className="text-[12px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em]" style={{ color: backTextColor }}>
                  {backBadgeText}
                </span>
              </motion.div>

              <div className="text-lg md:text-2xl text-foreground font-bold leading-relaxed md:leading-[1.6] space-y-4 md:space-y-6 max-w-2xl drop-shadow-sm px-2">
                {backContent}
              </div>

              <div className="flex items-center gap-3 font-bold text-muted-foreground/80 uppercase tracking-[0.2em] md:tracking-[0.4em] mt-8 md:mt-12 transition-colors group-hover:text-primary/60 text-[12px] md:text-xs">
                <RotateCw className="w-3 h-3 md:w-4 md:h-4 scale-x-[-1] animate-spin-slow" />
                tap to return
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const FocusAreasMobile = ({ focusAreas }: { focusAreas: any[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % focusAreas.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [focusAreas.length]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -50) {
      setIndex((prev) => (prev + 1) % focusAreas.length);
    } else if (info.offset.x > 50) {
      setIndex((prev) => (prev - 1 + focusAreas.length) % focusAreas.length);
    }
  };

  return (
    <div className="relative h-[480px] w-full flex items-center justify-center md:hidden mb-6 overflow-visible">
      {/* Background container for the stack */}
      <div className="relative w-[85%] max-w-[320px] h-[380px]">
        {focusAreas.map((area, i) => {
          let position = i - index;
          if (position < 0) position += focusAreas.length;

          // Only show up to 3 cards for a clean stack
          if (position > 3) return null;

          return (
            <motion.div
              key={area.title}
              style={{
                zIndex: 10 - position,
              }}
              animate={{
                x: position * 24, // Fan out to the left
                y: position * -12, // Slight upward shift
                scale: 1 - position * 0.04,
                opacity: 1 - position * 0.2,
                filter: position === 0 ? "blur(0px)" : `blur(${position * 1}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                opacity: { duration: 0.4 }
              }}
              drag={position === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.02 }}
              className="absolute inset-0 bg-white border border-border shadow-[-20px_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 flex flex-col gap-6 touch-none"
            >
              {/* Content mimicking the image structure: Icon/Image at top, text at bottom */}
              <div className={`w-full h-32 rounded-2xl ${area.color} flex items-center justify-center mb-2 overflow-hidden relative`}>

                <area.icon className="w-12 h-12 text-primary opacity-80" />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black tracking-widest text-primary uppercase opacity-60">
                  Focus Area
                </span>
                <h4 className="font-bold text-2xl text-foreground leading-tight">
                  {area.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {area.description}
                </p>
              </div>

              {position === 0 && (
                <div className="mt-auto flex justify-start gap-1.5 pt-4">
                  {focusAreas.map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${dotIdx === index ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const About = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [challengeFlipped, setChallengeFlipped] = useState(false);

  return (
    <section id="about" className="bg-secondary mt-8 md:mt-0" ref={ref}>


      {/* ══════════════════════════════════════════════════════════════════════
          ZONE 2 — OUR VISION
          Mobile:  stacked — headline → body → image
          Tablet+: two columns, image on right, vertically centred
      ══════════════════════════════════════════════════════════════════════ */}
      {!isHomePage && <div className="max-w-7xl mx-auto px-4 mb-0 md:mb-0 mt-14 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center p-8 ">

          {/* Text */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0}
          >
            {/* <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 pt-8 block">
              Our Vision
            </span> */}
            <h2 className="heading-lg mb-6 mt-10 leading-tight">
              Empowering Students with{" "}
              <span className="text-primary">Wisdom &amp; Purpose</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                WiseTrunk Edu Foundation is a registered Section 8 company
                under the Indian Companies Act 2013 — a not-for-profit
                organisation based in Mumbai, founded in 2025.
              </p>
              <p>
                We work with adolescents and young adults through small-group
                experiential workshops designed around insights students bring
                to the room.
              </p>
              <p>
                Every session is rooted in self-reflection, anchored in
                real-life scenarios, and equips students with practical
                techniques to regulate and navigate their experiences.
              </p>
              <p className="font-semibold text-foreground">
                We listen first, then design — this is what makes our work
                intentional and personal.
              </p>
            </div>
          </motion.div>

          {/* Image — visible on md+ inline here; hidden on mobile (shown in slideshow band below) */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="hidden md:block"
          >
            <ImageSlideshow className="rounded-3xl shadow-2xl aspect-[1]" />
          </motion.div>
        </div>
      </div>}

      {/* ══════════════════════════════════════════════════════════════════════
          ZONE 3 — FULL-BLEED IMAGE BAND (mobile only)
          On mobile the image appears here as a cinematic band between
          the two text sections.  On desktop it lives inside the grid above.
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden mt-14">
        <ImageSlideshow className="w-full aspect-[1]" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          ZONE 5 — PROBLEM / SOLUTION FLIP CARD
      ══════════════════════════════════════════════════════════════════════ */}
      {!isHomePage && <div className={`max-w-7xl mx-auto px-4  mt-20 md:mt-28 ${isHomePage ? "pb-20" : "mb-24 md:mb-32"}`}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-10 text-center"
        >
          <h3 className="heading-lg leading-tight text-center">
            The Challenge &amp; <span className="text-primary">Our Response</span>
          </h3>
        </motion.div>

        <div className="max-w-4xl mx-auto relative px-8">
          {/* External Left Side Doodle */}
          <div className="hidden lg:block absolute -left-20 xl:-left-40 top-1/2 -translate-y-1/2 perspective-[1000px] z-10">
            <motion.div
              animate={{ rotateY: challengeFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-40 h-40"
            >
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                <img src={angerDoodle} alt="" className="w-full h-auto  transform -rotate-12" />
              </div>
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <img src={joyDoodle} alt="" className="w-full h-auto  transform -rotate-6" />
              </div>
            </motion.div>
          </div>

          {/* External Right Side Doodle */}
          <div className="hidden lg:block absolute -right-20 xl:-right-40 top-1/2 -translate-y-1/2 perspective-[1000px] z-10">
            <motion.div
              animate={{ rotateY: challengeFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-40 h-40"
            >
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                <img src={sadDoodle} alt="" className="w-full h-auto  transform rotate-12" />
              </div>
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <img src={confidentDoodle} alt="" className="w-full h-auto  transform rotate-6" />
              </div>
            </motion.div>
          </div>

          <FlipCard
            inView={inView}
            isFlipped={challengeFlipped}
            onToggle={() => setChallengeFlipped(!challengeFlipped)}
            delay={1}
            frontBadgeText="The Problem"
            frontBadgeColor="bg-yellow-500/10"
            frontContent={
              <>
                <p>
                  Between the ages of 12 and 22, young people navigate defining
                  years marked by identity formation, emotional shifts, and
                  questions of belonging and purpose.
                </p>
                <p>
                  Intervening during this window is not just meaningful — it is
                  essential. Yet most schools have no structured support for it.
                </p>
              </>
            }
            backBadgeText="Our Solution"
            backBadgeColor="bg-primary/20"
            backTextColor="hsl(var(--foreground))"
            backColor="bg-primary/5"
            backContent={
              <>
                <p>
                  Our trauma-informed, strength-based SEL model begins with
                  experiential workshops that place students at the centre of
                  their own growth.
                </p>
                <p>
                  Learning continues through structured skill practice, helping
                  students build lasting emotional resilience they carry for life.
                </p>
              </>
            }
          />
        </div>
      </div>}

      {/* ══════════════════════════════════════════════════════════════════════
          ZONE 6 — FOUR FOCUS AREAS
          Mobile:  horizontal scroll (snap)
          Tablet:  2 × 2 grid
          Desktop: 4-column row
      ══════════════════════════════════════════════════════════════════════ */}
      <div className={`bg-background ${isHomePage ? "pt-12" : "pt-6 md: pt-24"}`}>
        <div className="max-w-7xl mx-auto px-4 pb-8 ">

          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-10 md:mb-14">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="max-w-2xl text-center md:text-left"
            >
              {/* <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block ">
                What We Focus On
              </span> */}
              <h3 className="heading-lg">What We Focus On</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">We empower young people to navigate life's challenges, while building a supportive community where they can thrive, connect, and contribute.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={1}
              className="hidden md:block w-40 opacity-80"
            >
              <img
                src={focusDoodle}
                alt="Focus Doodle"
                className="w-full h-auto transform -rotate-12 translate-y-4 scale-x-[-1]"
              />
            </motion.div>
          </div>

          {/* Mobile Stacked View */}
          <FocusAreasMobile focusAreas={focusAreas} />

          {/* Grid on sm+ */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="
                bg-card border border-border rounded-3xl p-7
                flex flex-col gap-4
                shadow-sm hover:shadow-lg transition-shadow duration-300
              "
              >
                {/* Number + icon row */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${area.color} flex items-center justify-center`}>
                    <area.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-base mb-1">{area.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          ZONE 4 — WHY IT MATTERS
          Mobile:  stacked cards
          Desktop: 3-column policy highlight cards + closing statement
      ══════════════════════════════════════════════════════════════════════ */}
      {!isHomePage && <div className={`pb-16 max-w-7xl mx-auto px-4 mt-20 md:mt-28`}>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={1}
          className="mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 block">
            Why It Matters
          </span>
          <h3 className="heading-lg leading-tight max-w-2xl">
            The policy landscape has shifted.{" "}
            <span className="text-primary">Now comes implementation.</span>
          </h3>
        </motion.div>

        {/* Closing statement - Reimagined as an Impact Bridge */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={5}
          className="relative mt-6 mb-6 md:mt-8 group"
        >
          {/* Decorative background element to ground the statement */}
          <div className="absolute inset-0 bg-primary/[0.03] border border-primary/10 rounded-[2.5rem] -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm border border-primary/10 rounded-[2.5rem] rotate-0 shadow-xl shadow-primary/5" />

          <div className="relative z-10 px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <ArrowRight  className="w-8 h-8 text-primary-foreground transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </div> */}

            <div className="text-center md:text-left">
              <p className="text-xl md:text-2xl text-foreground font-bold leading-[1.5] tracking-tight">
                WiseTrunk translates this policy intent into {" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">meaningful, on-ground impact</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10 rounded-full" />
                </span>
                {" "} bringing SEL from legislation into <span className="italic font-serif text-yellow-500">lived experience</span> for every student.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3 policy highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {policyHighlights.map((item, i) => (
            <motion.div
              key={item.tag}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={i + 2}
              className="bg-white/50 backdrop-blur-sm border border-border rounded-3xl p-7 flex flex-col gap-4 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 group"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1.5 rounded-lg w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {item.tag}
              </span>
              <div>
                <p className="font-bold text-foreground text-lg mb-1 leading-tight">
                  {item.headline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>}

      {!isHomePage && <Team />}

    </section>
  );
};

export default About;