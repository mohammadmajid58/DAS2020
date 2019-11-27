const importPlugin = [
  "babel-plugin-named-asset-import",
  {
    loaderMap: {
      svg: {
        ReactComponent: "@svgr/webpack?-prettier,-svgo![path]"
      }
    }
  }
];
module.exports = {
  presets: ["babel-preset-react-app"],
  plugins: [importPlugin]
};

if (process.env.CYPRESS_COVERAGE) {
  module.exports.plugins.push("istanbul");
}
