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

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center shadow-lg bg-zinc-900">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="ml-3 cursor-pointer" variant={"secondary"}>
            <Menu />
              Change Time Period
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>Change Time Period</DrawerTitle>
              <DrawerDescription>
                Update the Albums List to show the data for the selected time
                period.
              </DrawerDescription>
            </DrawerHeader>
          </div>
        </DrawerContent>
      </Drawer>
      <div className="p-3 cursor-pointer hover:bg-zinc-800 ease-in duration-200">
        <img src="/favicon.ico" alt="logo" className="w-[7vh] h-[7vh]" />
      </div>
    </nav>
  );
};
export default Navbar;
