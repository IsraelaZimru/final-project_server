var express = require('express');
var router = express.Router();
const db = require('../utills/database')


router.post('/', function (req, res) {
  db.execute(`SELECT id,firstname as 'name',email FROM users WHERE email="${req.body.email}" and password="${req.body.password}"`)
    .then(result => result[0])
    .then(user => {
      console.log(user);
      res.send(user)
    })
    .catch((err) => res.status(404).send(err));
});

module.exports = router;
