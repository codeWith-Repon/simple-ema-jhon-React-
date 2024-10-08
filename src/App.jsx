import React, { createContext, useState } from "react";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { Route, Routes } from "react-router-dom";
import Review from "./components/Revew/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./components/ProductDetail/ProductDetails";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";

export const UserContext = createContext()

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({})
  console.log("loggedInUser", loggedInUser)
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>email:{loggedInUser.email}</h3>
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
    </UserContext.Provider>
  );
};

export default App;
