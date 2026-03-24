import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, BookOpen, Rocket } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import workImage from "@/assets/carousel-6.webp";
import OurProcessFlow from "./OurProcessFlow";
import ProgramCarousels from "./Programcarousels";
import StorytellingZigZag from "./StorytellingZigZag";
const workItems = [
  {
    icon: Target,
    title: "Issues We Tackle",
    description:
      "Peer pressure, social media dependency, academic stress, emotional isolation, and lack of safe spaces for self-expression among youth.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: BookOpen,
    title: "Planned Initiatives",
    description:
      "Peer-led SEL workshops in schools, strength-based mentorship circles, community engagement programs, and educator training modules.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Rocket,
    title: "Upcoming Projects",
    description:
      "Launching pilot programs in Mumbai schools, developing a digital resource library, and creating partnerships with educational institutions.",
    gradient: "from-primary/20 to-accent/10",
  },
];

const ContentBlock = ({ inView, isHomePage }) => (
  <motion.div className="items-center justify-center text-center mt-2">
    <h2 className="heading-lg mb-4 text-primary">
      Contextualised. Experiential. Trauma Informed.
    </h2>

    <p className="text-body text-muted-foreground">
      Shaping how students think, grow, and navigate life.
      Delivered in peer-driven
    </p>

    <p className="text-body text-muted-foreground">
      small groups that create space for voice, connection,
      and real practice.
    </p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="flex flex-wrap gap-4 mt-8 items-center justify-center"
    >
      {isHomePage && (
        <motion.a
          href="/our-work"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 30px -10px hsl(53 88% 62% / 0.5)",
          }}
          whileTap={{ scale: 0.97 }}
          className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-semibold transition-colors"
        >
          Explore More
        </motion.a>
      )}
    </motion.div>
  </motion.div>
);

const OurWork = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="our-work" ref={ref}>

      {/* Top Section */}
      {!isHomePage && (
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <motion.div>
            <OurProcessFlow />
          </motion.div>
        </div>
      )}

      {/* Carousel Full Width Background */}
      <div className={`bg-secondary ${isHomePage ? 'pt-5 pb-20' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4">

          {/* <ProgramCarousels isHomePage={isHomePage} /> */}

          {isHomePage ? (
            <>
              <ProgramCarousels isHomePage={isHomePage} />
              <ContentBlock inView={inView} isHomePage={isHomePage} />
            </>
          ) : (
            <>
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                className="text-center w-full"
              >
                <span className="text-3xl md:text-4xl font-bold">
                  What We're Building
                </span>
              </motion.div>
              <ContentBlock inView={inView} isHomePage={isHomePage} />
              <StorytellingZigZag />
            </>
          )}


        </div>
      </div>
    </section>
  );
};

export default OurWork;