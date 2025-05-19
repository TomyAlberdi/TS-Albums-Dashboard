import type { PartialAlbum } from "@/lib/DataInterfaces";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// <a href="https://www.flaticon.com/free-icons/medal" />
// <a href="https://www.flaticon.com/free-icons/second-place" />

interface AlbumCardProps {
  album: PartialAlbum;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://www.iphonefaq.org/files/styles/large/public/apple_music.jpg"
  );
  useEffect(() => {
    if (album?.image?.[3]?.["#text"]) {
      console.log("Found image URL:", album.image[3]["#text"]);
      setImageUrl(album.image[3]["#text"]);
    }
  }, [album]);

  return (
    <Card className="relative cursor-pointer p-2 gap-0 min-w-[150px] w-[48%] md:w-[13.4%] min-h-[175px] h-[27vh] md:h-[30vh] mb-[4%] md:mb-[1.03%] rounded-md bg-black/30 md:hover:-translate-y-3 md:hover:scale-100 transition-transform duration-300 ease-in-out shadow-lg z-20 flex flex-col justify-start items-center">
      <div
        className={
          "absolute w-1/6 aspect-square top-2 right-1 " +
          (album["@attr"].rank === "1" ||
          album["@attr"].rank === "2" ||
          album["@attr"].rank === "3"
            ? "flex justify-center items-center"
            : "hidden")
        }
      >
        {album["@attr"].rank === "1" ? (
          <img
            src="https://cdn-icons-png.flaticon.com/512/179/179249.png"
            alt="First Place"
            className="w-full h-full"
          />
        ) : album["@attr"].rank === "2" ? (
          <img
            src="https://cdn-icons-png.flaticon.com/512/5406/5406816.png"
            alt="Second Place"
            className="w-full h-full"
          />
        ) : album["@attr"].rank === "3" ? (
          <img
            src="https://cdn-icons-png.flaticon.com/512/5299/5299016.png"
            alt="Third Place"
            className="w-full h-full"
          />
        ) : null}
      </div>
      <div
        className="w-full rounded-md bg-cover bg-center bg-no-repeat aspect-square"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <CardHeader className="w-full h-full p-0">
        <CardTitle className="truncate pt-2 leading-5">{album.name}</CardTitle>
        <CardDescription className="truncate">
          {album.artist.name}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
export default AlbumCard;
