import { AuthApi } from "api";
import axios from "axios";

const apiAxios = axios.create({
  baseURL: "https://api.mubabot.com",
  headers: { "Access-Control-Allow-Origin": "*" }
});

apiAxios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      AuthApi.removeAuthentication();
      window.location.href = "/#/login";
    }
    return Promise.reject(err);
  }
);

const appendAuth = async options =>
  (await AuthApi.isLogin()) ? { ...options, headers: { ...options.headers, "x-access-token": await AuthApi.getAuthentication() } } : options;

const optionBuild = async options => appendAuth({ data: options });

const doAxios = async (method, url, options) =>
  apiAxios({
    method: method,
    url: url,
    ...(await optionBuild(options))
  });

const Get = async (url, options) => doAxios("GET", url, options);
const Post = async (url, options) => doAxios("POST", url, options);
const Put = async (url, options) => doAxios("PUT", url, options);
const Delete = async (url, options) => doAxios("DELETE", url, options);

export { Get, Post, Put, Delete };
