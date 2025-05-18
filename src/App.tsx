import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"
import AlbumList from "@/components/AlbumList";

function App() {
  return (
    <div className="App md:h-screen h-[100svh] bg-secondary">
      <Navbar />
      <AlbumList />
      <Toaster />
    </div>
  );
}

export default App;
