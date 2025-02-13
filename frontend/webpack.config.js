import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "production",
  entry: "./src/main.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css", // ✅ Ensures only one CSS file is created
    }),
  ],
};
