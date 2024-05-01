import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function LibraryReleaseListingHeader({
  title,
  release_year,
}: {
  title: string;
  release_year?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-md min-w-0">
        <div className="flex-initial truncate type-list-heading select-text cursor-default">
          {title}
        </div>

        {release_year && (
          <div className="type-list-subheading align-middle">
            {release_year}
          </div>
        )}

        <ArrowRight className="text-muted-background size-xl shrink-0" />
      </div>
    </div>
  );
}
