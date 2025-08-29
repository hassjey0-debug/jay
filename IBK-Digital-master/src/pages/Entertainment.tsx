import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaWhatsapp, FaArrowRight} from 'react-icons/fa';
import {  HiMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { BsSun, BsMoonStars } from 'react-icons/bs';
import Footer from '../components/Footer';

const streamingProducts = [
  {
    title: 'Sports',
    description: 'Live sports events in HD quality.',
    shortFeatures: ['Live Events', 'HD Quality', 'Multi-device'],
    features: [
      'Live Sports Events',
      'HD Quality Streaming',
      'Multi-device Support',
      'Instant Replay',
      '24/7 Customer Support',
      'No Contract Required'
    ],
    images: ['/sports/1.png', '/sports/2.png', '/sports/3.png'],
    video: '/sports/preview.mp4',
    price: 'KES 600',
    whatsappLink: 'https://wa.me/254757033657?text=I%20am%20interested%20in%20Sports%20Entertainment%20Package'
  },
  {
    title: 'Movies',
    description: 'Latest movies and TV series.',
    shortFeatures: ['4K Ultra HD', 'Downloads', 'No Ads'],
    features: [
      '4K Ultra HD',
      'Offline Downloads',
      'Multiple Profiles',
      'No Ads',
      'Personalized Recommendations',
      'Family Sharing'
    ],
    images: ['/movies/1.png', '/movies/2.png', '/movies/3.png'],
    video: '/movies/preview.mp4',
    price: 'KES 500',
    whatsappLink: 'https://wa.me/254757033657?text=I%20am%20interested%20in%20Movies%20and%20Series%20Package'
  },
  {
    title: 'DSTV',
    description: 'Premium channels and live TV.',
    shortFeatures: ['Premium TV', 'Local Channels', 'DVR'],
    features: [
      'Premium Content',
      'Local Channels',
      'EPG Guide',
      'Cloud DVR',
      'Picture-in-Picture',
      'Smart TV Apps'
    ],
    images: ['/dstv/1.png', '/dstv/2.png', '/dstv/3.png'],
    video: '/premium/preview.mp4',
    price: 'KES 800',
    whatsappLink: 'https://wa.me/254757033657?text=I%20am%20interested%20in%20Premium%20Channels%20Package'
  },
  {
    title: 'IPTV',
    description: 'Global channels and content.',
    shortFeatures: ['2000+ Channels', 'VOD Library', 'Global'],
    features: [
      '2000+ Channels',
      'VOD Library',
      'Multi-language',
      '24/7 Support',
      'Global Content',
      'Live Events'
    ],
    images: ['/iptv/1.png', '/iptv/2.png'],
    video: '/global/preview.mp4',
    price: 'KES 1,200',
    whatsappLink: 'https://wa.me/254757033657?text=I%20am%20interested%20in%20Global%20Entertainment%20Package'
  }
];

interface ProductCardProps {
  product: typeof streamingProducts[0];
  isDark: boolean;
}

const ProductCard = ({ product, isDark }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) { // minimum swipe distance
      if (diff > 0) {
        // Swipe left
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      } else {
        // Swipe right
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    }
    setTimeout(() => setIsPaused(false), 1000);
  };

  useEffect(() => {
    if (isPaused) return;

    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [isPaused, product.images.length]);

  return (
    <motion.div
      className={`group relative rounded-xl overflow-hidden ${
        isDark
          ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50'
          : 'bg-white/70 hover:bg-white/90 border border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Media Container */}
      <div 
        className="relative h-40 md:h-64 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />

        {/* Price Tag */}
        <div className="absolute top-2 left-2 px-2 md:px-3 py-1 md:py-2 rounded-lg bg-gradient-to-r from-purple-600/95 to-purple-800/95 backdrop-blur-md shadow-lg border border-purple-500/20">
          <div className="text-xl md:text-3xl font-bold text-white drop-shadow-lg">{product.price}</div>
        </div>

        {/* Image Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full transition-all ${
                currentImageIndex === index
                  ? 'bg-white w-3'
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content - Different for Mobile and Desktop */}
      <div className="p-3 md:p-6">
        <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
          {product.title}
        </h3>
        
        {/* Mobile Features */}
        <div className="mt-2 flex flex-wrap gap-2 md:hidden">
          {product.shortFeatures.map((feature, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                isDark 
                  ? 'bg-gray-700/50 text-gray-300' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Desktop Features */}
        <div className="hidden md:block">
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {product.description}
          </p>
          <ul className="mt-4 space-y-2">
            {product.features.map((feature, index) => (
              <motion.li
                key={index}
                className={`flex items-center gap-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-700'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <svg className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-teal-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* WhatsApp Button */}
        <motion.a
          href={product.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaWhatsapp className="w-4 h-4" />
          <span className="md:hidden">Get Package</span>
          <span className="hidden md:inline">Get Started with WhatsApp</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/#contact" },
];

const Entertainment = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
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

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full filter blur-3xl ${
              isDark ? 'bg-purple-500/10' : 'bg-purple-500/20'
            }`} />
            <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full filter blur-3xl ${
              isDark ? 'bg-teal-500/10' : 'bg-teal-500/20'
            }`} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className={`inline-block px-4 py-2 rounded-full mb-4 ${
                isDark
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-purple-400'
                  : 'bg-purple-50 text-purple-600'
              }`}>
                Premium Entertainment
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Unlimited Entertainment
              </h1>
              <p className={`text-xl mb-8 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Access a world of entertainment with our premium streaming packages. From live sports to the latest movies and TV shows.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
              {streamingProducts.map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ProductCard product={product} isDark={isDark} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Ready to Get Started?
              </h2>
              <p className={`text-xl mb-8 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Contact us now to access premium entertainment packages
              </p>
              <motion.a
                href="https://wa.me/254757033657"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold hover:shadow-lg transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="w-6 h-6" />
                <span>Contact via WhatsApp</span>
                <FaArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
};

export default Entertainment; 