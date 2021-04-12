import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { CartContext } from "../context/cart";
import { ViewerQuery } from "../queries/authQueries";
import { MainNavbar } from "../components/MainNavbar";

export default function MainLayout({
  children,
  title = "Главная",
  description = "Одежда из мериносовой шерсти",
}) {
  const { clearUser, setUser, user } = useContext(AuthContext);
  const { loadCart, cart } = useContext(CartContext);
  const { error, data } = useQuery(ViewerQuery);

  useEffect(() => {
    if (user && error) clearUser();
    if (!user && data) setUser(data.viewer);
  }, [error, data]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"));
    if (data && !cart.length) {
      loadCart(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="keywords" content="одежда, мериносовая шерсть" />
        <meta name="description" content={description} />
        <title>{title} | RoyalFox</title>
      </Head>
      <MainNavbar />
      <main>{children}</main>
    </>
  );
}
