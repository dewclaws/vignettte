interface PlexAuthHeaders extends Record<string, string> {
  "X-Plex-Product": string;
  "X-Plex-Version": string;
  "X-Plex-Client-Identifier": string;
  "X-Plex-Model": string;
  "X-Plex-Platform": string;
  "X-Plex-Platform-Version": string;
  "X-Plex-Device": string;
  "X-Plex-Device-Name": string;
  "X-Plex-Language": string;
}

export interface PlexAuthPin {
  id: number;
  code: string;
}

export interface PlexAuthConfig {
  headers: PlexAuthHeaders;
  clientId: string;
}

export enum PlexAuthStatus {
  ERROR,
  CONNECTING,
  SUCCESS,
}

export enum PlexAuthError {
  NO_CLIENT_ID,
  NO_PIN_COOKIE,
  BLANK_AUTH_TOKEN,
}

export type PlexAuthState =
  | {
      status: PlexAuthStatus.CONNECTING | PlexAuthStatus.SUCCESS;
    }
  | {
      status: PlexAuthStatus.ERROR;
      error: PlexAuthError;
    };

export interface PlexAuthResponse {
  authToken: string;
}
