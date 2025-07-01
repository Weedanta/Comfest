import React from "react";
import AboutHero from "../components/AboutHero";
import AboutStory from "../components/AboutStory";

const AboutContainer = () => {
  return (
    <main className="min-h-screen">
      <div className="h-[50v">
        <AboutHero />
      </div>
      <AboutStory />
    </main>
  );
};

export default AboutContainer;
