module.exports = {
  devServer: {
    port: 8080,
    proxy: "http://127.0.0.1:9000/",
  },
  transpileDependencies: ["vuex-module-decorators"],
  // lintOnSave: false, // !! Remove
};

