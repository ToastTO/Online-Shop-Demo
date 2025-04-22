import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import About from "./components/About";
import Shop from "./components/Shop";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="Shop" element={<Shop editMode={true} />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
