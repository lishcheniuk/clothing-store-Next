import { useState } from "react";

export const Category = ({ item, changeImg, removeCategory, changeTitle }) => {
  const [loadedImg, setLoadedImg] = useState(null);

  const image = !loadedImg
    ? process.env.BASE_URL + item.image
    : window.URL.createObjectURL(loadedImg);

  function clickImgHandler() {
    changeImg(loadedImg, item._id);
    setLoadedImg(null);
  }

  function remove() {
    if (confirm("Категория будет удалена. Вы уверены?")) {
      removeCategory(item._id);
    }
  }

  function blurTitleHandler(e) {
    const textContent = e.target.textContent;

    if (textContent !== item.name) {
      if (confirm("Сохранить изменения?")) {
        changeTitle(textContent, item._id);
      } else e.target.textContent = item.name;
    }
  }

  function keyPressHandler(e) {
    const value = e.target.textContent;
    if (e.key === "Enter" || value.length > 30) e.preventDefault();
  }

  return (
    <div
      className="category"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="category__title-wrap">
        <h4
          className="category__title"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={blurTitleHandler}
          onKeyPress={keyPressHandler}
        >
          {item.name}
        </h4>
        <span className="material-icons category__edit-title">edit</span>
      </div>

      <span className="material-icons category__delete" onClick={remove}>
        delete
      </span>
      <p className="category__edit-images images-edit">
        {loadedImg && (
          <span
            className="material-icons"
            title="Сохранить"
            onClick={clickImgHandler}
          >
            save
          </span>
        )}
        <label htmlFor={item._id} className="images-edit__label">
          <span className="material-icons ">edit</span>
          Изображение
        </label>

        <input
          id={item._id}
          className="images-edit__input"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => {
            e.persist();
            setLoadedImg(() => e.target.files[0]);
          }}
        />
      </p>
    </div>
  );
};
