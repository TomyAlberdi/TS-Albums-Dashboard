import { useState, type ReactNode } from "react";
import { DataContext, type DataContextType } from "@/Context/DataContext";
import type { TimePeriod } from "@/lib/DataInterfaces";

interface DataContextProviderProps {
  children: ReactNode;
}

const DataContextComponent: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const BASE_URL = "https://ws.audioscrobbler.com/2.0";
  const API_KEY = `api_key=${import.meta.env.VITE_API_KEY}`;
  const METHOD = "?method=user.gettopalbums&user=tomyalberdi";

  const [TimeConfig, setTimeConfig] = useState<Array<TimePeriod>>([
    {
      name: "7 Days",
      value: "7day",
      active: true,
    },
    {
      name: "30 Days",
      value: "1month",
      active: false,
    },
    {
      name: "3 Months",
      value: "3month",
      active: false,
    },
    {
      name: "6 Months",
      value: "6month",
      active: false,
    },
    {
      name: "12 Months",
      value: "12month",
      active: false,
    },
    {
      name: "All Time",
      value: "overall",
      active: false,
    },
  ]);

  const updateTimeConfig = (time: string) => {
    const updatedTimeConfig = TimeConfig.map((period) => {
      if (period.active && period.value !== time) {
        period.active = false;
      }
      if (period.value === time) {
        period.active = true;
      }
      return period;
    });
    setTimeConfig(updatedTimeConfig);
  };

  const exportData: DataContextType = {
    TimeConfig,
    updateTimeConfig,
  };

  return (
    <DataContext.Provider value={exportData}>{children}</DataContext.Provider>
  );
};

export default DataContextComponent;
