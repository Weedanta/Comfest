import React from "react";

const Copyright: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-neutral-700 pt-6 mt-8">
      <div className="flex justify-center items-center gap-4">
        <p className="text-neutral-400 text-sm">
          © {currentYear} SEA Catering. All rights reserved.
        </p>
        
        
      </div>
    </div>
  );
};

export default Copyright;