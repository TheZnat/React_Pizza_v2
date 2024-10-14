import React, { useState, useEffect, useRef } from "react";
import Skeleton from "../components/PuzzaBloack/Skeleton";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PuzzaBloack";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setFilters,
} from "../Redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../Redux/slices/pizzasSlice";
import { useNavigate } from "react-router-dom";

type PizzaType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const Home: React.FC = () => {
  // title страницы
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // Recux категории питццы
  const dispatch = useDispatch();
  const { categoriesId, sort, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const sortType = sort.sortProperty;

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const fetchData = async () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoriesId > 0 ? `category=${categoriesId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    // @ts-ignore
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
      })
    );
  };

  // title страницы
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // данные для пагинции
  const [currentPage, setCurrentPage] = useState(1);
  const [countInfoInPage] = useState(8);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
  }, [categoriesId, sortType, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryStrung = qs.stringify({
        sortProperty: sort.sortProperty,
        categoriesId,
      });
      navigate(`?${queryStrung}`);
    }
    isMounted.current = true;
  }, [categoriesId, sort.sortProperty, searchValue]);

  // пагинация
  const lastPizzaIndex = currentPage * countInfoInPage;
  const firstPizzaIndex = lastPizzaIndex - countInfoInPage;
  const currentPizza = items.slice(firstPizzaIndex, lastPizzaIndex);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  let pizzas = currentPizza.map(
    (
      { id, title, price, imageUrl, sizes, types }: PizzaType,
      index: number
    ) => (
      <PizzaBlock
        id={id}
        title={title}
        price={price}
        img={imageUrl}
        sizes={sizes}
        typePizza={types}
        key={index}
      />
    )
  );
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoriesId} onClinkCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" ? (
          <div className="cart cart--empty">
            <h2>Ошибка</h2>
            <p>Мы уже решаем проблему</p>
          </div>
        ) : status === "loading" ? (
          skeletons
        ) : Array.isArray(currentPizza) ? (
          pizzas
        ) : null}
      </div>
      <Pagination
        countInfoInPage={countInfoInPage}
        totalCount={items.length}
        paginateFun={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
