import axios from "axios";
import { defineStore } from 'pinia';

class HttpService {

  private config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer "
    }
  };
  private http = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
  })

  async httpAuth(endPoint: string, params: any, callback: any) {

    return await this.http.post(endPoint, params, this.config)
      .then(({ data: result }) => {

        if (result.status === 'success') {
          callback(result.status, result.response);
          return false;
        }

        if (result.status === 'error_login') {
          callback(result.status, [result.message]);
          return false;
        }

        if (result.status === 'error_validation') {

          const messages: Array<string> = [];

          // console.log(result.response);
          Object.values(result.response).forEach((error: any) => {
            if (error.length <= 1) messages.push(error[0]);
            else error.map((err: any) => messages.push(err))
          })

          callback(result.status, messages);
          return false;
        }

        callback("error", result.response);
      })
      .catch(() => {
        callback("error", "Problemas del servidor");
      });
  }

  async httpGet(store: any, endPoint: string, callback: any) {

    this.config.headers.Authorization = `Bearer ${store.token}`;

    return await this.http.get(endPoint, this.config)
      .then(({ data: result }) => {

        if (result.status === 'success') {
          callback(result.status, result.response);
        } else if (result.status === 'item_not_found') {
          callback(result.status, result.message);
        } else {
          callback("error", result.response);
        }

      })
      .catch(error => {
        if (error?.response?.data?.status === "Token is Expired") {
          callback("error", "Tu sesión ha expirado.");
          alert("Tu sesión ha expirado. \nTe estamos redireccionando al Login");
          store.logout(false);
          return false;
        }

        callback("error", "Problemas del servidor");
      });
  }

  async httpPost(store: any, endPoint: string, params: any, callback: any) {

    this.config.headers.Authorization = `Bearer ${store.token}`;

    return await this.http.post(endPoint, params, this.config)
      .then(({ data: result }) => {

        if (result.status === 'success') {
          callback(result.status, result.response);
        }

        if (result.status === 'error_validation') {

          const messages: Array<string> = [];

          // console.log(result.response);
          Object.values(result.response).forEach((error: any) => {
            if (error.length <= 1) messages.push(error[0]);
            else error.map((err: any) => messages.push(err))
          })

          callback(result.status, messages);
        }

      })
      .catch(error => {
        if (error?.response?.data?.status === "Token is Expired") {
          callback("error", "Tu sesión ha expirado.");
          alert("Tu sesión ha expirado. \nTe estamos redireccionando al Login");
          store.logout(false);
          return false;
        }
        callback("error", "Problemas del servidor");
      });
  }

}

export default new HttpService();