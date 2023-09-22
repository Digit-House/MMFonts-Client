export interface SelectOptionType {
  label: string;
  value: string;
}

export interface FontType {
  nameEn: string;
  name: string;
  fileName: string;
  fontSupportType: string;
  fontStyle: string;
  createdBy: string;
  enSupport?: string;
  acceptToDownload?: string;
  downloadLink?: string;
  creatorLink?: string;
}

export interface PremiumFontType extends FontType {
  fbLink: string;
  imageFolder: string;
  price: number;
  images: string;
  featureImage?: string;
}

export interface FontJsonType {
  [fontName: string]: FontType;
}
