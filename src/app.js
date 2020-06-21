const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const nunjucks = require('nunjucks');
const { resolve } = require('path');
const routes = require('./routes');

class App {
  constructor() {
    this.server = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(flash());
    this.server.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new FileStore({
          path: resolve(__dirname, '..', 'tmp', 'sessions'),
        }),
        saveUninitialized: true,
      })
    );
  }

  views() {
    nunjucks.configure(resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.server,
      noCache: true,
      autoescape: false,
    });

    this.server.use(express.static(resolve(__dirname, '..', 'public')));
    this.server.set('view engine', 'njk');
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
