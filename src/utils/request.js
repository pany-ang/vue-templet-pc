import axios from "axios";
import { Message } from "element-ui";
// import store from "@/store";
// import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()
    // config.headers.Authorization = 'Bearer ' + getToken();
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // console.log(response)

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      // Message({
      //   message: res.message || "Error",
      //   type: "error",
      //   duration: 5 * 1000
      // });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code == 508 || res.code === 512 || res.code === 514) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = `400：${error.response.data.message}`;
          break;
        case 401:
          error.message = "未授权，请登录";
          // 登录验证失败返回
          // util.cookies.remove('token')
          // this.$router.replace({
          //   path: 'login'
          // })
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `404：${error.response.data.message}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = `服务器内部错误：${error.response.data.message}`;
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          break;
      }
    }
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
