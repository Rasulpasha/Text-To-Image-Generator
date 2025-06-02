import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ImageStyle } from '../types';
import { generateRandomPrompt } from '../utils/randomPrompts';

interface ImageGenerationFormProps {
  onGenerate: (prompt: string, style: ImageStyle) => void;
  isLoading: boolean;
}

const styleOptions: { value: ImageStyle; label: string }[] = [
  { value: 'realistic', label: 'Realistic' },
  { value: '3d', label: '3D Render' },
  { value: 'anime', label: 'Anime' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'painterly', label: 'Painterly' },
  { value: 'enhance', label: 'Enhanced' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'photographic', label: 'Photographic' },
];

const ImageGenerationForm: React.FC<ImageGenerationFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ImageStyle>('realistic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, style);
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = generateRandomPrompt();
    setPrompt(randomPrompt);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-4xl mx-auto mb-12"
    >
      <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 pointer-events-none" />
        
        <div className="relative">
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <ImageIcon className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
              <label htmlFor="prompt" className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Image Description
              </label>
            </div>
            <div className="relative group">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
                className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-all duration-200 min-h-[120px] backdrop-blur-sm group-hover:bg-white/90 dark:group-hover:bg-gray-800/90"
                required
              />
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="absolute bottom-3 right-3 flex items-center justify-center px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/80 transition-all duration-200 shadow-sm hover:shadow group/btn"
              >
                <Sparkles className="w-4 h-4 mr-1.5 group-hover/btn:animate-pulse" />
                Surprise Me
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="style" className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Art Style
            </label>
            <div className="relative">
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value as ImageStyle)}
                className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-all duration-200 appearance-none hover:bg-white/90 dark:hover:bg-gray-800/90 backdrop-blur-sm"
              >
                {styleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`w-full flex items-center justify-center px-8 py-4 rounded-xl text-white font-medium text-lg transition-all duration-300 ${
              isLoading || !prompt.trim()
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-70'
                : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                Creating Magic...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-3" />
                Generate Image
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ImageGenerationForm;