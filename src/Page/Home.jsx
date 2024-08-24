import React, { useState, useEffect } from "react";
import Skeleton from "../components/PuzzaBloack/Skeleton";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from "../components/PuzzaBloack";
import Pagination from "../components/Pagination";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState(0);
    const [sortType, setSortType] = useState({
      name: 'популярности',
      sortProperty: "rating",
    });

   
    const [currentPage, setCurrentPage] = useState(1);
    const [countInfoInPage] = useState(8);
  
  
    useEffect(() => {
      setIsLoading(true);
      const sortBy = sortType.sortProperty.replace("-", "");
      const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
      const category = categories > 0 ? `category=${categories}` : '';

      fetch(`https://65bb9d1052189914b5bca563.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setItems(data);
          setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categories, sortType]);

    const lastPizzaIndex = currentPage * countInfoInPage;
    const firstPizzaIndex = lastPizzaIndex - countInfoInPage;
    const currentPizza = items.slice(firstPizzaIndex, lastPizzaIndex);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="container">
         <div className="content__top">
            <Categories  value={categories}  onClinkCategory={(id) =>setCategories(id)}/>
            <Sort value={sortType} onClinkSortType={(id) => setSortType(id)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
          {isLoading
    ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    : Array.isArray(currentPizza) ? currentPizza.map(({ title, price, imageUrl, sizes, types }, index) => (
        <PizzaBlock
          title={title}
          price={price}
          img={imageUrl}
          sizes={sizes}
          typePizza={types}
          key={index}
        />
      )) : null}
          </div>
          <Pagination 
          countInfoInPage={countInfoInPage}
          totalCount={items.length}
          paginateFun = {paginate} 
          currentPage = {currentPage}
           />
        </div>
    );
};

export default Home;