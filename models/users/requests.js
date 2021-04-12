import crypto from "crypto";
import Iron from "@hapi/iron";
import { serialize, parse } from "cookie";
import User from "./model";

const MAX_AGE = 60; //(60 * 60 * 8)-8 часов
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const createUser = async (input) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(input.password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user = {
    username: input.username,
    hash,
    salt,
  };

  const newUser = new User(user);
  await newUser.save();

  return newUser;
};

const findUser = async (username) => {
  return await User.findOne({ username });
};

export const signIn = async (res, { username, password }) => {
  const candidate = await findUser(username);

  if (!candidate) {
    throw new Error("Имя или пароль введены не правильно");
  }

  //приводим полученный пароль к хешу
  const inputHash = crypto
    .pbkdf2Sync(password, candidate.salt, 1000, 64, "sha512")
    .toString("hex");

  if (candidate.hash !== inputHash) {
    throw new Error("Имя или пароль введены не правильно");
  }

  const session = {
    id: candidate._id,
    username: candidate.username,
    createdAt: Date.now(),
    maxAge: MAX_AGE,
  };

  //Генерируем токен
  const token = await Iron.seal(session, TOKEN_SECRET, Iron.defaults);

  //Создаем куку
  const cookie = serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
  return candidate;
};

export const autoSignIn = async (req) => {
  try {
    const cookies = req.cookies
      ? req.cookies
      : parse(req.headers?.cookie || "");

    const token = cookies.token;

    if (!token) throw new Error("No token");

    //Парсим токен
    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
    const expiresAt = session.createdAt + session.maxAge * 1000;

    if (Date.now() > expiresAt) {
      throw new Error("Authentication token is invalid, please log in");
    }

    return findUser(session.username);
  } catch (e) {
    throw new Error(e.message);
  }
};
