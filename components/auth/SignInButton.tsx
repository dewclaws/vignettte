"use client";

import { Button } from "@/components/ui";
import { constructAuthUrl, isAuthenticated } from "@/lib/server/auth";

import { CircleNotch, SignIn } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignInButton() {
  const [authenticating, setAuthenticating] = useState(false);
  const router = useRouter();

  async function authenticate() {
    setAuthenticating(true);

    const popup = window.open();
    if (popup) {
      constructAuthUrl(
        window.navigator.userAgent,
        `${window.location.protocol}//${window.location.host}`
      ).then((url) => {
        popup.location = url;

        // check every second in case location wasn't set
        let timer = setInterval(() => {
          try {
            if (popup.location.host === "") {
              popup.location = url;
              clearInterval(timer);
            }
          } catch {
            clearInterval(timer);
          }
        }, 1000);
      });

      let timer = setInterval(async () => {
        if (popup.closed) {
          clearInterval(timer);
          window.focus();

          if (await isAuthenticated()) {
            console.log("isAuthenticated = true");
            // timeout because middleware will stop us
            setTimeout(() => router.push("/library"), 250);
          } else {
            console.log("isAuthenticated = false");
            setAuthenticating(false);
          }
        }
      }, 1000);
    }
  }

  return (
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
  );
}
