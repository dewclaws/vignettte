import { isAuthenticated } from "./helpers";
import { constructAuthUrl, createSession } from "./plex";
import {
  PlexAuthConfig,
  PlexAuthError,
  PlexAuthPin,
  PlexAuthResponse,
  PlexAuthState,
  PlexAuthStatus,
} from "./types";

export const PLEX_PIN_COOKIE = "plex-pin";
export const SESSION_TOKEN_COOKIE = "session-claim";

export {
  PlexAuthError,
  PlexAuthStatus,
  constructAuthUrl,
  createSession,
  isAuthenticated,
};
export type { PlexAuthConfig, PlexAuthPin, PlexAuthResponse, PlexAuthState };
