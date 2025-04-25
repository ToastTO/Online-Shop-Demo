import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import Home from "./page/Home";
import About from "./page/About";
import Shop from "./page/Shop";
import { Toaster } from "./components/ui/toaster";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import Return from "./page/Return";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Shop" element={<Shop editMode={false} />} />
        <Route path="/Shop/cart" element={<Cart />} />
        <Route path="/editShop" element={<Shop editMode={true} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/return" element={<Return />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
