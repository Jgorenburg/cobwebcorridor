var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get("/cool/", function (_, res, _) {
  res.send('you a tool');
});

module.exports = router;
