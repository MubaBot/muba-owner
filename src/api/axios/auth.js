import * as Axios from "./index";

const checkLogin = async () => {
  const result = await Axios.Get("/auth/login");
  const isLogin = result.data.isLogin;

  if (!isLogin) Axios.setAuth();
  return isLogin;
};

const register = async ({ id, username, email, password, repassword, ...params }) => {
  return await Axios.Post("/auth/owner", {
    id: id,
    username: username,
    email: email,
    password: password,
    repassword: repassword
  });
};

const login = async ({ id, password, ...params }) => {
  return await Axios.Post("/auth/login", {
    ID: id,
    PW: password
  }).then(result => {
    Axios.setAuth(result.data);
    return true;
  });
};

export { login, register, checkLogin };
