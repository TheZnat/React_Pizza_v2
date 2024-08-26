import "./App.css";
import React, { createContext } from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./Page/Home";
import NotFound from "./Page/NotFound";
import Cart from "./Page/Cart";
import { Route, Routes } from "react-router-dom";

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
