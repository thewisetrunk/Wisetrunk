import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoFull from "@/assets/logo-full.png";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  // { label: "Gallery", href: "/gallery" },
  // { label: "Team", href: "/team" },
  { label: "Get Involved", href: "/get-involved" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showTransparent = isHome && !scrolled && !isMobile;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showTransparent
        ? "bg-transparent"
        : "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
        }`}
    >
      {/* Fixed height container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.img
            src={logoFull}
            alt="The Wise Trunk"
            className="h-12 md:h-14 lg:h-16 w-auto object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.div key={item.label} whileHover={{ y: -2 }}>
              <Link
                to={item.href}
                className={`text-sm font-medium transition-colors relative ${location.pathname === item.href
                  ? "text-primary"
                  : showTransparent
                    ? "text-background/80 hover:text-background"
                    : "text-foreground/70 hover:text-primary"
                  }`}
              >
                {item.label}
                {location.pathname === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          ))}

          {/* here donate google form will be here */}
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-md inline-block"
            onClick={() => window.open("https://pages.razorpay.com/wisetrunkedufoundation", "_blank")}
          >
            Donate
          </motion.span>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${showTransparent ? "text-background" : "text-foreground"
            }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6 items-center">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-medium transition-colors ${location.pathname === item.href
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link
                  to="/get-involved"
                  onClick={() => window.open("https://forms.gle/xa8uLPXMUqarUxmD8", "_blank")
                    && setMobileOpen(false)
                  }
                  className="bg-accent text-accent-foreground px-8 py-3 rounded-full text-base font-semibold text-center inline-block"
                >
                  Donate
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;