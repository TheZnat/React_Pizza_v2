import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PizzaData {
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  NutritionalValue: string;
}

const PizzaPage: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<PizzaData | null>(null);

  useEffect(() => {
    let getDataIdPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://65bb9d1052189914b5bca563.mockapi.io/items/` + id
        );
        setData(data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response && e.response.status === 404) {
            // Специальная обработка для 404 ошибки
            setData(null);
          }
        } else {
          const error = e as Error;
          console.error("Ошибка при выполнении запроса:", error.message);
        }
      }
    };
    getDataIdPizza();
  }, [id]);

  const containerPizza = {
    display: "flex",
    alignItems: "flex-start",
  };

  const descriptionPizza = {
    marginTop: "100px",
    display: "flex",
    gap: "15px",
  };

  if (!data) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div className="container" style={containerPizza}>
      <div>
        <h2 className="pizza-block__title">{data.title}</h2>
        <img src={data.imageUrl} alt="пицца" />
        <span className="pizza-block__price">{data.price} ₽</span>
      </div>

      <div className="cart__item-info" style={descriptionPizza}>
        <p>{data.description}</p>
        {data.NutritionalValue.split(/,|:/).map((part, index) => (
          <p key={index}>{part.trim()}</p>
        ))}
      </div>
    </div>
  );
};

export default PizzaPage;
