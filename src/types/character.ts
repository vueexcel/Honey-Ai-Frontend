export interface ResizedImage {
  id: number;
  character_id: string;
  image_url: string;
  type: string;
}

export interface BodyImage {
  id: number;
  character_id: string;
  image_url: string;
}

export interface Character {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  description: string;
  is_anime: boolean;
  is_new: boolean;
  is_premium: boolean;
  has_video: boolean;
  premium_model_experiment_description: string | null;
  white_desktop_premium_model_experiment_image: string | null;
  white_mobile_premium_model_experiment_image: string | null;
  dark_desktop_premium_model_experiment_image: string | null;
  dark_mobile_premium_model_experiment_image: string | null;
  video_mobile: string | null;
  video_desktop: string | null;

  resized_images: ResizedImage[];
  body_images: BodyImage[];
}
