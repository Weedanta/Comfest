import React from "react";

const Copyright: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-neutral-700 pt-6 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-neutral-400 text-sm">
          © {currentYear} SEA Catering. All rights reserved.
        </p>
        
        <div className="flex gap-4 text-xs text-neutral-400">
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default Copyright;