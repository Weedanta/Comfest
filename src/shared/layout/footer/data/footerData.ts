import { FooterSection, ContactInfo, SocialLink } from "../types/footer.types";

export const footerSections: FooterSection[] = [
  {
    title: "Pages",
    links: [
      { name: "About", href: "#about" },
      { name: "Menu", href: "#menu" },
      { name: "Contact", href: "#contact" },
      { name: "Order", href: "#order" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Catering Events", href: "/services/events" },
      { name: "Corporate Catering", href: "/services/corporate" },
      { name: "Wedding Catering", href: "/services/wedding" },
      { name: "Private Chef", href: "/services/chef" },
    ],
  },
];

export const contactInfo: ContactInfo = {
  manager: "Brian",
  phone: "08123456789",
  email: "info@seacatering.com",
  address: "Jakarta, Indonesia",
};

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://instagram.com/seacatering",
    imageSrc: "/assets/img/socialmedia/instagram.png", // Adjust extension if needed
    ariaLabel: "Follow us on Instagram",
  },
  {
    name: "WhatsApp",
    href: `https://wa.me/6208123456789`,
    imageSrc: "/assets/img/socialmedia/phone.png", // Assuming this is WhatsApp icon
    ariaLabel: "Contact us via WhatsApp",
  },
];