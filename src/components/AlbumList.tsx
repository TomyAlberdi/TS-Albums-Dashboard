import { useDataContext } from "@/Context/useDataContext";
import { Skeleton } from "@/components/ui/skeleton";
import AlbumCard from "@/components/AlbumCard";

const AlbumList = () => {
  const { Albums } = useDataContext();

  return (
    <div className="min-h-[90%] px-3 md:px-10 py-3 md:py-6 w-full flex justify-left flex-wrap items-start gap-[4%] md:gap-[1.03%]">
      {Albums.loading
        ? Array(21)
            .fill(0)
            .map((_, index) => (
              <article
                className="min-w-[150px] w-[48%] md:w-[13.4%] min-h-[175px] h-[27vh] md:h-[30vh] mb-[4%] md:mb-[1.03%] rounded-md bg-black/90"
                key={index}
              >
                <Skeleton className="w-full h-full" />
              </article>
            ))
        : Array.isArray(Albums.data) &&
          Albums.data.map((album, index) => (
            <AlbumCard key={index} album={album} />
          ))}
    </div>
  );
};
export default AlbumList;
