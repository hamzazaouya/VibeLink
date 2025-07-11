// postcss.config.cjs
module.exports = {
  plugins: [
    require("postcss-preset-env")({ stage: 1 }),
    require("postcss-responsive-type"),
    require("postcss-nested"),
    require("postcss-mixins"),
    require("postcss-inherit"),
    require("postcss-short-text"),
    require("postcss-position"),
    require("postcss-short"),
    require("postcss-font-magician")({
      variants: {},
      foundries: ["google"],
    }),
    require("autoprefixer")({
      overrideBrowserslist: [">1%", "last 5 versions", "not dead"],
    }),
  ],
};