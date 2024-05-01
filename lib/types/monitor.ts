import { Duration } from "luxon";

export enum MonitorStatus {
  CUTOFF_MET = "acquired_done",
  CUTOFF_UNMET = "acquired",
  GRABBED = "grabbed",
  SEARCHING = "searching",
}

export type MonitorData =
  | {
      status: MonitorStatus.CUTOFF_MET | MonitorStatus.CUTOFF_UNMET;
      size_on_disk: number;
      added: Date;
    }
  | {
      status: MonitorStatus.GRABBED;
      eta: Duration;
      added: Date;
    }
  | {
      status: MonitorStatus.SEARCHING;
      added: Date;
    };

export interface Monitor {
  id: number;
  quality: string;
  data: MonitorData;
}
