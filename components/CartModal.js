import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export const CartModal = ({ clothing, close, del }) => {
  const cartRef = useRef();
  const router = useRouter();

  useEffect(() => {
    cartRef.current.scrollTo({
      top: cartRef.current.scrollHeight - window.pageYOffset,
    });
  }, [clothing]);

  return (
    <>
      <div className="cart-modal" ref={cartRef}>
        {clothing.length ? (
          <ul className="cart-modal__list">
            {clothing.map((c) => (
              <li key={c.clothingId} className="cart-modal__item cart-item">
                <img className="cart-item__img" src={`/clothing/${c.image}`} />{" "}
                <span className="cart-item__info">
                  {c.name}
                  <br />
                  {c.count} x {c.count * c.price}грн
                </span>
                <span
                  className="cart-item__del"
                  onClick={() => del(c.clothingId)}
                >
                  &times;
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Корзина пустая</p>
        )}

        <button
          className="btn"
          onClick={() => {
            router.push("/cart");
          }}
          disabled={!clothing.length}
        >
          Оформить заказ
        </button>
      </div>
      <div className="cart-modal__overlay" onClick={close}></div>
    </>
  );
};
