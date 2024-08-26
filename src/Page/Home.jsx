import React, { useState, useEffect, useContext } from "react";
import Skeleton from "../components/PuzzaBloack/Skeleton";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from "../components/PuzzaBloack";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../Redux/slices/filterSlice";

const Home = () => {
  const {searchValue} = useContext(SearchContext);
  // Состояние для получения с бека питцы 
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Recux категории питццы
  const dispatch = useDispatch();
  const {categoriesId, sort} = useSelector((state) => state.filterSlice);
  const sortType = sort.sortProperty;
  console.log(categoriesId);
  console.log(sortType);
  const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
  };

  // данные для пагинции 
  const [currentPage, setCurrentPage] = useState(1);
  const [countInfoInPage] = useState(8);

  useEffect(() => {
      setIsLoading(true);
      const sortBy = sortType.replace("-", "");
      const order = sortType.includes("-") ? "asc" : "desc";
      const category = categoriesId > 0 ? `category=${categoriesId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      fetch(`https://65bb9d1052189914b5bca563.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setItems(data);
          setIsLoading(false);
        });
        window.scrollTo(0, 0);
  }, [categoriesId, sortType, searchValue]);

  // пагинация
  const lastPizzaIndex = currentPage * countInfoInPage;
  const firstPizzaIndex = lastPizzaIndex - countInfoInPage;
  const currentPizza = items.slice(firstPizzaIndex, lastPizzaIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Поиск питц через js пиццы 
    // let pizzas = currentPizza.filter(obj => {
    //   if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
    //     return true;
    //   }
    //   return false;
    // }).map(({ title, price, imageUrl, sizes, types }, index) => (<PizzaBlock title={title} price={price} img={imageUrl} sizes={sizes} typePizza={types} key={index} />));

  let pizzas = currentPizza.map(({ title, price, imageUrl, sizes, types }, index) => (<PizzaBlock title={title} price={price} img={imageUrl} sizes={sizes} typePizza={types} key={index} />));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
         <div className="content__top">
            <Categories  value={categoriesId}  onClinkCategory={onChangeCategory}/>
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
          {isLoading ? skeletons : Array.isArray(currentPizza) ? pizzas : null}
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