const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'chatbot.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    'alpinejs': 'Alpine',
  },
  devServer: {
    static: {
      directory: path.join(__dirname)
    },
    port: 8080,
    open: true,
    headers: {
      'Cache-Control': 'no-cache',
    },
   
  }
};

