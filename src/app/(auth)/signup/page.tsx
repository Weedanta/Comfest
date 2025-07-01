import React from "react";
import { Metadata } from "next";
import SignupContainer from "@/feature/auth/signup/container/SignupContainer";

export const metadata: Metadata = {
  title: "Sign Up - SEA Catering",
  description: "Create your SEA Catering account and start your journey to healthier eating today.",
};

export default function SignupPage() {
  return <SignupContainer />;
}