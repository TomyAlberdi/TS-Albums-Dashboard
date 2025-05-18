import { useEffect, useState, type ReactNode } from "react";
import { DataContext, type DataContextType } from "@/Context/DataContext";
import { type ReturnData, type TimePeriod } from "@/lib/DataInterfaces";
import { toast } from "sonner";

interface DataContextProviderProps {
  children: ReactNode;
}

const DataContextComponent: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const BASE_URL = "https://ws.audioscrobbler.com/2.0";
  const API_KEY = "c360d63db0da100b508415c5bd8197fe";
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

  const [Albums, setAlbums] = useState<ReturnData>({
    loading: true,
    data: null,
  });

  const fetchAlbums = async (timePeriod: TimePeriod) => {
    setAlbums({
      loading: true,
      data: null,
    });
    const url = `${BASE_URL}/${METHOD}&api_key=${API_KEY}&format=json&period=${timePeriod.value}&limit=48`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        toast.error("Something went wrong, please try again later.");
        return;
      }
      const res = await response.json();
      setAlbums({
        loading: false,
        data: res.topalbums.album,
      });
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.error(error);
      setAlbums({
        loading: false,
        data: null,
      });
    }
  };

  useEffect(() => {
    const activeTime = TimeConfig.find((time) => time.active);
    fetchAlbums(activeTime!);
  }, [TimeConfig]);

  const exportData: DataContextType = {
    TimeConfig,
    updateTimeConfig,
    Albums,
  };

  return (
    <DataContext.Provider value={exportData}>{children}</DataContext.Provider>
  );
};

export default DataContextComponent;
