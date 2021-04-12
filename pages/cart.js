import { useRouter } from "next/router";
import { useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import { CartContext } from "../context/cart";
import currency from "../utils/currency.filter";
import { useMeta } from "../hooks/useMeta";
import { initializeApollo } from "../apollo/client";
import { MetaPageQuery } from "../queries/metaPageQuery";

export default function Cart() {
  const router = useRouter();
  const {
    cart,
    totalPrice,
    changeAmount,
    removeFromCart,
    sendOrder,
  } = useContext(CartContext);
  const { title, description } = useMeta(MetaPageQuery);

  return (
    <MainLayout title={title} description={description}>
      <div className="cart-page">
        {cart.length ? (
          <>
            <table className="cart-page__table table-cart">
              <thead>
                <tr>
                  <th className="table-cart__cell">Продукт</th>
                  <th className="table-cart__cell">Описание</th>
                  <th className="table-cart__cell">Количество</th>
                  <th className="table-cart__cell">Цена</th>
                  <th className="table-cart__cell">Удалить</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((pr) => (
                  <tr className="table-cart__row" key={pr.clothingId}>
                    <td className="table-cart__cell">
                      <img
                        className="table-cart__img"
                        src={`clothing/${pr.image}`}
                        alt={`img-${pr.name}`}
                      />
                    </td>
                    <td className="table-cart__cell">{pr.name}</td>
                    <td className="table-cart__cell">
                      <span onClick={() => changeAmount(pr.clothingId, -1)}>
                        &#10094;
                      </span>
                      {pr.count}
                      <span onClick={() => changeAmount(pr.clothingId, 1)}>
                        &#10095;
                      </span>
                    </td>
                    <td className="table-cart__cell">{pr.price}</td>
                    <td className="table-cart__cell ">
                      <span
                        className="table-cart__cell__del"
                        onClick={() => removeFromCart(pr.clothingId)}
                      >
                        &times;
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="cart-page__total">
              TOTAL: {currency(totalPrice())} &#8372;
            </p>

            <button
              className="btn"
              onClick={() => {
                sendOrder(cart), router.push("/");
              }}
            >
              Заказать
            </button>
          </>
        ) : (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            Корзина пустая
          </p>
        )}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ resolvedUrl: path }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: MetaPageQuery,
    variables: { path },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
