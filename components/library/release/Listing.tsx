import { LibraryMonitorWidget } from "@/components/library/monitor";
import {
  LibraryReleaseListingHeader,
  LibraryReleasePoster,
} from "@/components/library/release";
import { MediaType } from "@/lib/types/media";
import { Monitor } from "@/lib/types/monitor";

export interface ReleaseListingProps {
  id: number;
  image?: string;
  summary?: string;
  year?: string;
  title: string;
  mediaType: MediaType;
  monitors?: Monitor[];
}

export default function LibraryReleaseListing({
  image,
  year,
  title,
  monitors,
}: ReleaseListingProps) {
  return (
    <li className="flex justify-between gap-x-2xl p-xl select-none">
      {/* listing container */}
      <div className="flex gap-x-lg w-full">
        <LibraryReleasePoster path={image} />

        {/* info container */}
        <div className="flex flex-col gap-sm w-full min-w-0">
          <LibraryReleaseListingHeader title={title} release_year={year} />

          <div className="flex gap-lg size-full">
            {monitors &&
              monitors.map((m) => (
                <LibraryMonitorWidget key={m.id} monitor={m} />
              ))}
          </div>
        </div>
        {/* end info container */}
      </div>
      {/* end listing container */}
    </li>
  );
}
