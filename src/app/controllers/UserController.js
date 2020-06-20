const { User } = require('../models');

class UserController {
  create(req, res) {
    return res.render('auth/signup');
  }

  async store(req, res) {
    req.body.avatar = 'teste.jpg';

    const { avatar, name, email, password, provider } = req.body;

    await User.create({
      avatar,
      name,
      email,
      password,
      provider,
    });

    return res.redirect('/');
  }
}

module.exports = new UserController();
