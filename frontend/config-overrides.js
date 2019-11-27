const { getBabelLoader } = require("customize-cra");

module.exports = {
  webpack: (config, env) => {
    getBabelLoader(config).options = require("./.babelrc.js");
    return config;
  }
};
