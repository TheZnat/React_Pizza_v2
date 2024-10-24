import "./App.css";
import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./Page/Home";
import NotFound from "./Page/NotFound";
import Cart from "./Page/Cart";
import { Route, Routes } from "react-router-dom";
import PizzaPage from "./Page/PizzaPage";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/pizza/:id" element={<PizzaPage/>} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
