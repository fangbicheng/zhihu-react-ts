const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/4',
    createProxyMiddleware({
      target: 'https://news-at.zhihu.com/api/4/news/latest',
      changeOrigin: true, // 设置跨域请求
      PathRewrite: {
        '^/api/4': '', // 将/api/4 变为 ''
      },
    }),
  );
};
