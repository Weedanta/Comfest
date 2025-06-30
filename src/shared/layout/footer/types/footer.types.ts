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
