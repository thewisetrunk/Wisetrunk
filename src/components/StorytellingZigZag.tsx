import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";

/* ASSETS */
import critical1 from "@/assets/classroom/classroom_1.webp";
import critical2 from "@/assets/classroom/classroom_2.webp";
import critical3 from "@/assets/classroom/classroom_3.webp";
import critical4 from "@/assets/classroom/classroom_4.webp";

import mela1 from "@/assets/mela/IMG_0140.webp";
import mela2 from "@/assets/mela/IMG_0149.webp";
import mela3 from "@/assets/mela/IMG_0161.webp";
import mela4 from "@/assets/mela/IMG_0171.webp";

import bootcamp2 from "@/assets/gallery-bootcamp-2.webp";
import bootcamp3 from "@/assets/gallery-bootcamp-3.webp";
import bootcamp4 from "@/assets/gallery-bootcamp-4.webp";

/* DATA */
export const PROGRAMS = [
  {
    id: "sel",
    tag: "School Program",
    title: "Classroom SEL Intervention",
    description:
      "Need-based classroom approach that integrates weekly practices into the school routine, enabling social-emotional skills to be internalised over time.",
    images: [
      { src: critical1, caption: "Skill Practice" },
      { src: critical2, caption: "Peer Reflection" },
      { src: critical3, caption: "Group Activities" },
      { src: critical4, caption: "Weekly SEL Circle" },
    ],
  },
  {
    id: "mela",
    tag: "Community Event",
    title: "Wellness Mela",
    description:
      "Collaborative space for students, teachers and parents to have a community bonding experience through experiential activities.",
    images: [
      { src: mela1, caption: "Community Gathering" },
      { src: mela2, caption: "Parent Sessions" },
      { src: mela3, caption: "Teacher Engagement" },
      { src: mela4, caption: "Open Dialogue" },
    ],
  },
  {
    id: "bootcamp",
    tag: "Intensive Program",
    title: "Bootcamp",
    description:
      "Focused short-term sessions designed to help students understand their emotional patterns, practise regulation techniques, and build stronger self-management.",
    images: [
      { src: bootcamp2, caption: "Team Challenges" },
      { src: bootcamp3, caption: "Deep Reflection" },
      { src: bootcamp4, caption: "Group Discussion" },
    ],
  },
];

export type SectionData = {
  id: string;
  tag: string;
  title: string;
  description: string;
  images: { src: string; caption?: string }[];
};

/* CAROUSEL */
export const StorytellingCarousel = ({
  images,
  index,
}: {
  images: { src: string; caption?: string }[];
  index: number;
}) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden group shadow-xl border border-border bg-card">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImg}
          src={images[currentImg].src}
          alt=""
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div
        className={`absolute inset-0 opacity-70 group-hover:opacity-90 transition ${index % 2 === 0
          ? "bg-gradient-to-tr from-primary/30 via-transparent to-accent/30"
          : "bg-gradient-to-tl from-primary/30 via-transparent to-accent/30"
          }`}
      />

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
        {images[currentImg].caption && (
          <div className="text-white text-sm font-medium">
            {images[currentImg].caption}
          </div>
        )}

        <div className="flex gap-2 shrink-0">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImg ? "w-8 bg-accent" : "w-2 bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* SECTION */
export const StorytellingSection = ({
  section,
  index,
}: {
  section: SectionData;
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={section.id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
      className="relative flex flex-col gap-10 md:gap-16 lg:gap-24 items-center"
    >
      {/* ✅ Heading always on top */}


      {/* Glow Effects */}
      <div className="absolute -z-10 blur-3xl opacity-20 w-72 h-72 bg-primary rounded-full top-10 left-10" />
      <div className="absolute -z-10 blur-3xl opacity-20 w-72 h-72 bg-accent rounded-full bottom-10 right-10" />

      {/* ✅ Row layout only for content */}
      <div
        className={`flex flex-col gap-10 md:gap-16 lg:gap-24 items-center w-full ${isEven ? "md:flex-row" : "md:flex-row-reverse"
          }`}
      >
        {/* Carousel */}
        <div className="w-full md:w-1/2">
          <StorytellingCarousel images={section.images} index={index} />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full inline-block mb-6 bg-primary/10 text-primary border border-primary/20">
              {section.tag}
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-primary">
              {section.title}
            </h3>

            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* MAIN PAGE */
export default function StorytellingZigZag({
  sections = PROGRAMS,
}: {
  sections?: SectionData[];
}) {
  return (
    <section className="py-12 md:py-12 bg-gradient-to-b from-secondary via-background to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 md:gap-32 lg:gap-40">
        {sections.map((section, index) => (
          <StorytellingSection
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}