const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/4',
    createProxyMiddleware({
      target: 'https://news-at.zhihu.com',
      changeOrigin: true, // 设置跨域请求
    }),
  );
};
