import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import Home from "./page/Home";
import About from "./page/About";
import Shop from "./page/Shop";
import { Toaster } from "./components/ui/toaster";
import Cart from "./page/Cart";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="Shop" element={<Shop editMode={false} />} />
        <Route path="Shop/cart" element={<Cart />} />
        <Route path="Shop/editMode" element={<Shop editMode={true} />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
