export interface MyAICharacter {
  id: string;
  blurredImageUrl: string;
  resizedImages: (resizedImages | null)[] ;
  bodyImages: (string | null)[];
  age: number;
  firstName: string;
  lastName: string;
  description: string;
  isLocked: boolean;
}

interface resizedImages {
  default: string;
  desktopImage: string;
  highResolutionDesktopImage: string;
  highResolutionMobileImage: string;
  highResolutionThumbnail: string;
  mobileImage: string;
  thumbnail: string;
}
