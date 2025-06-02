import React from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { ImageResponse } from '../types';

interface ImageCardProps {
  image: ImageResponse;
  onRegenerate: (prompt: string, style: ImageResponse['style']) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onRegenerate }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `dreamcanvas-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="relative pb-[100%] overflow-hidden">
        <img
          src={image.url}
          alt={image.prompt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="relative p-5">
        <div className="absolute inset-0 bg-white dark:bg-gray-800 opacity-90 backdrop-blur-sm" />
        <div className="relative">
          <p className="text-sm text-purple-600 dark:text-purple-400 mb-1.5 font-medium">
            {formatDate(image.timestamp)}
          </p>
          <p className="text-gray-900 dark:text-gray-100 font-medium line-clamp-2 mb-4 min-h-[2.5rem]">
            {image.prompt}
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-800/60 transition-colors duration-200 font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={() => onRegenerate(image.prompt, image.style)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-xl hover:bg-cyan-200 dark:hover:bg-cyan-800/60 transition-colors duration-200 font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;