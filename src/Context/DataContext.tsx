import type { ReturnData, TimePeriod } from "@/lib/DataInterfaces";
import { createContext } from "react";

export interface DataContextType {
  TimeConfig: TimePeriod[];
  updateTimeConfig: (time: string) => void;
  Albums: ReturnData;
}

export const DataContext = createContext<DataContextType | null>(null);
