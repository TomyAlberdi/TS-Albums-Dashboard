import { useDataContext } from "@/Context/useDataContext";
import type { CompleteAlbum } from "@/lib/DataInterfaces";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarFold, Hash, Headphones, Play, Tag, User } from "lucide-react";

interface AlbumDetailsProps {
  albumName: string;
  artistName: string;
}

const AlbumDetails = ({ albumName, artistName }: AlbumDetailsProps) => {
  const { getAlbumDetails } = useDataContext();
  const [Album, setAlbum] = useState<CompleteAlbum | null>(null);
  const [Loading, setLoading] = useState(true);

  const [imageUrl, setImageUrl] = useState<string>(
    "https://www.iphonefaq.org/files/styles/large/public/apple_music.jpg"
  );
  useEffect(() => {
    if (Album?.image?.[Album?.image.length - 1]?.["#text"]) {
      setImageUrl(Album.image[Album?.image.length - 1]["#text"]);
    }
  }, [Album]);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (!albumName || !artistName) return;
      setLoading(true);
      try {
        const data = await getAlbumDetails(albumName, artistName);
        setAlbum(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbumDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumName, artistName]);

  if (Loading) return <Skeleton className="w-full md:h-full h-[90svh]" />;

  return (
    <ScrollArea className="w-full md:h-full h-[90svh] md:min-w-[750px] md:min-h-[500px]">
      <div className="w-full h-full flex md:flex-row flex-col p-6">
        <section className="md:w-2/3 w-full h-full">
          <div className="h-3/5 w-full flex md:flex-row flex-col">
            <div
              className="w-full md:w-1/2 aspect-square bg-cover bg-center bg-no-repeat rounded-md"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            />
            <div className="md:w-1/2 w-full flex flex-col justify-start items-start flex-wrap gap-3 md:px-3 md:mt-0 mt-3">
              <DialogTitle className="text-3xl">{Album?.name}</DialogTitle>
              <DialogTitle className="font-light flex items-center gap-2">
                <User /> {Album?.artist}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <CalendarFold />
                {Album?.wiki?.published.split(",")[0] || "No date available"}
              </DialogDescription>
            </div>
          </div>
          <div className="md:h-2/5 h-auto w-full flex md:flex-row flex-col-reverse pt-3 pr-3 md:gap-0 gap-3">
            <div className="flex flex-col md:w-1/2 w-full justify-center items-start gap-3">
              {Album?.tags?.tag ? (
                Album?.tags?.tag?.slice(0, 5).map((tag, index) => (
                  <span className="flex items-center gap-2" key={index}>
                    <Tag />
                    {tag.name}
                  </span>
                ))
              ) : (
                <span className="flex items-center gap-2">
                  <Tag />
                  No tags available
                </span>
              )}
            </div>
            <div className="md:w-1/2 w-full flex flex-col justify-center items-center gap-3">
              <span className="flex items-center gap-2 text-xl">
                <Hash />
                <Play />
                {Album?.playcount || "No playcount available"}
              </span>
              <span className="flex items-center gap-2 text-xl">
                <Headphones />
                <User />
                {Album?.listeners || "No listeners available"}
              </span>
            </div>
          </div>
        </section>
        <section className="md:h-full h-auto md:w-1/3 w-full bg-input rounded-md p-2 md:mt-0 mt-3">
          {Album?.tracks?.track ? (
            <ol className="list-decimal list-inside ">
              {Array.isArray(Album?.tracks?.track) &&
                Album.tracks?.track.map((track, index) => {
                  return (
                    <li key={index} className="text-xs text-muted-foreground!">
                      <span className="mr-2 text-sm">{track.name}</span>
                      {Math.floor(track.duration / 60)}:
                      {(track.duration % 60).toString().padStart(2, "0")}
                    </li>
                  );
                })}
              {!Array.isArray(Album.tracks.track) && (
                <li>
                  {Album.tracks.track.name} -{" "}
                  {Math.floor(Album.tracks.track.duration / 60)}:
                  {(Album.tracks.track.duration % 60)
                    .toString()
                    .padStart(2, "0")}
                </li>
              )}
            </ol>
          ) : (
            <h2>No tracks available</h2>
          )}
        </section>
      </div>
    </ScrollArea>
  );
};
export default AlbumDetails;
