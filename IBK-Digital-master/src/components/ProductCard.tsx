import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
  images: {
    primary: string;
    secondary: string;
  };
  video?: string;
  whatsappLink: string;
  isDark: boolean;
}

const ProductCard = ({ title, description, features, images, video, whatsappLink, isDark }: ProductCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden ${
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
      <div className="relative h-64 overflow-hidden">
        {video ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={video}
              loop
              muted
              playsInline
            />
            <button
              onClick={toggleVideo}
              className="absolute bottom-4 right-4 z-10 p-3 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
            >
              {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
            </button>
          </>
        ) : (
          <img
            src={images.primary}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
          {title}
        </h3>
        
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>

        <ul className="space-y-2">
          {features.map((feature, index) => (
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

        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent group"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          Learn More
          <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;