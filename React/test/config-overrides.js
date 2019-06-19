/* config-overrides.js */
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.devServer = {
    // contentBase: path.join(__dirname, "dist"),
    // compress: true,
    port: 3001
  };
  return config;
};
