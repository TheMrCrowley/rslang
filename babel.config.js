const plugins = ["babel-plugin-styled-components"];
if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: ["@babel/preset-typescript", "@babel/preset-react"],
  plugins,
};
