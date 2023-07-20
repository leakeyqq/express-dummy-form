var express = require('express');
var router = express.Router();
const path = require('path');

//Index page
router.get('/',(req,res) => {
  let filePath = path.join(__dirname,'../public/html/index.html');
  res.sendFile(filePath);
});

module.exports = router;
