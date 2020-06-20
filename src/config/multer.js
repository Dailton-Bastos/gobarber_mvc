const { extname, resolve } = require('path');
const crypto = require('crypto');
const multer = require('multer');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err);

        cb(null, raw.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
