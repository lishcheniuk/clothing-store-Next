import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { AuthContext } from "../context/auth";
import { SignInMutation } from "../queries/authQueries";

export default function Auth() {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [countSignIn, setCountSignIn] = useState(0);
  const [signIn] = useMutation(SignInMutation);

  const changeHandler = (event) => {
    if (error) setError(null);

    const { name, value } = event.target;
    setValues({ ...values, [name]: value.trim() });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (countSignIn >= 3) return false;

    const { password, username } = values;

    if (values.username && values.password) {
      try {
        const { data } = await signIn({ variables: { username, password } });

        if (data.signIn) {
          setUser(data.signIn);
          router.push("/");
        }
      } catch (e) {
        const message =
          countSignIn >= 2
            ? "Слишком много попыток входа. Попробуйте позже."
            : e.message;

        setError(message);
        setCountSignIn(countSignIn + 1);
      }
    }
  };

  return (
    <MainLayout title="Авторизация">
      <div className="auth-page wrap">
        <form className="auth-page__form form-auth" onSubmit={submitHandler}>
          <h3 className="form-auth__title">Авторизация</h3>
          <div className="form-auth__group">
            <input
              className="form-auth__input"
              type="text"
              name="username"
              placeholder="Введите имя"
              value={values.username}
              onChange={changeHandler}
            />
          </div>

          <div className="form-auth__group">
            <input
              className="form-auth__input"
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={values.password}
              onChange={changeHandler}
            />
          </div>
          {error && <small>{error}</small>}
          <button
            className="form-auth__btn btn"
            type="submit"
            disabled={countSignIn >= 3}
          >
            Войти
          </button>
          <Link href="/admin">
            <a className="admin-link">
              <small>Вход в админку (без пароля)</small>
            </a>
          </Link>
        </form>
      </div>

      <style jsx>{`
        .admin-link {
          margin-top: 5px;
          text-align: right;
        }
        .admin-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </MainLayout>
  );
}
