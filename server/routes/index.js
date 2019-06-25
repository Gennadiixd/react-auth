const express = require('express');
const router = express.Router();

router.get('/test', function(req, res, next) {
  console.log('=====================ok================')
  res.send('connected');
});

module.exports = router;