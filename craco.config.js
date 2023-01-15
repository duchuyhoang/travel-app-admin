const path = require(`path`);
const CracoEnvPlugin = require("craco-plugin-env");
module.exports = {
  webpack: {
    alias: {
      constants: path.resolve(__dirname, "src/constants"),
      enums: path.resolve(__dirname, "src/enums"),
      store: path.resolve(__dirname, "src/store"),
      utils: path.resolve(__dirname, "src/utils"),
      config: path.resolve(__dirname, "src/config"),
      services: path.resolve(__dirname, "src/services"),
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
    },
  },
  devServer: {
    port: 3003,
  },
  plugins: [
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {
          NODE_ENV: "production",
          ABC: 123,
        },
      },
    },
  ],
};
