const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const bodyParser = require("body-parser");
const copy = require("lodash/cloneDeep");
const data = require("./data/movies.json");

module.exports = {
  mode: "development",
  entry: {
    bundle: ["@babel/polyfill", "./src"]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: "babel-loader"
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    filename: "bundle.js",
    open: true,
    port: 3000,
    publicPath: "/",
    compress: true,
    historyApiFallback: true,
    setup(app) {
      app.use(bodyParser.json());

      app.set("movies", data);

      app.get("/movies", (req, res) => {
        res.json(app.get("movies"));
      });

      app.put("/movies/:id", (req, res) => {
        const movies = copy(app.get("movies"));
        const movie = movies.find(movie => movie.id === req.params.id);

        for (let prop in movie) {
          movie[prop] = req.body[prop];
        }

        app.set("movies", movies);

        res.send("OK");
      });
    }
  },
  resolve: { extensions: ["*", ".js", ".json"] },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
