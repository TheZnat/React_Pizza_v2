import React, { useState } from 'react';

const Categories = () => {
    const [activeMenu, setActiveMenu] = useState();
    const categoriesPizza = ['Все','Мясная', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {
                    categoriesPizza.map((category, index) => (
                        <li
                        className={activeMenu === index? 'active' : ''}
                        onClick={()=> setActiveMenu(index)}
                        key={index}
                        >{category}</li>
                    ))
                }
             
            </ul>
        </div>
    );
};

export default Categories;