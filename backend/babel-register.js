require("@babel/register")({
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
  ],
  extensions: [".js", ".jsx"],
  ignore: [/node_modules/],
});
