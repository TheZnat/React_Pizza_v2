import React, { useState, useEffect, useContext, useRef } from "react";
import Skeleton from "../components/PuzzaBloack/Skeleton";
import axios from 'axios';
import qs from 'qs';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from "../components/PuzzaBloack";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setFilters, setSort } from "../Redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // title страницы 
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const {searchValue} = useContext(SearchContext);
  // Состояние для получения с бека питцы 
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Recux категории питццы
  const dispatch = useDispatch();
  const {categoriesId, sort} = useSelector((state) => state.filterSlice);
  const sortType = sort.sortProperty 

 
  const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
  };


  const fetchData = async () => {
    try {
      setIsLoading(true);
      const sortBy = sortType.replace("-", "");
      const order = sortType.includes("-") ? "asc" : "desc";
      const category = categoriesId > 0 ? `category=${categoriesId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      const { data } = await axios.get(`https://65bb9d1052189914b5bca563.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`);
      setItems(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          // Специальная обработка для 404 ошибки
          setItems([]);
        } else {
          console.error('Ошибка при выполнении запроса:', error.message);
        }
      } else {
        console.error('Неизвестная ошибка:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }

    // title страницы 
  useEffect(()=>{
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1));
      // const categoriesId = params.categoriesId;
    
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty); 
     
     
      dispatch(setFilters({
        ...params,
        sort
      }))
      isSearch.current = true;
     
    }
  },[])

  // данные для пагинции 
  const [currentPage, setCurrentPage] = useState(1);
  const [countInfoInPage] = useState(8);

  useEffect(() => {
    window.scrollTo(0, 0);

    if(!isSearch.current){
      fetchData();
    }

    isSearch.current = false;

  }, [categoriesId, sortType, searchValue]);


  useEffect(()=>{
    if (isMounted.current){
      const queryStrung = qs.stringify({
        sortProperty: sort.sortProperty,
        categoriesId
      })
      navigate(`?${queryStrung}`);
    }
    isMounted.current = true;

  },[categoriesId, sort.sortProperty, searchValue])

  // useEffect(() => {
  //     setIsLoading(true);
  //     const sortBy = sortType.replace("-", "");
  //     const order = sortType.includes("-") ? "asc" : "desc";
  //     const category = categoriesId > 0 ? `category=${categoriesId}` : '';
  //     const search = searchValue ? `&search=${searchValue}` : '';

  //     try{
  //       axios.get(`https://65bb9d1052189914b5bca563.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
  //       .then((res) => {
  //         setItems(res.data);
  //         setIsLoading(false);
  //       })

  //     }catch(err){
  //       setItems([]);
  //     }

     
  //       window.scrollTo(0, 0);
  // }, [categoriesId, sortType, searchValue]);

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