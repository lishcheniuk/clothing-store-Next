import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { initializeApollo } from "../../apollo/client";
import { ClothingByIdQuery } from "../../queries/clothingQueries";
import MainLayout from "../../layouts/MainLayout";
import currency from "../../utils/currency.filter";
import { CartContext } from "../../context/cart";
import { SliderClothingItem } from "../../components/SliderClothingItem";

const ClothesItem = () => {
  const router = useRouter();
  const {
    data: { clothingById: c },
  } = useQuery(ClothingByIdQuery, {
    variables: { id: router.query.id },
  });
  const [isSlider, showSlider] = useState(false);
  const { addToCart } = useContext(CartContext);

  return (
    <MainLayout title={c.name}>
      <div className="item-page wrap">
        <div className="item-page__img">
          <img
            src={`/clothing/${c.images[0]}`}
            alt={c.name}
            onClick={() => showSlider(true)}
          />
        </div>
        <section className="item-page__desc desc">
          <h2 className="desc__title mt-10">{c.name}</h2>
          <ul className="desc__list">
            <li className="desc__item mt-10">Цвет: {c.color}</li>
            <li className="desc__item mt-10">Материал: {c.composition}</li>
            <li className="desc__item mt-10">
              Описание: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nunc eu pharetra lorem. Maecenas in lacus quis tellus lobortis
              semper vel sed nisi. Donec laoreet nisl id mi iaculis maximus.
              Duis non quam eget tellus posuere posuere. Maecenas in posuere
              turpis. Aenean malesuada lectus vel nulla fermentum, non maximus
              neque laoreet. Sed et nisl lacus. Nunc semper lacus erat, in
              placerat orci suscipit ut. Integer vitae mauris accumsan,
              venenatis ante sed, ultrices lectus. Suspendisse elementum eu
              turpis eget varius. Pellentesque aliquam neque vitae maximus
              gravida.
            </li>
          </ul>
          <p className="mt-10">
            Цена: <b>{currency(c.price)} &#8372;</b>
          </p>
          <button
            className="item-page__btn btn mt-10"
            onClick={addToCart.bind(null, {
              clothingId: c._id,
              name: c.name,
              price: c.price,
              image: c.images[0],
              count: 1,
            })}
          >
            Добавить в корзину
          </button>
        </section>
      </div>
      {isSlider && (
        <SliderClothingItem images={c.images} close={() => showSlider(false)} />
      )}
    </MainLayout>
  );
};

export async function getServerSideProps({ query }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ClothingByIdQuery,
    variables: { id: query.id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default ClothesItem;
