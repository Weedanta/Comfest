import React from "react";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link
      className="transition-transform hover:scale-105"
      href="/home"
    >
      <h1 className="text-2xl font-semibold transition-transform hover:scale-105">
        <span className="text-secondary-700">SEA </span>
        <span className="text-white">Catering</span>
      </h1>
    </Link>
  );
};

export default Logo;