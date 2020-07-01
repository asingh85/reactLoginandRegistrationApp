const {
  create,
  loginUser,
} = require('./user.service');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Database connection errror' + err,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    loginUser(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(401).json({
          success: 0,
          data: 'Invalid email or password',
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, 'qwe1234', {
          expiresIn: '1h',
        });
        res.cookie('token', jsontoken, { httpOnly: true });
        return res.json({
          success: 1,
          message: 'login successfully',
          token: jsontoken,
          results,
        });
      } else {
        return res.status(401).json({
          success: 0,
          data: 'Invalid email or password',
        });
      }
    });
  },
};
