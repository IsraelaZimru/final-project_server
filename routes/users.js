var express = require('express');
var router = express.Router();
const db = require('../utills/database')

/* GET users listing. */

router.get('/:email/:password', function (req, res, next) {
  db.execute(`SELECT id,firstname as 'name',email FROM users WHERE email="${req.params.email}" and password="${req.params.password}"`)
    .then(result => result[0])
    .then(user => {
      console.log(user);
      res.send(user)
    })
    .catch((err) => res.status(404).send(err));
});


module.exports = router;
