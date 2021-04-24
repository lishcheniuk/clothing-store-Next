import styles from "./styles.module.scss";

export const SortBar = ({ categories, sort, fields }) => {
  return (
    <div className={styles.sort_bar}>
      Сортировка:{" "}
      <ul className={styles.sort_bar__list}>
        <li className={styles.sort_bar__item}>
          <select name="price" value={fields.price} onChange={sort}>
            <option value="">По цене</option>
            <option value="price_low">Сначала дешевле</option>
            <option value="price_high">Сначала дороже</option>
          </select>
        </li>
        <li className={styles.sort_bar__item}>
          <select name="category" value={fields.category} onChange={sort}>
            <option value="">По категории</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </li>
      </ul>{" "}
    </div>
  );
};
