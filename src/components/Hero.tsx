import { motion } from "framer-motion";
import heroImage from "@/assets/hero-image.webp";
import confusion from "@/assets/doodles/confusion.svg";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], }
  }),
};

const Hero = () => {
  return (
    <section id="home" className="flex flex-col w-full overflow-hidden">
      {/* Hero Header Section */}
      <div className="relative min-h-[100vh] flex items-center pt-24 pb-16">
        {/* Background Photo */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img src={heroImage} alt="heroImage" fetchPriority="high" className="w-full h-full object-cover" />
          {/* Strong dark left-to-right gradient for maximum readability and logo emphasis */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 via-black/20 to-transparent z-0" />
        </motion.div>

        {/* Fancy Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/20 blur-[100px] pointer-events-none z-0"
          animate={{ y: [0, -40, 0], scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-[120px] pointer-events-none z-0"
          animate={{ y: [0, 40, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl flex flex-col items-start gap-6">

            {/* <motion.div
              custom={0} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Empowering the Next Generation</span>
            </motion.div> */}

            <motion.h1
              custom={1} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight"
            >
              <span className="text-accent block">Skills.</span>
              <span className="text-white block">Support.</span>
              <span className="text-primary block">Systems.</span>
            </motion.h1>

            <motion.p
              custom={2} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl border-l-4 border-accent pl-6 py-1"
            >
              Preparing students for the real world by building resilience, emotional intelligence, and self-belief.
            </motion.p>

            <motion.div
              custom={3} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4 md:gap-6 mt-4"
            >
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(253,224,71,0.3)] transition-all hover:shadow-[0_0_60px_rgba(253,224,71,0.5)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Learn More</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/get-involved"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                Get Involved
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white text-xs font-bold tracking-widest uppercase">Scroll</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </div>

      {/* Stats & Description Section */}
      <div className="bg-background relative overflow-hidden pt-24 pb-12 px-6 md:px-12 lg:px-24">
        {/* Subtle background pattern/gradient */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
              className="hidden md:flex flex-shrink-0 relative"
            >
              {/* <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" /> */}
              <img
                src={confusion}
                alt="confusion doodle"
                className="relative z-10 w-48 h-48 lg:w-64 lg:h-64 object-contain drop-shadow-2xl scale-x-[-1]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground tracking-tight">The Weight They Carry</h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed text-justify relative z-10">
                <span className="absolute -top-10 -left-6 md:-left-10 text-8xl text-primary/20 font-serif leading-none -z-10">"</span>
                Students today are carrying more than we often realize - The pressure to perform, the weight of comparison, and a quiet sense of isolation. When these go unaddressed, they don't just affect a student's present; they shape their confidence, deepen self-doubt, and can have a lasting impact on their mental wellbeing. When young people are only taught to conform rather than question and explore, their curiosity, creativity, and voice slowly fade away. Intervening at this stage, through strengths-based approaches and peer support, can help them build the resilience and capacity to grow.                <span className="absolute -bottom-16 -right-4 md:-right-8 text-8xl text-primary/20 font-serif leading-none rotate-180 -z-10">"</span>
              </p>
            </motion.div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                value: "55%",
                title: "Lack Motivation",
                desc: "Students don't feel motivated to attend school, and less than half feel emotionally safe, as per the PARAKH Rashtriya Sarvekshan 2024 report."
              },
              {
                value: "19.9% - 40.7%",
                title: "Internet Addiction",
                desc: "India's range of internet addiction among students in 19 states as per a study in General Psychiatry."
              },
              {
                value: "23.3%",
                title: "Mental Health Issues",
                desc: "Students face mental health problems in school and 6.46% in communities, struggling in silence."
              }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                className="group relative flex flex-col bg-card hover:bg-accent/5 p-8 lg:p-10 rounded-[2rem] border border-border/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors" />

                <div className="mb-6 relative z-10">
                  <span className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent drop-shadow-sm">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 relative z-10">{stat.title}</h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed relative z-10">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
