import { getServerSecret } from "@/lib/server/env";
import { SESSION_TOKEN_COOKIE } from ".";
import { PlexAuthConfig } from "./types";

import Bowser from "bowser";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const claim = request.cookies.get(SESSION_TOKEN_COOKIE)?.value;
  if (!claim) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(
      claim,
      new TextEncoder().encode(getServerSecret())
    );

    if (payload.sub) return true;
  } catch (e) {
    console.log(e);
    return false;
  }

  return false;
}

/**
 * Constructs the header list and a fresh client ID for use in a Plex OAuth handshake
 * @param userAgent user agent of the client's browser, for constructing headers
 * @returns `PlexAuthConfig` containing headers and client ID
 */
export function authInit(userAgent: string): PlexAuthConfig {
  const browser = Bowser.getParser(userAgent);
  const clientId = uuidv4();

  return {
    headers: {
      "X-Plex-Product": "vignettte",
      "X-Plex-Version": "Plex OAuth",
      "X-Plex-Client-Identifier": clientId,
      "X-Plex-Model": "Plex OAuth",
      "X-Plex-Platform": browser.getBrowserName(),
      "X-Plex-Platform-Version": browser.getBrowserVersion(),
      "X-Plex-Device": browser.getOSName(),
      "X-Plex-Device-Name": `${browser.getBrowserName()} (vignettte)`,
      "X-Plex-Language": "en",
    },
    clientId,
  };
}
