const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

const routes = new Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

routes.get('/', SessionController.create);
routes.post('/signin', SessionController.store);

routes.get('/signup', UserController.create);
routes.post('/signup', upload.single('avatar'), UserController.store);

routes.get('/app/dashboard', (req, res) => {
  return res.render('dashboard');
});

module.exports = routes;
