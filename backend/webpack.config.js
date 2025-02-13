import path from "path";
import webpack from "webpack";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: "./server.js",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.cjs", // ✅ Use .cjs to force CommonJS
  },
  experiments: {
    outputModule: true, // ✅ Enables ESM output
  },
  externals: [
    ({ request }, callback) => {
      if (/^[a-z\-0-9]+$/.test(request)) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
