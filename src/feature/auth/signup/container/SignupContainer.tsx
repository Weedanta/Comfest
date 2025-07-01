"use client";
import React from "react";
import SignupForm from "../components/SignupForm";

const SignupContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-100 via-white to-tertiary-100">
      <div className="flex min-h-screen">
        {/* Left Side - Branding & Visual */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-secondary-600 to-tertiary-700">
          <div className="text-center text-white max-w-lg">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-white">Welcome to </span>
                <span className="text-primary-200">SEA Catering</span>
              </h2>
              <p className="text-xl text-secondary-100 mb-8">
                Join thousands of happy customers enjoying healthy meals daily
              </p>
            </div>

            {/* Illustration Placeholder */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="w-64 h-64 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-32 h-32 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 text-secondary-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
                <p>Free account creation</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
                <p>Personalized meal recommendations</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
                <p>Easy subscription management</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
                <p>24/7 customer support</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <p className="text-sm text-secondary-100">
                "SEA Catering has transformed my eating habits. The meals are delicious and nutritious!" 
                <br />
                <span className="font-semibold">- Sarah, Jakarta</span>
              </p>
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