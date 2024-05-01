"use client";

import { NavBranding } from "@/components/nav";
import { Button } from "@/components/ui/Button";
import { constructAuthUrl } from "@/lib/server/auth";
import { openPopup } from "@/lib/util/popup";

import { CircleNotch, SignIn } from "@phosphor-icons/react";
import { useState } from "react";

export default function SignInPage() {
  const [authenticating, setAuthenticating] = useState(false);

  async function authenticate() {
    setAuthenticating(true);

    const url = await constructAuthUrl(window.navigator.userAgent);
    const popup = openPopup(url, "Authenticate with Plex", 600, 700);

    if (popup) {
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
