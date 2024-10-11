import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItems, selectCartItemById } from '../../Redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const PizzaBlock = ({id,title, price, img, sizes, typePizza}) => {
    const typeName = ['тонкое', 'традиционное']
    const [activeTypePizza, setActiveTypePizza] = useState(0);
    const [activeSizePizza, setActiveSizePizza] = useState(0);
    const dispatch = useDispatch();
    const cartItem = useSelector(selectCartItemById(id));

    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () =>{
        const item = {
            id,
            title,
            price,
            img,
            type: typeName[activeTypePizza],
            size: sizes[activeSizePizza],
        }
        dispatch(addItems(item));
    }

    return (
        <div className="pizza-block-wrapper">
        <div className="pizza-block">
            <Link to={`/pizza/${id}`}>
            <img
                className="pizza-block__image"
                src={img}
                alt="Pizza"
            />
          
            <h4 className="pizza-block__title">{title}</h4>
            </Link>
            <div className="pizza-block__selector">
                <ul>
                    { typePizza.map((itemTypePizza, index) =>(
                            <li
                            className={activeTypePizza === itemTypePizza ? 'active' : ''}
                            onClick={() => setActiveTypePizza(itemTypePizza)}
                            key={index}
                            >
                            {typeName[itemTypePizza]}
                            </li>
                        ))
                    }
                </ul>
                <ul>
                    {
                        sizes.map((size, index) => (
                            <li
                            className={activeSizePizza === index ? 'active' : ''}
                            onClick={() => setActiveSizePizza(index)}
                            key={index}
                            >
                            {size} см.
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="pizza-block__bottom" onClick={onClickAdd}>
                <div className="pizza-block__price">от {price} ₽</div>
                <div className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </div>
            </div>
        </div>
        </div>
    );
};

export default PizzaBlock;