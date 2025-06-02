import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageResponse } from '../types';
import ImageCard from './ImageCard';

interface HistorySectionProps {
  images: ImageResponse[];
  onRegenerate: (prompt: string, style: ImageResponse['style']) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ images, onRegenerate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (images.length === 0) {
    return null;
  }

  // Sort images by timestamp, newest first
  const sortedImages = [...images].sort((a, b) => b.timestamp - a.timestamp);
  
  // Show only the last 4 images when collapsed
  const displayedImages = isExpanded ? sortedImages : sortedImages.slice(0, 4);

  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            History
          </h2>
        </div>
        
        {images.length > 4 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>Show All ({images.length})</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedImages.map((image) => (
          <ImageCard 
            key={image.id} 
            image={image} 
            onRegenerate={onRegenerate} 
          />
        ))}
      </div>
    </div>
  );
};

export default HistorySection;