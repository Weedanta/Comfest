export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface ContactInfo {
  manager: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  imageSrc: string;
  ariaLabel: string;
}