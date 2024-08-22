import React, { useState, useEffect } from "react";
import Skeleton from "../components/PuzzaBloack/Skeleton";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from "../components/PuzzaBloack";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetch("https://65bb9d1052189914b5bca563.mockapi.io/items")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setItems(data);
          setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map(({ title, price, imageUrl, sizes, types }, index) => (
                  <PizzaBlock
                    title={title}
                    price={price}
                    img={imageUrl}
                    sizes={sizes}
                    typePizza={types}
                    key={index}
                  />
                ))}
          </div>
        </div>
    );
};

export default Home;