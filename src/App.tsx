import React, { useState, useEffect } from 'react';
import { generateImage } from './services/api';
import { GenerationState, ImageStyle, ImageResponse } from './types';
import Header from './components/Header';
import ImageGenerationForm from './components/ImageGenerationForm';
import ImageGrid from './components/ImageGrid';
import HistorySection from './components/HistorySection';
import ErrorMessage from './components/ErrorMessage';
import ApiKeyNotice from './components/ApiKeyNotice';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? savedMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [state, setState] = useState<GenerationState>({
    loading: false,
    error: null,
    currentImages: [],
    history: [],
  });

  const [showApiKeyNotice, setShowApiKeyNotice] = useState(false);

  useEffect(() => {
    // Check for API key
    const apiKey = import.meta.env.VITE_CLIPDROP_API_KEY || localStorage.getItem('CLIPDROP_API_KEY');
    if (!apiKey) {
      setShowApiKeyNotice(true);
    }
    
    // Load history from localStorage
    const savedHistory = localStorage.getItem('generationHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory) as ImageResponse[];
        setState(prev => ({ ...prev, history: parsedHistory }));
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
    
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Save history to localStorage when it changes
  useEffect(() => {
    if (state.history.length > 0) {
      localStorage.setItem('generationHistory', JSON.stringify(state.history));
    }
  }, [state.history]);

  const handleGenerate = async (prompt: string, style: ImageStyle) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const newImage = await generateImage(prompt, style);
      
      setState(prev => ({
        ...prev,
        loading: false,
        currentImages: [newImage, ...prev.currentImages],
        history: [newImage, ...prev.history],
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to generate image',
      }));
    }
  };

  const handleDismissError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Create Amazing AI Images
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Transform your ideas into stunning visuals with our AI-powered image generator
          </p>
        </div>
        
        <ImageGenerationForm 
          onGenerate={handleGenerate}
          isLoading={state.loading}
        />
        
        <ImageGrid 
          images={state.currentImages} 
          onRegenerate={handleGenerate}
        />
        
        {state.history.length > 0 && (
          <HistorySection 
            images={state.history.filter(img => !state.currentImages.some(current => current.id === img.id))} 
            onRegenerate={handleGenerate}
          />
        )}
      </main>
      
      {state.error && (
        <ErrorMessage 
          message={state.error} 
          onDismiss={handleDismissError} 
        />
      )}
      
      {showApiKeyNotice && <ApiKeyNotice />}

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Powered by Clipdrop API. This is a demo application.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;