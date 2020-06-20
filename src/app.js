const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const { resolve } = require('path');

class App {
  constructor() {
    this.server = express();
    this.isDev = process.env.ENV !== 'production';
  }

  middlewares() {
    this.server.use(express.urlencoded({ extended: true }));
  }

  views() {
    nunjucks.configure(resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.server,
      noCache: true,
      autoescape: false,
    });

    this.server.set('view engine', 'njk');
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
