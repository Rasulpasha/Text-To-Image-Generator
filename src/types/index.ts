export type ImageStyle = 
  | 'realistic'
  | '3d'
  | 'anime'
  | 'digital-art'
  | 'painterly'
  | 'enhance'
  | 'cinematic'
  | 'photographic';

export interface ImageResponse {
  id: string;
  url: string;
  prompt: string;
  style: ImageStyle;
  timestamp: number;
}

export interface GenerationState {
  loading: boolean;
  error: string | null;
  currentImages: ImageResponse[];
  history: ImageResponse[];
}