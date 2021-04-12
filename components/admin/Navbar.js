import { ActiveLink } from "../ActiveLink";

export const Navbar = () => {
  return (
    <ul className="navbar-admin">
      <li>
        <ActiveLink href="/" activeClass="navbar-admin__link--active">
          <a className="navbar-admin__link">
            <img className="navbar-admin__logo" src="/logo.jpg" alt="" />
          </a>
        </ActiveLink>
      </li>
      <li className="navbar-admin__item">
        <ActiveLink href="/admin" activeClass="navbar-admin__link--active">
          <a className="navbar-admin__link">Главная</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink
          href="/admin/clothing"
          activeClass="navbar-admin__link--active"
        >
          <a className="navbar-admin__link">Одежда</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink
          href="/admin/categories"
          activeClass="navbar-admin__link--active"
        >
          <a className="navbar-admin__link">Категории</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink
          href="/admin/metadata"
          activeClass="navbar-admin__link--active"
        >
          <a className="navbar-admin__link">Метаданные</a>
        </ActiveLink>
      </li>
    </ul>
  );
};
