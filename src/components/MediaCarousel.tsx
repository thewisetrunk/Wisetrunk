import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, X, Camera } from "lucide-react";
import { fadeUp } from "@/lib/animations";

/* VALID IMAGES ONLY */
import carousel2 from "@/assets/carousel-2.webp";
import carousel3 from "@/assets/carousel-3.webp";
import carousel4 from "@/assets/carousel-4.webp";
import carousel5 from "@/assets/carousel-5.webp";
import carousel6 from "@/assets/carousel-6.webp";
import carousel7 from "@/assets/carousel-7.webp";
import heroImage from "@/assets/hero-image.webp";
import bootcamp2 from "@/assets/gallery-bootcamp-2.webp";
import bootcamp3 from "@/assets/gallery-bootcamp-3.webp";
import bootcamp4 from "@/assets/gallery-bootcamp-4.webp";
import garden from "@/assets/garden.webp";

/* SLIDES */
const slides = [
  { src: heroImage, caption: "Classroom SEL Intervention", description: "Interactive SEL sessions", type: "image" },
  { src: bootcamp2, caption: "Bootcamp Leadership", description: "Outdoor team-building exercises", type: "image" },
  { src: bootcamp3, caption: "Bootcamp Collaboration", description: "Solving challenges together", type: "image" },
  { src: bootcamp4, caption: "Bootcamp Workshops", description: "Hands-on immersive learning", type: "image" },
  { src: garden, caption: "Wellness Mela", description: "Community engagement activities", type: "image" },
  { src: carousel2, caption: "Creative Engagement", description: "Interactive creative programs", type: "image" },
  { src: carousel3, caption: "Community Initiative", description: "Growing together", type: "image" },
  { src: carousel4, caption: "Workshop Highlights", description: "Impactful sessions", type: "image" },
  { src: carousel5, caption: "Celebrating Growth", description: "Recognizing achievements", type: "image" },
  { src: carousel6, caption: "Brainstorming & Innovation", description: "Collaborative idea building", type: "image" },
  { src: carousel7, caption: "Event Moments", description: "Memorable highlights", type: "image" },
];

const MediaCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (isPlaying) {
      intervalId = setInterval(next, 4000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [isPlaying, next]);

  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getOffset = (index: number) => {
    let offset = (index - current) % slides.length;
    if (offset < -Math.floor(slides.length / 2)) offset += slides.length;
    if (offset > Math.floor(slides.length / 2)) offset -= slides.length;
    return offset;
  };

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <h2 className="heading-lg">Stories & Moments</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A glimpse into our classroom interventions, wellness initiatives, and immersive bootcamps.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={1}
          className="relative h-[500px] sm:h-[600px] lg:h-[750px] w-full flex items-center justify-center [perspective:1400px] overflow-visible py-10"
        >
          {slides.map((slide, i) => {
            const offset = getOffset(i);
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            // Render only cards that are relatively close to center
            if (absOffset > 3) return null;

            // X positioning formula: overlaps nicely like Coverflow
            const getX = () => {
              if (isActive) return 0;
              const isMobile = windowWidth < 768;
              const isTablet = windowWidth >= 768 && windowWidth < 1280;

              let baseSpacing = 180; // Large screens
              if (isMobile) baseSpacing = 85;
              else if (isTablet) baseSpacing = 140;

              return Math.sign(offset) * (baseSpacing + (absOffset - 1) * (baseSpacing * 0.6));
            };

            return (
              <motion.div
                key={i}
                className={`absolute w-[240px] sm:w-[320px] md:w-[440px] lg:w-[540px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl will-change-transform ${isActive ? "cursor-pointer ring-2 ring-primary/50 shadow-primary/20" : "cursor-pointer hover:shadow-xl group"}`}
                onClick={() => {
                  if (!isActive) {
                    setCurrent(i);
                    setIsPlaying(false);
                  } else {
                    setLightboxIndex(i);
                    setIsPlaying(false);
                  }
                }}
                initial={false}
                animate={{
                  opacity: absOffset > 2 ? 0 : 1,
                  x: getX(),
                  z: isActive ? 0 : -100 - absOffset * 180,
                  rotateY: isActive ? 0 : Math.sign(offset) * -45,
                }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  bounce: 0,
                  stiffness: 70,
                  damping: 20
                }}
                style={{
                  zIndex: slides.length - absOffset,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Visual Camera Indicator on Hover for Active Item */}
                {isActive && (
                  <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
                      <Camera className="w-6 h-6" />
                    </div>
                  </div>
                )}
                {/* Background image or video */}
                <div className="absolute inset-0 bg-muted">
                  {slide.type === "image" ? (
                    <img
                      src={slide.src}
                      alt={slide.caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      decoding="async"
                      loading={absOffset > 1 ? "lazy" : "eager"}
                    />
                  ) : (
                    <video
                      src={slide.src}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay={isActive}
                      playsInline
                    />
                  )}
                </div>

                {/* Coverflow Darkening for side items */}
                <motion.div
                  className="absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none"
                  initial={false}
                  animate={{ opacity: isActive ? 0 : 0.4 + absOffset * 0.1 }}
                />

                {/* Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Card Content & Text */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 20,
                      scale: isActive ? 1 : 0.9
                    }}
                    transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-lg">{slide.caption}</h3>
                    <p className="text-white/80 text-sm md:text-base line-clamp-2 md:line-clamp-3 drop-shadow">{slide.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Carousel Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-6 mt-8 md:mt-2 relative z-10"
        >
          <div className="flex items-center gap-8">
            <button
              onClick={() => { prev(); setIsPlaying(false); }}
              className="w-12 h-12 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 backdrop-blur-sm flex items-center justify-center text-foreground transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="group relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
            >
              {/* Outer Glow/Ring */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-full border border-primary/20 group-hover:border-primary/40 transition-colors" />

              {/* Main Button Body */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform active:scale-95">
                {isPlaying ? (
                  <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
                ) : (
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                )}
              </div>
            </button>
            <button
              onClick={() => { next(); setIsPlaying(false); }}
              className="w-12 h-12 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 backdrop-blur-sm flex items-center justify-center text-foreground transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* New Progress Indicators */}
          <div className="flex gap-1.5 md:gap-2 max-w-[80vw] overflow-x-auto py-2 scrollbar-hide">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setIsPlaying(false); }}
                className={`h-2 rounded-full transition-all duration-500 flex-shrink-0 ${i === current ? "w-8 md:w-12 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Fullscreen Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 sm:p-8 backdrop-blur-sm"
              onClick={() => setLightboxIndex(null)}
            >
              <button
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
                onClick={() => setLightboxIndex(null)}
              >
                <X size={32} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {slides[lightboxIndex].type === "image" ? (
                    <img
                      src={slides[lightboxIndex].src}
                      alt={slides[lightboxIndex].caption}
                      className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
                    />
                  ) : (
                    <video
                      src={slides[lightboxIndex].src}
                      className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                      controls
                      autoPlay
                    />
                  )}

                  {/* Nav Controls */}
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex - 1 + slides.length) % slides.length)}
                    className="absolute -left-4 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md border border-white/10 transition-all"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % slides.length)}
                    className="absolute -right-4 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md border border-white/10 transition-all"
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>

                <div className="mt-8 text-center max-w-2xl">
                  <h3 className="text-2xl font-bold text-white mb-2">{slides[lightboxIndex].caption}</h3>
                  <p className="text-white/60">{slides[lightboxIndex].description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MediaCarousel;