import type { TimePeriod } from "@/lib/DataInterfaces";
import { createContext } from "react";

export interface DataContextType {
  TimeConfig: TimePeriod[];
  updateTimeConfig: (time: string) => void;
}

export const DataContext = createContext<DataContextType | null>(null);
