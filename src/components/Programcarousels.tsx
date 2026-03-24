import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Pause, X, Camera, ExternalLink } from "lucide-react";
import { fadeUp } from "@/lib/animations";

/* ASSETS */
import critical1 from "@/assets/classroom/classroom_1.webp";
import critical2 from "@/assets/classroom/classroom_2.webp";
import critical3 from "@/assets/classroom/classroom_3.webp";
import critcal4 from "@/assets/classroom/classroom_4.webp";

import mela1 from "@/assets/mela/IMG_0140.webp";
import mela2 from "@/assets/mela/IMG_0149.webp";
import mela3 from "@/assets/mela/IMG_0161.webp";
import mela4 from "@/assets/mela/IMG_0171.webp";

import bootcamp2 from "@/assets/gallery-bootcamp-2.webp";
import bootcamp3 from "@/assets/gallery-bootcamp-3.webp";
import bootcamp4 from "@/assets/gallery-bootcamp-4.webp";

const PROGRAMS = [
  {
    id: "sel",
    label: "01",
    tag: "School Program",
    title: "Classroom SEL Intervention",
    description:
      "Need-based classroom approach that integrates weekly practices into the school routine, enabling social-emotional skills to be internalised over time.",
    accent: "hsl(var(--primary))",
    accentLight: "hsl(var(--primary) / 0.12)",
    images: [
      { src: critcal4, caption: "Weekly SEL Circle" },
      { src: critical1, caption: "Skill Practice" },
      { src: critical2, caption: "Peer Reflection" },
      { src: critical3, caption: "Group Activities" },
    ],
  },
  {
    id: "mela",
    label: "02",
    tag: "Community Event",
    title: "Wellness Mela",
    description:
      "Collaborative space for students, teachers and parents to have a community bonding experience through experiential activities.",
    accent: "hsl(40 95% 55%)",
    accentLight: "hsl(40 95% 55% / 0.12)",
    images: [
      { src: mela1, caption: "Community Gathering" },
      { src: mela2, caption: "Parent Sessions" },
      { src: mela3, caption: "Teacher Engagement" },
      { src: mela4, caption: "Open Dialogue" },
    ],
  },
  {
    id: "bootcamp",
    label: "03",
    tag: "Intensive Program",
    title: "Bootcamp",
    description:
      "Focused short-term sessions designed to help students understand their emotional patterns, practise regulation techniques, and build stronger self-management.",
    accent: "hsl(var(--accent))",
    accentLight: "hsl(var(--accent) / 0.15)",
    images: [
      { src: bootcamp2, caption: "Team Challenges" },
      { src: bootcamp3, caption: "Deep Reflection" },
      { src: bootcamp4, caption: "Group Discussion" },
    ],
  },
];

// ─── CARD COMPONENT ──────────────────────────────────────────────────────────
const ProgramCard = ({
  program,
  isActive,
  onClick,
  absOffset,
  xOffset,
  zOffset,
  rotation,
  isHomePage,
}: {
  program: (typeof PROGRAMS)[0];
  isActive: boolean;
  onClick: () => void;
  absOffset: number;
  xOffset: string | number;
  zOffset: number;
  rotation: number;
  isHomePage: boolean;
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const totalImgs = program.images.length;

  // Auto-cycle images only when active
  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => {
      setCurrentImg((c) => (c + 1) % totalImgs);
    }, 4000);
    return () => clearInterval(t);
  }, [isActive, totalImgs]);

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" as const } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className={`absolute w-[320px] sm:w-[350px] md:w-[450px] lg:w-[580px] aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-shadow duration-500 ${isActive ? "cursor-pointer ring-2 ring-primary/30 shadow-primary/20" : "cursor-pointer grayscale-[0.3]"
        }`}
      onClick={onClick}
      initial={false}
      animate={{
        opacity: absOffset > 2 ? 0 : 1,
        x: xOffset,
        z: zOffset,
        rotateY: rotation,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{
        duration: 0.8,
        type: "spring",
        bounce: 0.1,
        stiffness: 70,
        damping: 20,
      }}
      style={{
        zIndex: 10 - absOffset,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 bg-muted">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={currentImg}
            src={program.images[currentImg].src}
            alt={program.title}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Visual Indicator on Hover for Active Item */}
      {isActive && (
        <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
            <ExternalLink className="w-6 h-6" />
          </div>
        </div>
      )}

      {/* Overlays */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        animate={{ opacity: isActive ? 0 : 0.4 + absOffset * 0.1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0.4,
            y: isActive ? 0 : 20,
          }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full inline-block mb-4 backdrop-blur-md border border-white/10"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
          >
            {program.tag}
          </span>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
            {program.title}
          </h3>
          {<p className="hidden md:block text-white/70 text-sm md:text-lg line-clamp-2 max-w-md">
            {program.description}
          </p>}

          {/* Internal Progress for Images (Mini) */}
          <div className="flex gap-1.5 mt-8">
            {program.images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${i === currentImg ? "w-6 bg-white" : "w-1 bg-white/20"
                  }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const ProgramCarousels = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxData, setLightboxData] = useState<{ programIndex: number, imageIndex: number } | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const ref = useRef(null);
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % PROGRAMS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + PROGRAMS.length) % PROGRAMS.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, next]);

  const getOffset = (index: number) => {
    let offset = (index - current) % PROGRAMS.length;
    if (offset < -Math.floor(PROGRAMS.length / 2)) offset += PROGRAMS.length;
    if (offset > Math.floor(PROGRAMS.length / 2)) offset -= PROGRAMS.length;
    return offset;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
        setIsPlaying(false);
      } else {
        prev();
        setIsPlaying(false);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="pt-10 pb-10 relative overflow-visible" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center"
        >
          <span className="heading-md">
            What We're Building
          </span>
          {/* <h2 className="heading-lg">What We're Building</h2> */}
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative h-[550px] sm:h-[580px] md:h-[650px] lg:h-[800px] w-full flex items-center justify-center [perspective:1400px] overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {PROGRAMS.map((program, i) => {
            const offset = getOffset(i);
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            const isMobile = windowWidth < 640;
            const isSmRange = windowWidth >= 640 && windowWidth < 768;
            const isMdRange = windowWidth >= 768 && windowWidth < 1024;

            let baseSpacing = 220; // Large
            if (isMobile) baseSpacing = 110;
            else if (isSmRange) baseSpacing = 140;
            else if (isMdRange) baseSpacing = 180;

            const xOffset = Math.sign(offset) * (baseSpacing + (absOffset - 1) * (baseSpacing * 0.5));

            return (
              <ProgramCard
                isHomePage={isHomePage}
                key={program.id}
                program={program}
                isActive={isActive}
                absOffset={absOffset}
                xOffset={isActive ? 0 : xOffset}
                zOffset={isActive ? 0 : -200 - absOffset * 200}
                rotation={isActive ? 0 : Math.sign(offset) * -45}
                onClick={() => {
                  if (!isActive) {
                    setCurrent(i);
                    setIsPlaying(false);
                  } else {
                    // Redirect to the particular section in OurWork or Program page
                    navigate(`/our-work#${program.id}`);
                    setIsPlaying(false);
                  }
                }}
              />
            );
          })}

          {/* Arrow Controls over the container */}
          <button
            onClick={() => { prev(); setIsPlaying(false); }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-foreground opacity-30 hover:opacity-100 transition-opacity z-[50]"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
          </button>

          <button
            onClick={() => { next(); setIsPlaying(false); }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-foreground opacity-30 hover:opacity-100 transition-opacity z-[50]"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-8 relative z-10">
          {/* Progress Indicators */}
          <div className="flex gap-2">
            {PROGRAMS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setIsPlaying(false); }}
                className={`h-2 rounded-full transition-all duration-500 ${i === current ? "w-12 bg-primary" : "w-2 bg-primary/20"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setLightboxData(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={() => setLightboxData(null)}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video flex items-center justify-center max-h-[80vh]">
                <img
                  src={PROGRAMS[lightboxData.programIndex].images[lightboxData.imageIndex].src}
                  alt="Gallery"
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
                />

                <button
                  onClick={() => {
                    const program = PROGRAMS[lightboxData.programIndex];
                    setLightboxData({
                      ...lightboxData,
                      imageIndex: (lightboxData.imageIndex - 1 + program.images.length) % program.images.length
                    });
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={() => {
                    const program = PROGRAMS[lightboxData.programIndex];
                    setLightboxData({
                      ...lightboxData,
                      imageIndex: (lightboxData.imageIndex + 1) % program.images.length
                    });
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10"
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {PROGRAMS[lightboxData.programIndex].title}
                </h3>
                <p className="text-white/60">
                  {PROGRAMS[lightboxData.programIndex].images[lightboxData.imageIndex].caption}
                </p>
                <p className="text-white/80">
                  {PROGRAMS[lightboxData.programIndex].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProgramCarousels;
