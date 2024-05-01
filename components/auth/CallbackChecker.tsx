"use client";

import { Button } from "@/components/ui";
import {
  PlexAuthError,
  PlexAuthState,
  PlexAuthStatus,
  createSession,
} from "@/lib/server/auth";

import { LinkBreak, Plugs, PlugsConnected, X } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function AuthCallbackChecker() {
  const [authState, setAuthState] = useState<PlexAuthState>({
    status: PlexAuthStatus.CONNECTING,
  });
  const params = useSearchParams();
  const clientId = params.get("cid");

  // Effect runs twice, creating two sessions, unless we use this
  const called = useRef(false);

  useEffect(() => {
    if (!called.current) {
      called.current = true;
      createSession(clientId).then((result) => {
        setAuthState(result);

        if (result.status === PlexAuthStatus.SUCCESS) {
          setTimeout(() => {
            window.close();
          }, 1500);
        }
      });
    }
  }, [authState.status, clientId]);

  switch (authState.status) {
    case PlexAuthStatus.ERROR:
      const message = () => {
        switch (authState.error) {
          case PlexAuthError.NO_CLIENT_ID:
            return "Client ID does not exist in query parameters";
          case PlexAuthError.NO_PIN_COOKIE:
            return "Pin cookie does not exist";
          case PlexAuthError.BLANK_AUTH_TOKEN:
            return "Plex did not return an authentication token";
        }
      };

      return (
        <>
          <LinkBreak className="w-12 h-12" />
          <h4 className="font-medium text-xl">{message()}</h4>
          <Button variant="outline" onClick={window.close}>
            <X weight="bold" />
            Close
          </Button>
        </>
      );
    case PlexAuthStatus.CONNECTING:
      return (
        <>
          <Plugs className="animate-bounce w-12 h-12" />
          <h4 className="font-medium text-xl">
            Checking authentication response from Plex
          </h4>
        </>
      );
    case PlexAuthStatus.SUCCESS:
      return (
        <>
          <PlugsConnected className="w-12 h-12" />
          <h4 className="font-medium text-xl">Authentication successful</h4>
        </>
      );
  }
}
