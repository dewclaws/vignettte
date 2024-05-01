"use client";

import { NavBranding } from "@/components/nav";
import { Button } from "@/components/ui/Button";
import { constructAuthUrl } from "@/lib/server/auth";

import { CircleNotch, SignIn } from "@phosphor-icons/react";
import { useState } from "react";

export default function SignInPage() {
  const [authenticating, setAuthenticating] = useState(false);

  async function authenticate() {
    setAuthenticating(true);

    const popup = window.open();
    if (popup) {
      constructAuthUrl(
        window.navigator.userAgent,
        `${window.location.protocol}//${window.location.host}`
      ).then((url) => (popup.location = url));

      let timer = setInterval(() => {
        if (popup.closed) {
          clearInterval(timer);
          setAuthenticating(false);
        }
      }, 1000);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full gap-3xl">
      <NavBranding context="auth" />
      <Button onClick={authenticate} disabled={authenticating}>
        {authenticating ? (
          <CircleNotch
            className="size-xl motion-safe:animate-spin delay-100"
            weight="bold"
          />
        ) : (
          <SignIn className="size-xl" weight="bold" />
        )}
        Sign in with Plex
      </Button>
    </div>
  );
}
