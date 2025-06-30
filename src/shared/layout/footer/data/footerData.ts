import { FooterSection, ContactInfo } from "../types/footer.types";

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
