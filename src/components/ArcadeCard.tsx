import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface ArcadeCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  github?: string;
  tags: string[];
}

export const ArcadeCard: React.FC<ArcadeCardProps> = ({ 
  title, 
  description, 
  image, 
  url, 
  github, 
  tags 
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div 
      layout
      className={cn(
        "relative overflow-hidden transition-all duration-500 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl group",
        isActive ? "fixed inset-4 z-50 md:inset-10" : "aspect-video"
      )}
    >
      <AnimatePresence mode="wait">
        {!isActive ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full relative"
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl font-black tracking-tighter uppercase">{title}</h3>
              <p className="text-gray-400 text-sm max-w-md line-clamp-2">
                {description}
              </p>
              
              <div className="flex space-x-4 pt-4">
                <button 
                  onClick={() => setIsActive(true)}
                  className="flex items-center space-x-2 px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all transform hover:scale-105"
                >
                  <Play size={14} fill="currentColor" />
                  <span>Launch Arcade</span>
                </button>
                {github && (
                  <a 
                    href={github} 
                    target="_blank" 
                    className="flex items-center space-x-2 px-4 py-2 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    <Github size={14} />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="arcade"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full relative bg-black"
          >
            <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
              <div className="pointer-events-auto bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full flex items-center space-x-4">
                <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
                <a href={url} target="_blank" className="text-gray-400 hover:text-white"><ExternalLink size={14} /></a>
              </div>
              <button 
                onClick={() => setIsActive(false)}
                className="pointer-events-auto p-2 bg-white text-black rounded-full hover:bg-red-500 hover:text-white transition-all shadow-2xl"
              >
                <X size={20} />
              </button>
            </div>
            
            <iframe 
              src={url} 
              className="w-full h-full border-none pt-20"
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
