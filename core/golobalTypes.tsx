export interface SelectOptionType {
  label: string;
  value: string;
}

export interface FontType {
  name: string;
  nameEn: string;
  fileName: string;
  fontSupportType: string;
  createdBy: string;
  fontStyle: string;
}

export interface PremiumFontType extends FontType {
  fbLink: string;
  images: string;
  price: string;
}
