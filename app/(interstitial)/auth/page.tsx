"use client";

import { SignInButton } from "@/components/auth";
import { NavBranding } from "@/components/nav";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full gap-3xl">
      <NavBranding context="auth" />
      <SignInButton />
    </div>
  );
}
