import React, { useState } from 'react';
import { Key, ExternalLink } from 'lucide-react';

const ApiKeyNotice: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    
    // In a real app, you'd use a secure method to store this
    // For demo purposes, we're just setting it in localStorage
    localStorage.setItem('CLIPDROP_API_KEY', apiKey);
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full mb-4 mx-auto">
          <Key className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
          API Key Required
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          To generate images, you need a Clipdrop API key. Visit the Clipdrop website to get your free API key.
        </p>
        
        <a 
          href="https://clipdrop.co/apis"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mb-6 transition-colors"
        >
          <span>Get your API key</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter your Clipdrop API key
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your API key here"
              className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={!apiKey.trim() || isUpdating}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
              !apiKey.trim() || isUpdating
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600'
            }`}
          >
            {isUpdating ? 'Updating...' : 'Save API Key'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyNotice;