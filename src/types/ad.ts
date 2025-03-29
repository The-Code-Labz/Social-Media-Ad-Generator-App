export interface AdTemplate {
  primaryText: string;
  headline: string;
}

export interface AdImage {
  url: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface GeneratedAd {
  template: AdTemplate;
  image?: AdImage;
  city: string;
}
