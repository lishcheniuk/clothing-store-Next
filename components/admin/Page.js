import { useState } from "react";

export const Page = ({ item, edit }) => {
  const [values, setValues] = useState({
    title: item.title,
    description: item.description,
  });

  function changeHandler(event) {
    const { value, name } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function blurHandler(event) {
    if (values[event.target.name] !== item[event.target.name]) {
      const res = confirm("Сохранить изменения?");
      res
        ? edit({ ...values, _id: item._id })
        : setValues({
            ...values,
            [event.target.name]: item[event.target.name],
          });
    }
  }

  return (
    <div className="page">
      <p className="page__path">{process.env.BASE_URL + item.path}</p>
      <p className="page__title">
        [title]
        <br />
        <input
          type="text"
          name="title"
          maxLength="50"
          value={values.title}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
        <br />
        [/title]
      </p>
      <p className="page__desc">
        [description]
        <br />
        <textarea
          name="description"
          rows="7"
          maxLength="100"
          value={values.description}
          onChange={changeHandler}
          onBlur={blurHandler}
        ></textarea>
        <br />
        [/description]
      </p>
    </div>
  );
};
