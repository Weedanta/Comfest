import React from "react";
import HeroSection from "../components/HeroSection";
import Image from "next/image";
import HeroImage from "@/assets/img/home/hero-picture.png";

const HeroContainer = () => {
  return (
    <section className="h-screen w-full flex justify-between items-center mycontainer bg-neutral-800">
      <HeroSection />
      <div className="md:w-1/2 mt-8 md:mt-0 animate__animated animate__fadeInRight flex justify-end">
        <Image
          src={HeroImage}
          alt="hero"
          className="rounded-lg shadow-lg lg:ml-12 w-full md:w-4/5 h-auto max-w-lg mx-auto md:mx-0"
        />
      </div>
    </section>
  );
};

export default HeroContainer;
