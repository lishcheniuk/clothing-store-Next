import { useRouter } from "next/router";
import currency from "../utils/currency.filter";

export const ClothingItem = ({ clothing, toCart }) => {
  const router = useRouter();

  return (
    <div
      className="category-page__clothing clothing-item"
      onClick={() =>
        router.push({
          pathname: "/clothing/[id]",
          query: { id: clothing._id },
        })
      }
    >
      <div className="clothing-item__img">
        <img src={`/clothing/${clothing.images[0]}`} alt={clothing.name} />
      </div>
      <h2>{clothing.name}</h2>
      <div className="clothing-item__footer">
        <p className="clothing-item__price">
          Цена: <b>{currency(clothing.price)} &#8372;</b>
        </p>{" "}
        <button
          className="btn"
          onClick={(e) => {
            e.stopPropagation();
            toCart({
              clothingId: clothing._id,
              name: clothing.name,
              price: clothing.price,
              image: clothing.images[0],
              count: 1,
            });
          }}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};
