const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env.development"),
});

module.exports = function (app) {
  Object.entries({
    auth: 8080,
    partners: 8081,
    specialties: 8081,
    specialty: 8081,
    'specialty-types': 8081,
    cats: 8082,
    doctors: 8082,
    'working-time': 8082,
    patients: 8083,
  }).forEach(([name, port]) => {
    app.use(
      `/~api/${name}`,
      createProxyMiddleware({
        target: `http://103.142.25.194:${port}/`,
        changeOrigin: true,
        pathRewrite: {
          "^/~api": "", //remove /~api
        },
      }),
    );
  });

  app
    .use(
      "/~api",
      createProxyMiddleware({
        target: process.env.PROXY_API_SERVER,
        changeOrigin: true,
        pathRewrite: {
          "^/~api": "", //remove /~api
        },
      }),
    )
    .use(
      "/~configuration",
      createProxyMiddleware({
        target: process.env.PROXY_CONFIG_SERVER,
        changeOrigin: true,
        pathRewrite: {
          "^/~configuration": "/configuration", //replace /~configuration /configuration
        },
      }),
    );
};

// eslint-disable-next-line no-unused-vars
function run() {
  const app = require("express")();
  module.exports(app);
  app.listen(5000);
}
