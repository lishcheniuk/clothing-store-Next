import { useState } from "react";

export const ClothingByCategory = ({ category, select, remove }) => {
  const [isOpen, setIsOpen] = useState(true);

  const removeHandler = (id) => {
    const res = confirm("Вы действительно хотите удалить товар?");
    if (res) {
      remove(id);
    }
  };

  return (
    <table className="clothing_table">
      <caption
        className="clothing_table__title title"
        onClick={() => setIsOpen(!isOpen)}
      >
        {category.title}

        <div className="title__arrow">
          {!isOpen ? (
            <span className="material-icons">expand_more</span>
          ) : (
            <span className="material-icons">expand_less</span>
          )}
        </div>
      </caption>

      {isOpen && (
        <tbody>
          {category.clothing.map((item) => (
            <tr className="clothing_table__row" key={item._id}>
              <td className="clothing_table__cell cell-table">
                <img
                  className="cell-table__img"
                  src={`${process.env.BASE_URL}clothing/${item.images[0]}`}
                />
              </td>
              <td className="clothing_table__cell">{item.name}</td>
              <td className="clothing_table__cell">{item.composition}</td>
              <td className="clothing_table__cell">{item.color}</td>
              <td className="clothing_table__cell">{item.genderId}</td>
              <td className="clothing_table__cell">{item.price}</td>
              <td className="clothing_table__cell cell-table">
                <span
                  className="material-icons cell-table__edit"
                  title="Изменить"
                  onClick={() => select(item)}
                >
                  edit
                </span>
                <span
                  className="material-icons cell-table__del"
                  title="Удалить"
                  onClick={() => removeHandler(item._id)}
                >
                  remove_circle_outline
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};
