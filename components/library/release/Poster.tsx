import { FilmSlate } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export default function LibaryReleasePoster({ path }: { path?: string }) {
  return (
    <div className="relative aspect-[2/3] h-36 bg-muted-background rounded-sm">
      {path ? (
        <Image
          src={"https://image.tmdb.org/t/p/w185" + path}
          fill
          alt="Poster"
          className="rounded-sm"
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <FilmSlate className="text-muted-foreground size-3xl" />
        </div>
      )}
    </div>
  );
}
