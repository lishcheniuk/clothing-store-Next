import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { CartContext } from "../context/cart";
import { ActiveLink } from "./ActiveLink";
import { CartModal } from "./CartModal";

export const MainNavbar = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <nav className="nav">
      <div className="nav__logo logo">
        <ActiveLink href="/">
          <a>
            <img className="logo__img" src="/logo.jpg" alt="" />
          </a>
        </ActiveLink>
      </div>

      <ul className="nav__list list-nav">
        <li className="list-nav__item">
          <ActiveLink href="/clothing" activeClass="list-nav__link--active">
            <a>Одежда</a>
          </ActiveLink>
        </li>
        <li className="list-nav__item">
          <ActiveLink href="/contacts" activeClass="list-nav__link--active">
            <a>Контакты</a>
          </ActiveLink>
        </li>
        {!user && (
          <li className="list-nav__item">
            <ActiveLink href="/auth" activeClass="list-nav__link--active">
              <a>Войти</a>
            </ActiveLink>
          </li>
        )}
        <li className="list-nav__item list-nav__item--cart">
          <a href="#" onClick={() => setShowCartModal(true)}>
            <svg viewBox="0 0 208.955 208.955" width="30" height="30">
              <path d="M190.85,200.227L178.135,58.626c-0.347-3.867-3.588-6.829-7.47-6.829h-26.221V39.971c0-22.04-17.93-39.971-39.969-39.971	C82.437,0,64.509,17.931,64.509,39.971v11.826H38.27c-3.882,0-7.123,2.962-7.47,6.829L18.035,200.784	c-0.188,2.098,0.514,4.177,1.935,5.731s3.43,2.439,5.535,2.439h157.926c0.006,0,0.014,0,0.02,0c4.143,0,7.5-3.358,7.5-7.5	C190.95,201.037,190.916,200.626,190.85,200.227z M79.509,39.971c0-13.769,11.2-24.971,24.967-24.971	c13.768,0,24.969,11.202,24.969,24.971v11.826H79.509V39.971z M33.709,193.955L45.127,66.797h19.382v13.412	c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5V66.797h49.936v13.412c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5	V66.797h19.364l11.418,127.158H33.709z" />
            </svg>
            <span style={{ color: !!cart.length && "red" }}>{cart.length}</span>
          </a>

          {showCartModal && (
            <CartModal
              clothing={cart}
              close={() => setShowCartModal(false)}
              del={(id) => removeFromCart(id)}
            />
          )}
        </li>
        {user && (
          <li className="list-nav__item list-nav__item--user">
            <ActiveLink href="/admin">
              <a>
                <b style={{ color: "#000" }}>{user.username}</b>
              </a>
            </ActiveLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
