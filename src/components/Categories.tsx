import React from "react";

type CategoriesProps = {
  value: number;
  onClinkCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClinkCategory }) => {
  const categoriesPizza = [
    "Все",
    "Мясная",
    "Вегетарианская",
    "Гриль",
    "Острая",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categoriesPizza.map((category, index) => (
          <li
            className={value === index ? "active" : ""}
            onClick={() => onClinkCategory(index)}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
