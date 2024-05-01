import { LibraryReleaseList } from "@/components/library/release";
import { ReleaseListingProps } from "@/components/library/release/Listing";
import { MediaType } from "@/lib/types/media";
import { MonitorStatus } from "@/lib/types/monitor";
import { Duration } from "luxon";

export default function LibraryHome() {
  const entries: ReleaseListingProps[] = [
    {
      id: 823464,
      title: "Godzilla x Kong: The New Empire",
      year: "2024",
      image: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
      mediaType: MediaType.MOVIE,
      monitors: [
        {
          id: 1,
          quality: "HD-1080p",
          data: {
            status: MonitorStatus.SEARCHING,
            added: new Date(Date.now()),
          },
        },
        {
          id: 2,
          quality: "4K",
          data: {
            status: MonitorStatus.CUTOFF_UNMET,
            size_on_disk: 65283502899,
            added: new Date(Date.now()),
          },
        },
      ],
    },
    {
      id: 693134,
      title: "Dune: Part Two",
      year: "2024",
      image: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      mediaType: MediaType.MOVIE,
      monitors: [
        {
          id: 1,
          quality: "HD-1080p",
          data: {
            status: MonitorStatus.GRABBED,
            eta: Duration.fromObject({ minutes: 16, seconds: 44 }),
            added: new Date(Date.now()),
          },
        },
        {
          id: 2,
          quality: "4K",
          data: {
            status: MonitorStatus.CUTOFF_MET,
            size_on_disk: 45286592809,
            added: new Date(Date.now()),
          },
        },
      ],
    },
    {
      id: 915935,
      title: "Anatomy of a Fall",
      year: "2023",
      image: "/kQs6keheMwCxJxrzV83VUwFtHkB.jpg",
      mediaType: MediaType.MOVIE,
      monitors: [
        {
          id: 1,
          quality: "4K",
          data: {
            status: MonitorStatus.CUTOFF_MET,
            size_on_disk: 51289592805,
            added: new Date(Date.now()),
          },
        },
      ],
    },
    {
      id: 940551,
      title: "Migration",
      year: "2023",
      image: "/ldfCF9RhR40mppkzmftxapaHeTo.jpg",
      mediaType: MediaType.MOVIE,
      monitors: [
        {
          id: 1,
          quality: "HD-1080p",
          data: {
            status: MonitorStatus.GRABBED,
            eta: Duration.fromObject({ minutes: 16, seconds: 44 }),
            added: new Date(Date.now()),
          },
        },
        {
          id: 2,
          quality: "4K",
          data: {
            status: MonitorStatus.SEARCHING,
            added: new Date(Date.now()),
          },
        },
      ],
    },
    {
      id: 273481,
      title: "Sicario",
      year: "2015",
      image: "/7P4Pd24PYhIGd8ow47n9ttSTDkY.jpg",
      mediaType: MediaType.MOVIE,
      monitors: [
        {
          id: 1,
          quality: "HD-1080p",
          data: {
            status: MonitorStatus.GRABBED,
            eta: Duration.fromObject({ minutes: 16, seconds: 44 }),
            added: new Date(Date.now()),
          },
        },
        {
          id: 2,
          quality: "4K",
          data: {
            status: MonitorStatus.SEARCHING,
            added: new Date(Date.now()),
          },
        },
      ],
    },
    {
      id: 496243,
      title: "Parasite",
      year: "2019",
      image: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      mediaType: MediaType.MOVIE,
      monitors: [
        {
          id: 1,
          quality: "4K",
          data: {
            status: MonitorStatus.SEARCHING,
            added: new Date(Date.now()),
          },
        },
        {
          id: 2,
          quality: "HD-1080p",
          data: {
            status: MonitorStatus.GRABBED,
            eta: Duration.fromObject({ minutes: 16, seconds: 44 }),
            added: new Date(Date.now()),
          },
        },
      ],
    },
  ];

  return <LibraryReleaseList entries={entries} />;
}
