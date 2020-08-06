const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(createProxyMiddleware("/*", { target: "http://localhost:9000/" }));
};
