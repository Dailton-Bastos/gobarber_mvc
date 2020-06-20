const { Router } = require('express');
const multerConfig = require('./config/multer');
const upload = require('multer')(multerConfig);

const routes = new Router();

const UserController = require('./app/controllers/UserController');

routes.get('/signup', UserController.create);
routes.post('/signup', upload.single('avatar'), UserController.store);

module.exports = routes;
