import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Heart, Handshake, Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import involve from "@/assets/doodles/be_part.svg";

const GetInvolved = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Volunteer Application: ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:explore@thewisetrunk.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="get-involved" className="section-padding bg-background mt-14" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center md:items-center gap-1">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary block">
                Get Involved
              </span>
              <h2 className="heading-lg leading-tight">Be a Part of the Change</h2>
            </div>

            <div className="hidden md:block w-20 opacity-80 pointer-events-none">
              <img
                src={involve}
                alt=""
                className="w-full h-auto transform translate-y-2 translate-x-2"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Volunteer Form */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="lg:col-span-2 bg-card rounded-3xl p-8 shadow-sm border border-border"
          >
            <div className="flex items-center gap-2 mb-6">
              <Send className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Get in Touch</h3>
            </div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-10 h-10 text-primary" />
                </motion.div>
                <p className="font-semibold text-lg">Thank you!</p>
                <p className="text-sm text-muted-foreground">We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <input name="name" type="text" placeholder="Your Name" required className="col-span-1 px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow" />
                <input name="email" type="email" placeholder="Email Address" required className="col-span-1 px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow" />
                <input name="phone" type="tel" placeholder="Phone Number" className="col-span-1 px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow" />
                <div className="col-span-1" />
                <textarea name="message" placeholder="Tell us how you'd like to help..." rows={4} required className="sm:col-span-2 px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow" />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px hsl(53 88% 62% / 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="sm:col-span-2 bg-accent text-accent-foreground py-3.5 rounded-xl font-semibold transition-colors"
                >
                  Submit Application
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Donate & Partner */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={2}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px hsl(173 35% 69% / 0.3)" }}
              className="bg-card rounded-3xl p-8 shadow-sm border border-border flex-1 cursor-default group"
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
                <h3 className="font-bold text-lg">Donate</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Your contribution helps us reach more young people and expand our programs across India.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold transition-colors"
                type="button"
                onClick={() => window.open("https://pages.razorpay.com/wisetrunkedufoundation", "_blank")}
              >
                Donate Now
              </motion.button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={3}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px hsl(53 88% 62% / 0.3)" }}
              className="bg-card rounded-3xl p-8 shadow-sm border border-border flex-1 cursor-default group"
            >
              <div className="flex items-center gap-2 mb-4">
                <Handshake className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
                <h3 className="font-bold text-lg">Partner</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                We welcome collaborations with schools, corporations, and organisations that share our vision of youth empowerment. Reach out to explore partnership opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
