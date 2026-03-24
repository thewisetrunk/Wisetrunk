import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import palakImg from "@/assets/Palak Choudhari.webp";
import nikharImg from "@/assets/Nikhar Ranawat.webp";

const team = [
  {
    name: "Palak Choudhari",
    role: "Cofounder",
    bio: `An Educator and \n  Program Designer `,
    image: palakImg,
    linkedin: "https://in.linkedin.com/in/palak-choudhari-062122147",
  },
  {
    name: "Nikhar Ranawat",
    role: "Cofounder",
    bio: `A Psychotherapist and Arts-based Therapy Practitioner`,
    image: nikharImg,
    linkedin: "https://in.linkedin.com/in/nikharranawat",
  },
];

const Team = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-3 block">
            Who We Are
          </span>
          <h2 className="heading-lg">Meet the Founders</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ y: -8 }}
              className="bg-card/50 backdrop-blur-sm rounded-[2rem] p-10 border border-border/50 text-center group cursor-default relative overflow-hidden"
            >
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full -ml-16 -mb-16 blur-3xl group-hover:bg-accent/10 transition-colors" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Avatar */}
                <div className="relative w-36 h-36 mb-6">
                  {/* Decorative Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="relative w-full h-full rounded-[2rem] overflow-hidden border-2 border-white/20 shadow-2xl bg-muted"
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transform transition-transform group-hover:scale-110 duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                  </motion.div>
                </div>

                <div className="space-y-2 mb-6">
                  <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    {member.role}
                  </div>
                </div>

                <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-8 max-w-xs whitespace-pre-line">
                  {member.bio}
                </p>

                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-primary/20 hover:opacity-90 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Linkedin size={18} />
                  Connect
                  <ArrowUpRight size={16} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;