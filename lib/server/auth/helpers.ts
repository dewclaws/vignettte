"use server";

import { SESSION_TOKEN_COOKIE } from ".";
import { PlexAuthConfig } from "./types";

import Bowser from "bowser";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

/**
 * A server action that simply checks if the client bears a session token
 * @returns whether there is a session token set
 */
export async function isAuthenticated(): Promise<boolean> {
  return cookies().has(SESSION_TOKEN_COOKIE);
}

/**
 * A server action that constructs the header list and
 * a fresh client ID for use in a Plex OAuth handshake
 *
 * @param userAgent user agent of the client's browser
 * @returns `PlexAuthConfig` containing headers and client ID
 */
export async function authInit(userAgent: string): Promise<PlexAuthConfig> {
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
