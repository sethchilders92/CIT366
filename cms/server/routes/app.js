


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS' });
  //this section is tricky and might need to be commented out
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = router;


