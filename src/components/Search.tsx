import React, { useEffect, useState, useRef } from 'react';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pagefind = useRef<any>(null);

  useEffect(() => {
    async function initPagefind() {
      if (typeof window !== 'undefined' && !pagefind.current) {
        // Skip in dev mode to avoid Vite errors since pagefind only exists after build
        if (import.meta.env.DEV) return;
        
        try {
          const path = "/pagefind/pagefind.js";
          // @ts-ignore
          pagefind.current = await import(/* @vite-ignore */ `${path}`);
          await pagefind.current.init();
        } catch (e) {
          console.error('Failed to load pagefind', e);
        }
      }
    }
    if (isOpen) {
      initPagefind();
    }
  }, [isOpen]);

  useEffect(() => {
    let debounce: any;
    if (query.length > 1 && pagefind.current) {
      setIsLoading(true);
      debounce = setTimeout(async () => {
        const search = await pagefind.current.search(query);
        const results = await Promise.all(search.results.slice(0, 5).map((r: any) => r.data()));
        setResults(results);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Search"
      >
        <SearchIcon size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center space-x-4">
                <SearchIcon className="text-gray-500" size={20} />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Search projects, papers, notes..."
                  className="flex-grow bg-transparent border-none outline-none text-xl font-medium placeholder-gray-600"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                {isLoading && (
                  <div className="flex items-center justify-center py-12 text-gray-500">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    <span>Searching...</span>
                  </div>
                )}
                
                {!isLoading && results.length > 0 && (
                  <div className="space-y-2">
                    {results.map((result, i) => (
                      <a 
                        key={i}
                        href={result.url}
                        className="block p-4 rounded-2xl hover:bg-white/5 transition-all group"
                      >
                        <h4 className="font-bold text-blue-400 group-hover:text-white transition-colors">
                          {result.meta.title}
                        </h4>
                        <p 
                          className="text-sm text-gray-500 line-clamp-2 mt-1"
                          dangerouslySetInnerHTML={{ __html: result.excerpt }}
                        />
                      </a>
                    ))}
                  </div>
                )}

                {!isLoading && query.length > 1 && results.length === 0 && (
                  <div className="py-12 text-center text-gray-500">
                    No results found for "{query}"
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
