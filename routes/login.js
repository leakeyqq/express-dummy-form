var express = require('express');
var router = express.Router();
var path = require('path');

//Get the login form
router.get('/',(req,res) => {
    let filePath = path.join(__dirname, '../public/html/login.html');
    res.sendFile(filePath);
});

//Post login form to server
router.post('/',(req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);

  });
module.exports = router;