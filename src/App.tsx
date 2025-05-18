import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="App md:h-screen h-[100svh] bg-secondary">
      <Navbar />
      <Toaster />
    </div>
  );
}

export default App;
