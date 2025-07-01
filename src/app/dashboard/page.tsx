"use client";
import React from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout, IsAdmin } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Access Denied
          </h1>
          <p className="text-neutral-600 mb-6">
            Please login to access your dashboard.
          </p>
          <Link href="/login">
            <Button variant="primary">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mycontainer py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Welcome, {user.name}! 👋
            </h1>
            <p className="text-neutral-600">
              You have successfully logged into your SEA Catering account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* User Info Card */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="font-semibold text-primary-700 mb-3">Account Info</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Role:</span> {user.role}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className="ml-1 px-2 py-1 bg-success-200 text-success-700 rounded-full text-xs">
                    Active
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-secondary-50 rounded-lg p-6">
              <h3 className="font-semibold text-secondary-700 mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/subscription" className="block">
                  <button className="w-full text-left text-sm text-secondary-700 hover:text-secondary-800 font-medium">
                    → View Subscriptions
                  </button>
                </Link>
                <Link href="/profile" className="block">
                  <button className="w-full text-left text-sm text-secondary-700 hover:text-secondary-800 font-medium">
                    → Edit Profile
                  </button>
                </Link>
                <Link href="/menu" className="block">
                  <button className="w-full text-left text-sm text-secondary-700 hover:text-secondary-800 font-medium">
                    → Browse Menu
                  </button>
                </Link>
              </div>
            </div>

            {/* Admin Panel Card (Only for Admins) */}
            {IsAdmin && (
              <div className="bg-tertiary-50 rounded-lg p-6">
                <h3 className="font-semibold text-tertiary-700 mb-3">Admin Panel</h3>
                <div className="space-y-3">
                  <Link href="/admin" className="block">
                    <button className="w-full text-left text-sm text-tertiary-700 hover:text-tertiary-800 font-medium">
                      → Admin Dashboard
                    </button>
                  </Link>
                  <button className="w-full text-left text-sm text-tertiary-700 hover:text-tertiary-800 font-medium">
                    → Manage Users
                  </button>
                  <button className="w-full text-left text-sm text-tertiary-700 hover:text-tertiary-800 font-medium">
                    → View Analytics
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Link href="/home">
              <Button variant="secondary">Back to Home</Button>
            </Link>
            <Button variant="tertiary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}