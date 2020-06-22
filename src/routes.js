const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

const routes = new Router();

const authMiddleware = require('./app/middlewares/auth');
const guestMiddleware = require('./app/middlewares/guest');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const DashboardController = require('./app/controllers/DashboardController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');

  return next();
});

routes.get('/', guestMiddleware, SessionController.create);
routes.post('/signin', SessionController.store);

routes.get('/signup', guestMiddleware, UserController.create);
routes.post('/signup', upload.single('avatar'), UserController.store);

routes.use('/app', authMiddleware);

routes.get('/app/logout', SessionController.destroy);

routes.get('/app/dashboard', DashboardController.index);

module.exports = routes;
