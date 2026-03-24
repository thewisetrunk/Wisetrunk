import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";

/* ================= IMAGES (ONLY EXISTING FILES) ================= */

// Classroom
import heroImage from "@/assets/hero-image.webp";
import critical1 from "@/assets/gallery-critical-1.webp";
import critical2 from "@/assets/gallery-critical-2.webp";
import critical3 from "@/assets/gallery-critical-3.webp";

// Wellness
import garden from "@/assets/garden.webp";
import motivation1 from "@/assets/gallery-motivation-1.webp";
import motivation2 from "@/assets/gallery-motivation-2.webp";
import procrastination1 from "@/assets/gallery-procrastination-1.webp";
import procrastination2 from "@/assets/gallery-procrastination-2.webp";
import procrastination3 from "@/assets/gallery-procrastination-3.webp";
import carousel2 from "@/assets/carousel-2.webp";
import carousel3 from "@/assets/carousel-3.webp";
import carousel4 from "@/assets/carousel-4.webp";
import carousel5 from "@/assets/carousel-5.webp";
import carousel6 from "@/assets/carousel-6.webp";
import carousel7 from "@/assets/carousel-7.webp";

// Wellness Mela (New)
import mela1 from "@/assets/mela/IMG_0140.webp";
import mela2 from "@/assets/mela/IMG_0149.webp";
import mela3 from "@/assets/mela/IMG_0161.webp";
import mela4 from "@/assets/mela/IMG_0171.webp";
import mela5 from "@/assets/mela/IMG_5393.webp";
import mela6 from "@/assets/mela/IMG_7889_1.webp";

// Bootcamp
import bootcamp2 from "@/assets/gallery-bootcamp-2.webp";
import bootcamp3 from "@/assets/gallery-bootcamp-3.webp";
import bootcamp4 from "@/assets/gallery-bootcamp-4.webp";

/* ================= CATEGORIES ================= */

const categories = [
  { id: "all", label: "All Programs" },
  { id: "classroom", label: "Classroom SEL Intervention" },
  { id: "wellness", label: "Wellness Mela" },
  { id: "bootcamp", label: "Bootcamp" },
];

/* ================= GALLERY ITEMS ================= */

const galleryItems = [
  // Classroom
  { id: 1, category: "classroom", src: heroImage, title: "SEL Classroom Session", description: "Interactive social-emotional learning session" },
  { id: 2, category: "classroom", src: critical1, title: "Critical Thinking", description: "Analytical exercises" },
  { id: 3, category: "classroom", src: critical2, title: "Structured Discussion", description: "Encouraging reasoning" },
  { id: 4, category: "classroom", src: critical3, title: "Communication Skills", description: "Confidence building" },

  // Wellness
  { id: 5, category: "wellness", src: garden, title: "Community Event", description: "Outdoor engagement activities" },
  { id: 6, category: "wellness", src: motivation1, title: "Motivation Circle", description: "Building self-belief" },
  { id: 7, category: "wellness", src: motivation2, title: "Goal Setting", description: "Growth mindset" },
  { id: 8, category: "wellness", src: procrastination1, title: "Take Ownership", description: "Overcoming procrastination" },
  { id: 9, category: "wellness", src: procrastination2, title: "Time Management", description: "Productivity skills" },
  { id: 10, category: "wellness", src: procrastination3, title: "Focus & Discipline", description: "Consistency habits" },
  { id: 11, category: "wellness", src: carousel2, title: "Creative Session", description: "Interactive activities" },
  { id: 12, category: "wellness", src: carousel3, title: "Celebration Moments", description: "Participation highlights" },
  { id: 13, category: "wellness", src: carousel4, title: "Group Activity", description: "Collaborative learning" },
  { id: 14, category: "wellness", src: carousel5, title: "Recognition", description: "Celebrating achievements" },
  { id: 15, category: "wellness", src: carousel6, title: "Brainstorming", description: "Idea building session" },
  { id: 16, category: "wellness", src: carousel7, title: "Event Highlights", description: "Wellness snapshots" },
  { id: 20, category: "wellness", src: mela1, title: "Wellness Mela Session", description: "Holistic well-being activities" },
  { id: 21, category: "wellness", src: mela2, title: "Interactive Workshop", description: "Engaging student sessions" },
  { id: 22, category: "wellness", src: mela3, title: "Student Engagement", description: "Creative growth activities" },
  { id: 23, category: "wellness", src: mela4, title: "Wellness Circle", description: "Building emotional resilience" },
  { id: 24, category: "wellness", src: mela5, title: "Activity Highlights", description: "Snapshots from the mela" },
  { id: 25, category: "wellness", src: mela6, title: "Group Discussion", description: "Collaborative learning" },

  // Bootcamp
  { id: 17, category: "bootcamp", src: bootcamp2, title: "Bootcamp Outdoor", description: "Leadership activities" },
  { id: 18, category: "bootcamp", src: bootcamp3, title: "Bootcamp Collaboration", description: "Team challenges" },
  { id: 19, category: "bootcamp", src: bootcamp4, title: "Bootcamp Workshop", description: "Skill development" },
];

const ProgramGallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const currentIndex =
    lightbox !== null
      ? filtered.findIndex((item) => item.id === lightbox)
      : -1;

  const currentItem =
    currentIndex >= 0 ? filtered[currentIndex] : null;

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
          <h2 className="heading-lg">Program Gallery</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore moments from our classroom interventions, wellness initiatives, and immersive bootcamps.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat.id
                ? "bg-primary text-primary-foreground scale-105 shadow-md"
                : "bg-card border border-border text-muted-foreground hover:bg-primary/10"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md border border-border bg-card"
                onClick={() => setLightbox(item.id)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300">
                  <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                  <p className="text-white/70 text-xs">{item.description}</p>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100">
                  <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-black" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && currentItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="w-full max-h-[85vh] object-contain rounded-xl"
                />

                {/* Close */}
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 text-white"
                >
                  <X size={28} />
                </button>

                {/* Prev */}
                {currentIndex > 0 && (
                  <button
                    onClick={() => setLightbox(filtered[currentIndex - 1].id)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
                  >
                    <ChevronLeft size={32} />
                  </button>
                )}

                {/* Next */}
                {currentIndex < filtered.length - 1 && (
                  <button
                    onClick={() => setLightbox(filtered[currentIndex + 1].id)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                  >
                    <ChevronRight size={32} />
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ProgramGallery;