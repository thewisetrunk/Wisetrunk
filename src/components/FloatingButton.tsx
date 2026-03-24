import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Send } from 'lucide-react';
import { useState, useEffect } from "react";

const FloatingButton = () => {
  const isMobile = useIsMobile();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isMobile) {
      // 1. Show text after initial scaling mount animation
      const showTimer = setTimeout(() => setShowText(true), 1500);

      // 2. Hide text after a few seconds of being shown
      const hideTimer = setTimeout(() => setShowText(false), 3000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Link to="/get-involved">
        <motion.button
          className="flex flex-row items-center gap-2 bg-primary text-primary-foreground font-heading font-bold p-4 rounded-full shadow-2xl overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
        >
          <Send className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {showText && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="whitespace-nowrap inline-block overflow-hidden"
              >
                Get Involved
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default FloatingButton;