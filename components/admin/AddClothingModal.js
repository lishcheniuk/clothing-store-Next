import { useState } from "react";

export const AddClothingModal = ({ categories, save, close }) => {
  const [inputValues, setInputValues] = useState({
    name: { value: "", label: "Имя" },
    composition: { value: "", label: "Материал" },
    color: { value: "", label: "Цвет" },
    price: { value: "", label: "Цена" },
    genderId: { value: "", label: "Пол" },
    categoryId: { value: categories[0].id, label: "Категория" },
  });
  const [images, setImages] = useState([]);

  const changeHandler = (e) => {
    e.persist();
    setInputValues((prev) => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name],
          value: e.target.value.trimLeft(),
        },
      };
    });
  };

  const inputValuesTransform = () => {
    return Object.keys(inputValues).reduce((acc, key) => {
      acc[key] = inputValues[key].value;
      return acc;
    }, {});
  };

  const isSubmit = () => {
    return Object.entries(inputValuesTransform()).every(
      (item) => item[1] !== ""
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (isSubmit() && images.length) {
      save(inputValuesTransform(), images);
    }
  };

  const getInputValues = Object.entries(inputValues);

  return (
    <div className="admin-modal">
      <header className="head">
        Добавление товара
        <span className="head__close" onClick={close}>
          &times;
        </span>
      </header>

      <form className="form" onSubmit={submitHandler}>
        {getInputValues.map((item) => (
          <div key={item[0]} className="form__group">
            <label className="form__label" htmlFor={item[0]}>
              {item[1].label}
            </label>
            {item[0] === "categoryId" ? (
              <select
                name={item[0]}
                onChange={changeHandler}
                value={item[1].value}
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="form__input"
                type="text"
                id={item[0]}
                value={item[1].value}
                name={item[0]}
                onChange={changeHandler}
              />
            )}
          </div>
        ))}

        <div className="form__group ">
          <input
            id="file"
            type="file"
            multiple={true}
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
          <label
            htmlFor="file"
            className="form-label__file"
            title="Загрузить"
          ></label>

          {images.map((image, index) => (
            <div className="img-wrap img-wrap--loading" key={index}>
              <img src={window.URL.createObjectURL(image)} alt="" />
            </div>
          ))}
        </div>
        <button className="btn form__save" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};
