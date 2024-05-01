import { Monitor } from "./monitor";

export enum MediaType {
  MOVIE = "movie",
  SERIES = "series",
}

export enum MediaRequestStatus {
  PENDING = 1,
  APPROVED,
  DECLINED,
  FAILED,
}

export type Movie = {
  id: number;
  title: string;
  release_date: Date;
  poster_path: string;
  original_title: string;
  monitors: Monitor[];
};
