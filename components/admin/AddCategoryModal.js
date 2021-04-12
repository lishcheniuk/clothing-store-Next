import { useState } from "react";

export const AddCategoryModal = ({ close, create }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    if (title && image) {
      create(title, image);
    }
  }

  return (
    <div className="admin-modal">
      <header className="head">
        Добавление категории
        <span className="head__close" onClick={close}>
          &times;
        </span>
      </header>

      <form className="form" onSubmit={submitHandler}>
        <div className="form__group">
          <label className="form__label" htmlFor="catName">
            Имя
          </label>

          <input
            className="form__input"
            type="text"
            id="catName"
            value={title}
            onChange={(e) => setTitle(e.target.value.trimLeft())}
          />
        </div>

        <div className="form__group ">
          <input
            id="file"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="form-label__file"
            title="Загрузить"
          ></label>

          {image && (
            <div className="img-wrap img-wrap--loading">
              <img src={window.URL.createObjectURL(image)} alt="" />
            </div>
          )}
        </div>
        <button className="btn form__save" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};
