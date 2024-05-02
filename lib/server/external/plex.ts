import { PlexAuthPin, PlexAuthResponse } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { getServerSecret } from "@/lib/server/env";
import ExternalAPI from "@/lib/server/external";

import { SignJWT } from "jose";

/**
 * Handles most communication with the Plex API, aside from authentication
 */
export class PlexService extends ExternalAPI {
  private authToken: string;

  /**
   * Constructs a new PlexService instance with the given Plex auth token
   * @param authToken an OAuth token that's been associated with a user's session
   */
  constructor(authToken: string) {
    super("https://plex.tv", {
      baseHeaders: {
        "X-Plex-Token": authToken,
        "Content-Type": "application/json",
      },
    });

    this.authToken = authToken;
  }

  /**
   * Constructs a new instance of PlexService by fetching the Plex OAuth token
   * associated with a given Pin and client ID
   *
   * @param pin a Plex OAuth Pin, obtained earlier in the authentication process
   * @param clientId a client ID, obtained earlier in the authentication process
   * @returns a new instance of PlexService, bound to an OAuth token
   */
  public static async fromAuthResponse(
    pin: PlexAuthPin,
    clientId: string
  ): Promise<PlexService> {
    const tokenResponse: PlexAuthResponse = await fetch(
      `https://plex.tv/api/v2/pins/${pin.id}`,
      {
        headers: {
          Accept: "application/json",
          code: pin.code,
          "X-Plex-Client-Identifier": clientId,
        },
      }
    ).then((res) => res.json());
    const token = tokenResponse.authToken;

    if (token && token.length > 0) {
      return new this(token);
    } else {
      throw new Error("Plex did not return an authentication token");
    }
  }

  /**
   * Creates a new session in the database (and a new vignettte user, if one
   * doesn't exist) and signs a session token to be assigned to the user's browser
   *
   * @returns the signed JWT containing the vignettte user ID associated with this
   * PlexService
   */
  public async getNewSession(): Promise<string> {
    const plexUser = await this.getUser();

    let existingUser = await prisma.user.findUnique({
      where: { plexId: plexUser.uuid },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          username: plexUser.username,
          email: plexUser.email,
          avatar: plexUser.thumb,
          plexId: plexUser.uuid,
        },
      });
    }

    const newSession = await prisma.session.create({
      data: {
        userId: existingUser.id,
        plexToken: this.authToken,
      },
    });

    return await new SignJWT({
      sub: newSession.userId.toString(),
      sid: newSession.id.toString(),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 week")
      .sign(new TextEncoder().encode(getServerSecret()));
  }

  /**
   * Fetches Plex account details for the auth token associated with this
   * PlexService instance
   *
   * @returns the Plex user details associated with this PlexService
   */
  public async getUser(): Promise<PlexUser> {
    const account = await this.request<PlexAccountResponse>(
      "/users/account.json"
    );

    return account.user;
  }
}

export interface PlexAccountResponse {
  user: PlexUser;
}

export interface PlexUser {
  id: number;
  uuid: string;
  email: string;
  joined_at: string;
  username: string;
  title: string;
  thumb: string;
  hasPassword: boolean;
  authToken: string;
  subscription: {
    active: boolean;
    status: string;
    plan: string;
    features: string[];
  };
  roles: {
    roles: string[];
  };
  entitlements: string[];
}
