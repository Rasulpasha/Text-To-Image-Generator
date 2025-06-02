import React from 'react';
import { ImageResponse } from '../types';
import ImageCard from './ImageCard';

interface ImageGridProps {
  images: ImageResponse[];
  onRegenerate: (prompt: string, style: ImageResponse['style']) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onRegenerate }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 pb-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Your Creations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
        {images.map((image) => (
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

export default ImageGrid;