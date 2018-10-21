import * as Axios from "./index";
import { AuthApi } from "api";

const checkLogin = async () => {
  const result = await Axios.Get("/auth/login");
  const isLogin = result.data.isLogin;

  if (!isLogin) AuthApi.removeAuthentication();
  return isLogin;
};

const register = async ({ id, username, email, phone, password, repassword, ...params }) => {
  return await Axios.Post("/auth/owner", {
    id: id,
    username: username,
    email: email,
    phone: phone,
    password: password,
    repassword: repassword
  });
};

const login = async ({ id, password, ...params }) => {
  return await Axios.Post("/auth/login", {
    ID: id,
    PW: password
  }).then(result => {
    AuthApi.setAuthentication(result.data);
    return true;
  });
};

export { login, register, checkLogin };
