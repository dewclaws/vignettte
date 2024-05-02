"use server";

import ExternalAPI from "@/lib/server/external";
import { PlexService } from "@/lib/server/external/plex";
import {
  PLEX_PIN_COOKIE,
  PlexAuthConfig,
  PlexAuthError,
  PlexAuthPin,
  PlexAuthState,
  PlexAuthStatus,
  SESSION_TOKEN_COOKIE,
} from ".";
import { authInit } from "./helpers";

import { DateTime } from "luxon";
import { cookies } from "next/headers";

/**
 * Fetches a new Pin from `https://plex.tv` for initiating an OAuth handshake
 * @param authConfig `PlexAuthConfig` to extract headers from
 * @returns pin returned from Plex API
 */
async function getPin({ headers }: PlexAuthConfig): Promise<PlexAuthPin> {
  const client = new ExternalAPI("https://plex.tv/api/v2", {
    baseHeaders: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return client.request<PlexAuthPin>("/pins?strong=true", {
    method: "POST",
    headers,
  });
}

/**
 * Constructs an auth URL to sign in with Plex
 * @param userAgent user agent of the client
 * @param hostname hostname of the instance to build the callback URL
 * @returns constructed Plex sign-in URL
 */
export async function constructAuthUrl(
  userAgent: string,
  hostname: string
): Promise<string> {
  const authConfig = await authInit(userAgent);
  const pin = await getPin(authConfig);
  const params = new URLSearchParams({
    clientID: authConfig.clientId,
    code: pin.code,
    forwardUrl: `${hostname}/auth/callback?cid=${authConfig.clientId}`,
    "context[device][product]": authConfig.headers["X-Plex-Product"],
    "context[device][version]": authConfig.headers["X-Plex-Version"],
    "context[device][platform]": authConfig.headers["X-Plex-Platform"],
    "context[device][platformVersion]":
      authConfig.headers["X-Plex-Platform-Version"],
    "context[device][device]": authConfig.headers["X-Plex-Device"],
    "context[device][deviceName]": authConfig.headers["X-Plex-Device-Name"],
    "context[device][model]": authConfig.headers["X-Plex-Model"],
  });

  cookies().set({
    name: PLEX_PIN_COOKIE,
    value: JSON.stringify({ id: pin.id, code: pin.code }),
    httpOnly: true,
    sameSite: true,
    path: "/",
  });

  return `https://app.plex.tv/auth#?${params}`;
}

/**
 * Creates a session in the database and sets a session token cookie
 * on the client
 *
 * @param clientId the client ID created earlier in the process
 * @returns the final status of session creation
 */
export async function createSession(
  clientId: string | null
): Promise<PlexAuthState> {
  const pinCookie = cookies().get(PLEX_PIN_COOKIE);
  if (!pinCookie)
    return { status: PlexAuthStatus.ERROR, error: PlexAuthError.NO_PIN_COOKIE };
  if (!clientId)
    return { status: PlexAuthStatus.ERROR, error: PlexAuthError.NO_CLIENT_ID };

  const pin: PlexAuthPin = JSON.parse(pinCookie.value);

  try {
    const service: PlexService = await PlexService.fromAuthResponse(
      pin,
      clientId
    );

    cookies().set({
      name: SESSION_TOKEN_COOKIE,
      value: await service.getNewSession(),
      httpOnly: true,
      sameSite: true,
      path: "/",
      expires: DateTime.now().plus({ week: 1 }).toJSDate(),
    });

    cookies().delete(PLEX_PIN_COOKIE);
  } catch {
    return {
      status: PlexAuthStatus.ERROR,
      error: PlexAuthError.BLANK_AUTH_TOKEN,
    };
  }

  return { status: PlexAuthStatus.SUCCESS };
}
