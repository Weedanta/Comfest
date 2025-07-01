"use client";
import React from "react";
import SignupForm from "../components/SignupForm";
import Image from "next/image";
import Hp from "@/assets/img/login/hp.svg";

const SignupContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-100 via-white to-tertiary-100">
      <div className="flex min-h-screen">
        {/* Left Side - Branding & Visual */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-secondary-600 to-tertiary-700">
          <div className="text-center text-white max-w-lg">
                        <div className="w-64 h-64 mx-auto bg-white/20 rounded-full flex items-center justify-center">
             <Image
                src={Hp}
                alt="Placeholder"
                draggable="false"
                className="h-ful"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupContainer;
