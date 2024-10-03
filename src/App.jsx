import React from "react";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { Route, Routes } from "react-router-dom";
import Review from "./components/Revew/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./components/ProductDetail/ProductDetails";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/review" element={<Review />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/shipment" element={<Shipment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:key" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
