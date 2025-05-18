import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useDataContext } from "@/Context/useDataContext";

const Navbar = () => {
  const { TimeConfig, updateTimeConfig } = useDataContext();

  return (
    <nav className="flex justify-between items-center shadow-lg bg-zinc-900 h-[10%] px-2">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>
            <Menu color="black" />
            Change Time Period
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg pb-8">
            <DrawerHeader>
              <DrawerTitle>Change Time Period</DrawerTitle>
              <DrawerDescription>
                Update the Albums List to show the data for the selected time
                period.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-wrap gap-3 px-4 md:px-0">
              {TimeConfig?.map((time, index) => (
                <Button
                  key={index}
                  variant={time.active ? "destructive" : "default"}
                  onClick={() => updateTimeConfig(time.value)}
                >
                  {time.name}
                </Button>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <div className="cursor-pointer hover:bg-zinc-800 ease-in duration-200">
        <img src="/favicon.ico" alt="logo" className="w-[8svh] h-[8svh]" />
      </div>
    </nav>
  );
};
export default Navbar;
