import { useMemo, useState } from "react";

export const EditClothingModal = ({
  clothing,
  categories,
  change,
  save,
  close,
  removeImg,
}) => {
  const labels = {
    name: "Имя",
    composition: "Материал",
    color: "Цвет",
    price: "Цена",
    genderId: "Пол",
    categoryId: "Категория",
  };

  const [loadedImages, setLoadedImages] = useState([]);
  const [idxImage, setIdxImage] = useState(null);

  const clothingFiltered = useMemo(() => {
    return Object.entries(clothing).filter(
      (item) => !["images", "_id", "__typename"].includes(item[0])
    );
  }, [clothing]);

  const submitHandler = (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(clothingFiltered);
    save(
      { ...payload, _id: clothing._id, images: clothing.images },
      loadedImages
    );
  };

  return (
    <div className="admin-modal">
      <header className="head">
        Изменение товара
        <span className="head__close" onClick={close}>
          &times;
        </span>
      </header>
      <form className="form" onSubmit={submitHandler}>
        {clothingFiltered.map((item) => (
          <div key={item[0]} className="form__group">
            <label className="form__label" htmlFor={item[0]}>
              {labels[item[0]]}
            </label>
            {item[0] === "categoryId" ? (
              <select name="categoryId" onChange={change} value={item[1]}>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="form__input"
                type="text"
                id={item[0]}
                value={item[1]}
                name={item[0]}
                onChange={change}
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
            onChange={(e) => setLoadedImages(Array.from(e.target.files))}
          />
          <label
            htmlFor="file"
            className="form-label__file"
            title="Загрузить"
          ></label>

          {clothing.images.map((image, index) => {
            return (
              <div
                className="form__img img-wrap"
                key={index}
                onMouseEnter={() => setIdxImage(index)}
                onMouseLeave={() => setIdxImage(null)}
              >
                <img src={`/clothing/${image}`} alt="" />

                {index === idxImage && (
                  <span
                    className="img-wrap__delete"
                    title="Удалить"
                    onClick={() => removeImg(index)}
                  >
                    &times;
                  </span>
                )}
              </div>
            );
          })}

          {loadedImages.map((image, index) => (
            <div className="img-wrap img-wrap--loading" key={index}>
              <img src={window.URL.createObjectURL(image)} alt="" />
            </div>
          ))}
        </div>
        <button className="btn form__save" type="submit">
          Изменить
        </button>
      </form>
    </div>
  );
};
