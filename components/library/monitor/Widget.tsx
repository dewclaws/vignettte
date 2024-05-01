import { Monitor, MonitorData, MonitorStatus } from "@/lib/types/monitor";
import { formatBytes } from "@/lib/util";
import {
  Broadcast,
  CalendarPlus,
  ClockCountdown,
  Package,
} from "@phosphor-icons/react/dist/ssr";
import { cva } from "class-variance-authority";
import { DateTime } from "luxon";

const statusBadge = cva("px-xs rounded-sm", {
  variants: {
    status: {
      searching: "bg-warning-background text-warning-foreground",
      grabbed: "bg-primary-background text-primary-foreground",
      acquired: "bg-info-background text-info-foreground",
      acquired_done: "bg-success-background text-success-foreground",
    },
  },
});

function WidgetDetails({ data }: { data: MonitorData }) {
  const statusString = () => {
    switch (data.status) {
      case MonitorStatus.SEARCHING:
        return "Searching";
      case MonitorStatus.GRABBED:
        return "Grabbed";
      default:
        return "In Library";
    }
  };

  return (
    <ul className="space-y-sm px-xs text-sm">
      <li className="flex items-center gap-md">
        <Broadcast className="size-xl" />
        <p className={statusBadge({ status: data.status })}>{statusString()}</p>
      </li>
      {data.status === MonitorStatus.GRABBED && (
        <li className="flex items-center gap-sm">
          <ClockCountdown className="size-xl" />
          <p className="px-xs font-mono">{data.eta.toFormat("h:m:s")}</p>
        </li>
      )}
      {(data.status === MonitorStatus.CUTOFF_UNMET ||
        data.status === MonitorStatus.CUTOFF_MET) && (
        <li className="flex items-center gap-md">
          <Package className="size-xl" />
          <p className="px-xs">{formatBytes(data.size_on_disk)}</p>
        </li>
      )}
      <li className="flex items-center gap-sm">
        <CalendarPlus className="size-xl" />
        <p className="px-xs">{DateTime.fromJSDate(data.added).toISODate()}</p>
      </li>
    </ul>
  );
}

export default function LibraryMonitorWidget({
  monitor,
}: {
  monitor: Monitor;
}) {
  return (
    <div className="flex flex-col gap-xs px-md py-sm rounded-md size-full bg-body-background text-muted-foreground">
      <p className="font-semibold">{monitor.quality}</p>
      <WidgetDetails data={monitor.data} />
    </div>
  );
}
