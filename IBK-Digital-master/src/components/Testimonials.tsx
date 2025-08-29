import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface TestimonialProps {
  isDark: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechVision Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content: "Working with this team has been transformative for our business. Their innovative solutions and attention to detail have helped us achieve remarkable growth."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateLabs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content: "The level of technical expertise and creativity they bring to each project is outstanding. They've helped us stay ahead in a competitive market."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GlobalBrand Co.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content: "Their ability to understand our vision and translate it into beautiful, functional solutions has exceeded our expectations. Truly exceptional work."
  }
];

// Memoized Testimonial Card Component
const TestimonialCard = memo(({ testimonial, isDark }: { testimonial: Testimonial; isDark: boolean }) => (
  <div className="flex flex-col items-center text-center">
    <FaQuoteLeft className={`w-8 h-8 mb-6 ${
      isDark ? 'text-purple-400' : 'text-purple-500'
    }`} />
    
    <p className={`text-lg mb-8 ${
      isDark ? 'text-gray-300' : 'text-gray-600'
    }`}>
      {testimonial.content}
    </p>

    <img
      src={testimonial.image}
      alt={testimonial.name}
      className="w-16 h-16 rounded-full object-cover mb-4"
      loading="lazy"
    />

    <div>
      <h4 className="font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
        {testimonial.name}
      </h4>
      <p className={`text-sm ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {testimonial.role} at {testimonial.company}
      </p>
    </div>
  </div>
));

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
    duration: 0.8, 
    ease: "easeInOut" 
  },
  opacity: { 
    duration: 0.6 
  }
};

const Testimonials = ({ isDark }: TestimonialProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Slower autoplay interval
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Increased interval to 8 seconds

    return () => clearInterval(timer);
  }, [isAutoPlaying, isPaused]);

  // Pause on hover/visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <section 
      className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={`inline-block px-4 py-2 rounded-full mb-4 ${
            isDark
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-purple-400'
              : 'bg-purple-50 text-purple-600'
          }`}>
            Testimonials
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className={`max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Discover why leading businesses trust us with their digital transformation journey
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className={`relative p-8 rounded-2xl ${
                isDark
                  ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50'
                  : 'bg-white/70 border border-gray-200'
              }`}
            >
              <TestimonialCard 
                testimonial={testimonials[currentIndex]} 
                isDark={isDark} 
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons with slower hover animation */}
          <div className="absolute inset-0 flex items-center justify-between">
            <motion.button
              onClick={handlePrevious}
              className={`-left-4 p-3 rounded-full ${
                isDark
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } shadow-lg backdrop-blur-sm transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <FaArrowLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              className={`-right-4 p-3 rounded-full ${
                isDark
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } shadow-lg backdrop-blur-sm transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <FaArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Dots Navigation with smoother transitions */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? isDark
                      ? 'bg-purple-400 w-6'
                      : 'bg-purple-600 w-6'
                    : isDark
                      ? 'bg-gray-700'
                      : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials); 