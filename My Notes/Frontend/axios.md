# intercept

```jsx
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```