import { LibraryReleaseListing } from "@/components/library/release";
import { ReleaseListingProps } from "./Listing";

export default function LibraryReleaseList({
  entries,
}: {
  entries: ReleaseListingProps[];
}) {
  return (
    <ul role="list" className="divide-y divide-body-background">
      {entries.map((entry) => (
        <LibraryReleaseListing key={entry.id} {...entry} />
      ))}
    </ul>
  );
}
