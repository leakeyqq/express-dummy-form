var express = require('express');
var router = express.Router();
var path = require('path');
const { check, validationResult } = require('express-validator');

//Get the login form
router.get('/',(req,res) => {
    let filePath = path.join(__dirname, '../public/html/login.html');
    res.sendFile(filePath);
});


// Validation rules.
var loginValidate = [
  check('username', 'Username Must Be an Email Address').isEmail().trim().escape().normalizeEmail(),
  check('password').isLength({ min: 8 })
  .withMessage('Password Must Be at Least 8 Characters')
  .matches('[0-9]').withMessage('Password Must Contain a Number')
  .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
  .trim().escape()
];

//Post login form to server
router.post('/', loginValidate, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({errors: errors.array()});
    }else{
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
    }

  });
module.exports = router;