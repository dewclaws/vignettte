import { PlexAuthPin, PlexAuthResponse } from "@/lib/server/auth";
import { prisma } from "@/lib/server/db";
import { getServerSecret } from "@/lib/server/env";
import ExternalAPI from "@/lib/server/external";

import { SignJWT } from "jose";

export class PlexService extends ExternalAPI {
  private authToken: string;

  constructor(authToken: string) {
    super("https://plex.tv", {
      baseHeaders: {
        "X-Plex-Token": authToken,
        "Content-Type": "application/json",
      },
    });

    this.authToken = authToken;
  }

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
