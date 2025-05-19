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
  const API_KEY = import.meta.env.VITE_API_KEY;
  const METHOD_LIST = "?method=user.gettopalbums&user=tomyalberdi";
  const METHOD_DETAILS = "?method=album.getinfo";

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
    const url = `${BASE_URL}/${METHOD_LIST}&api_key=${API_KEY}&format=json&period=${timePeriod.value}&limit=48`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TimeConfig]);

  const getAlbumDetails = async (albumName: string, artistName: string) => {
    const url = `${BASE_URL}/${METHOD_DETAILS}&api_key=${API_KEY}&artist=${encodeURIComponent(
      artistName
    )}&album=${encodeURIComponent(albumName)}&format=json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        toast.error("Something went wrong, please try again later.");
        return;
      }
      const res = await response.json();
      return res.album;
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.error(error);
    }
    return null;
  };

  const exportData: DataContextType = {
    TimeConfig,
    updateTimeConfig,
    Albums,
    getAlbumDetails,
  };

  return (
    <DataContext.Provider value={exportData}>{children}</DataContext.Provider>
  );
};

export default DataContextComponent;
