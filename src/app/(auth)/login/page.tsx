import React from "react";
import { Metadata } from "next";
import LoginContainer from "@/feature/auth/login/container/LoginContainer";

export const metadata: Metadata = {
  title: "Login - SEA Catering",
  description: "Sign in to your SEA Catering account and enjoy healthy meals delivered to your door.",
};

export default function LoginPage() {
  return <LoginContainer />;
}