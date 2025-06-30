import React from "react";
import Link from "next/link";
import { FooterSection as FooterSectionType } from "../types/footer.types";

interface FooterSectionProps {
  section: FooterSectionType;
}

const FooterSection: React.FC<FooterSectionProps> = ({ section }) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-white">{section.title}</h3>
      <ul className="space-y-3">
        {section.links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-neutral-300 hover:text-secondary-700 transition-colors duration-200 text-sm"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;