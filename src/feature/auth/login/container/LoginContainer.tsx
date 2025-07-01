"use client";
import React from "react";
import Image from "next/image";
import LoginForm from "../components/LoginForm";
import Hp from "@/assets/img/login/hp.svg";

const LoginContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-white to-secondary-100">
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>

        {/* Right Side - Branding & Visual */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="text-center text-white max-w-lg">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-secondary-700">SEA </span>
                <span className="text-white">Catering</span>
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Healthy Meals, Anytime, Anywhere
              </p>
            </div>

            <div className="w-auto h-70 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <Image
                src={Hp}
                alt="Placeholder"
                draggable="false"
                className="h-ful"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
