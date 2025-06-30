import React from "react";
import Image from "next/image";
import { socialLinks } from "../data/footerData";

const SocialLinks: React.FC = () => {
  return (
    <div className="mt-6">
      <h4 className="text-white font-semibold mb-3">Follow Us</h4>
      <div className="flex space-x-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            className="text-neutral-400 hover:text-secondary-700 transition-all duration-200 hover:scale-110"
            aria-label={social.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-8 h-8 relative">
              <Image
                src={social.imageSrc}
                alt={social.name}
                fill
                className="object-contain filter brightness-75 hover:brightness-100 transition-all duration-200"
                sizes="32px"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;