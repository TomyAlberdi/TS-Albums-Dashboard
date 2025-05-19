import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"
import AlbumList from "@/components/AlbumList";

function App() {
  return (
    <div className="App md:min-h-screen min-h-[100svh] bg-input"> 
      <Navbar />
      <AlbumList />
      <Toaster />
    </div>
  );
}

export default App;
