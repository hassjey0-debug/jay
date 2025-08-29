import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";

interface HeroProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const navItems = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Hero = ({ isDark, toggleTheme }: HeroProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const images = ["/images/1.jpeg", "/images/2.jpeg"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Image rotation interval with smoother transition
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
      }
    }, 8000); // Change image every 8 seconds

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const slideTransition = {
    x: { 
      type: "tween", 
      duration: 1.2, 
      ease: "easeInOut" 
    },
    opacity: { 
      duration: 0.8 
    }
  };

  return (
    <div className={`relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      {/* Background Elements */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}></div>
      
      {/* Animated Background Patterns */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-5'}`}>
        {/* Grid Pattern */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
              linear-gradient(to bottom, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem'
          }}
        />
        
        {/* Floating Elements */}
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-overlay filter blur-3xl animate-blob ${
          isDark ? 'bg-purple-500/20' : 'bg-purple-500/30'
        }`}></div>
        <div className={`absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000 ${
          isDark ? 'bg-teal-500/20' : 'bg-teal-500/30'
        }`}></div>
        <div className={`absolute bottom-20 left-1/2 w-72 h-72 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000 ${
          isDark ? 'bg-blue-500/20' : 'bg-blue-500/30'
        }`}></div>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? isDark 
            ? 'bg-gray-950/90 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      } py-4`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/images/logo.png" 
                alt="IBK Digital Tech" 
                className={`h-10 w-auto ${isDark ? '' : 'invert'}`}
              />
              <div className="hidden sm:block">
                <span className={`text-xl font-bold bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent`}>
                  IBK Digital Tech
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={`relative group py-2 ${
                    isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.a>
              ))}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDark ? <BsSun className="w-5 h-5" /> : <BsMoonStars className="w-5 h-5" />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className={`md:hidden p-2 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <HiMenuAlt4 className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className={`md:hidden absolute top-full left-0 right-0 border-t ${
                  isDark 
                    ? 'bg-gray-950/95 backdrop-blur-lg border-white/10' 
                    : 'bg-white/95 backdrop-blur-lg border-gray-200'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="container mx-auto px-4 py-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className={`block py-3 border-b ${
                        isDark 
                          ? 'text-gray-300 hover:text-white border-white/5' 
                          : 'text-gray-600 hover:text-gray-900 border-gray-100'
                      } last:border-0`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <div className="pt-4 pb-2">
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full py-3 text-left flex items-center gap-2 ${
                        isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {isDark ? (
                        <>
                          <BsSun className="w-5 h-5" />
                          Switch to Light Mode
                        </>
                      ) : (
                        <>
                          <BsMoonStars className="w-5 h-5" />
                          Switch to Dark Mode
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-20">
            {/* Text Content */}
            <motion.div
              className="text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className={`px-4 py-2 rounded-full ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 text-teal-400' 
                    : 'bg-gray-100 text-teal-600'
                }`}>
                  Welcome to IBK Digital Tech
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent">
                Transforming Ideas
                </span>
                <br />
                <span className={`relative ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                     Into Digital Reality
                  <motion.svg
                    className={`absolute -bottom-2 left-0 w-full h-2 ${
                      isDark ? 'text-purple-500/20' : 'text-purple-500/40'
                    }`}
                    viewBox="0 0 300 9"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <path
                      d="M1 8C50 2 150 2 299 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </motion.svg>
                </span>
              </h1>

              <p className={`text-lg sm:text-xl mb-8 max-w-lg mx-auto lg:mx-0 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                 We craft innovative digital solutions that help businesses
                 thrive in the modern world. Your vision, our expertise.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <motion.a
                  href="https://kallolsfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Explore Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
                <motion.a
                  href="https://wa.me/254757033657"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-4 border-2 rounded-full font-semibold transition-all group inline-flex items-center gap-2 ${
                    isDark 
                      ? 'border-green-500 text-green-400 hover:bg-green-500/10' 
                      : 'border-green-600 text-green-600 hover:bg-green-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Contact Us
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative z-10 mx-auto max-w-[500px]">
                <div className={`relative ${
                  window.innerWidth < 768 ? 'w-64 h-64 mx-auto' : 'w-full h-[400px]'
                }`}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt="IBK Digital Tech"
                      className={`w-full h-full object-cover shadow-2xl ${
                        window.innerWidth < 768 
                          ? 'rounded-full' 
                          : 'rounded-2xl'
                      }`}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    />
                  </AnimatePresence>

                  {/* Image Navigation Dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 5000);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          currentImageIndex === index 
                            ? 'bg-white w-6' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
