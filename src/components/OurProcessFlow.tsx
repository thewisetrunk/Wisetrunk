import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Users, MessageCircle, PenTool, LineChart } from "lucide-react";

const flowItems = [
  {
    icon: Search,
    title: "Needs Assessment",
    description:
      "We begin with a thorough needs assessment, engaging key stakeholders: teachers, parents, and principals to understand the broader environment in which students are learning and growing.",
  },
  {
    icon: Users,
    title: "Focus Groups",
    description:
      "We facilitate small-group sessions designed to identify trends, peer dynamics, and systemic challenges affecting students.",
  },
  {
    icon: MessageCircle,
    title: "One-on-One Conversations",
    description:
      "We engage in individual conversations with students to build deeper context and nuance, going beyond what group settings can often surface.",
  },
  {
    icon: PenTool,
    title: "Design & Facilitation",
    description:
      "Drawing from the needs assessment and focus groups, we co-design interventions that are thoughtfully suited to address the specific needs of the students. No two programs look the same",
  },
  {
    icon: LineChart,
    title: "Monitoring & Reflection",
    description:
      "A regular monitoring mechanism is put in place to track student progress over time, allowing us to reflect, adapt, and ensure that the intervention continues to create meaningful impact.",
  },
];

const OurProcessFlow = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-process-accent mb-2">
            Our Approach
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            A Continuous, Reflective Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Designed to listen deeply, design intentionally, and adapt
            meaningfully — because impact is never linear.
          </p>
        </motion.div>

        {/* Looping Flow — Desktop */}
        <div className="hidden md:block relative">
          {/* SVG curved dotted path connecting all items in a wave */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 480"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              d="M100,200 C160,350 240,350 300,250 
                 C360,100 440,100 500,250 
                 C560,350 640,350 700,250 
                 C760,100 840,100 900,200"
              stroke="url(#line-gradient)"
              strokeWidth="3"
              strokeDasharray="12 8"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Loop-back arrow hint */}
            <motion.path
              d="M900,160 C940,90 960,90 950,140"
              stroke="hsl(var(--primary))"
              strokeOpacity="0.3"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Items positioned along the wave */}
          <div className="relative flex justify-between items-start z-10 min-h-[480px]">
            {flowItems.map((item, i) => {
              const isUp = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  className="flex flex-col items-center text-center w-1/5 group"
                  style={{ marginTop: isUp ? 0 : 200 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                >
                  {/* Circle with icon and number */}
                  <div className="relative mb-8">
                    {/* Large background number */}
                    <motion.span
                      className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-black text-foreground/[0.03] select-none pointer-events-none"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.2 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>

                    <div className="relative z-10">
                      <div className="w-24 h-24 rounded-full border-2 border-primary/20 flex items-center justify-center bg-background shadow-xl group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-primary/10">
                        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-all duration-500">
                          <item.icon className="w-10 h-10 text-primary transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      </div>

                      {/* Floating step number */}
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-bold shadow-lg border-2 border-background text-accent-foreground">
                        {i + 1}
                      </div>
                    </div>
                  </div>

                  {/* Label - Modern Pill */}
                  <div className="relative mb-4 z-20">
                    <div className="bg-process-accent text-process-accent-foreground font-bold text-sm px-6 py-2 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                      {item.title}
                    </div>
                    {/* Decorative element replaces previous clip-path ribbon */}
                    <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-primary/20 -translate-y-1/2 -z-10 blur-sm" />
                    <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-accent/20 -translate-y-1/2 -z-10 blur-sm" />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] bg-background/80 backdrop-blur-sm px-4 py-2 rounded-xl relative z-20 shadow-sm border border-border/50">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical layout */}
        <div className="md:hidden space-y-12 relative px-4">
          {/* Vertical dash line for mobile */}
          <div className="absolute left-[2.25rem] top-8 bottom-8 w-0.5 border-l-2 border-dashed border-primary/20 -z-0" />

          {flowItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex gap-6 items-start relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center bg-background shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground shadow-md border-2 border-background">
                  {i + 1}
                </div>
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                  {/* <span className="text-primary/80 text-sm font-mono tracking-tighter">STEP {i + 1}</span> */}
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcessFlow;
