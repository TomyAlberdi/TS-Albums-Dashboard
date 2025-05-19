import type { CompleteAlbum, ReturnData, TimePeriod } from "@/lib/DataInterfaces";
import { createContext } from "react";

export interface DataContextType {
  TimeConfig: TimePeriod[];
  updateTimeConfig: (time: string) => void;
  Albums: ReturnData;
  getAlbumDetails: (albumName: string, artistName: string) => Promise<CompleteAlbum | null>;
}

export const DataContext = createContext<DataContextType | null>(null);
