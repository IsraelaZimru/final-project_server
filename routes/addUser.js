var express = require('express');
var router = express.Router();
const db = require('../utills/database')



router.post('/', async function (req, res, next) {
    db.execute(`INSERT INTO users
  (firstName,
  lastName,
  password,
  email)
  VALUES
  ("${req.body.firstName}",
  "${req.body.lastName}",
  "${req.body.password}",
  "${req.body.email}")`)
        .then(result => res.send(true))
        // .then(user => {
        //   console.log(user);
        //   res.send(user)
        // })
        .catch((err) => res.status(404).send(err));
    // next()
});

module.exports = router;
