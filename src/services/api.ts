import { ImageResponse, ImageStyle } from '../types';

const API_URL = 'https://clipdrop-api.co/text-to-image/v1';

export const generateImage = async (
  prompt: string,
  style: ImageStyle
): Promise<ImageResponse> => {
  const API_KEY = import.meta.env.VITE_CLIPDROP_API_KEY || localStorage.getItem('CLIPDROP_API_KEY');
  
  if (!API_KEY) {
    throw new Error('API key not found. Please add your Clipdrop API key.');
  }

  // Create the form data
  const formData = new FormData();
  
  // Add the base prompt
  let enhancedPrompt = prompt;
  
  // Enhance the prompt based on the selected style
  switch (style) {
    case '3d':
      enhancedPrompt = `${prompt}, 3D render, octane render, highly detailed, volumetric lighting`;
      break;
    case 'anime':
      enhancedPrompt = `${prompt}, anime style, manga art, vibrant colors, detailed anime drawing`;
      break;
    case 'digital-art':
      enhancedPrompt = `${prompt}, digital art, highly detailed digital painting, trending on artstation`;
      break;
    case 'painterly':
      enhancedPrompt = `${prompt}, oil painting, artistic, impressionist style, detailed brushstrokes`;
      break;
    case 'enhance':
      enhancedPrompt = `${prompt}, enhanced, 4k, highly detailed, professional photography`;
      break;
    case 'cinematic':
      enhancedPrompt = `${prompt}, cinematic lighting, movie scene, dramatic atmosphere, 4k`;
      break;
    case 'photographic':
      enhancedPrompt = `${prompt}, professional photography, 4k, detailed, realistic photo`;
      break;
    case 'realistic':
    default:
      // Keep the original prompt for realistic style
      break;
  }

  formData.append('prompt', enhancedPrompt);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API Error: ${response.status} ${errorData}`);
    }

    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);

    return {
      id: crypto.randomUUID(),
      url: imageUrl,
      prompt,
      style,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};