var express = require('express');
var router = express.Router();
const db = require('../utils/database')
const api = require('../DAL/api'); //fun that actully sending HTTP reqs.


router.post('/', async function (req, res) {  //router ==app.get but with more thing...
    const addNewUser = await api.newUser(req.body.firstName, req.body.lastName, req.body.password, req.body.email);
    res.json(addNewUser);
});


// router.post('/', async function (req, res, next) {
//     db.execute(`INSERT INTO users
//   (firstName,
//   lastName,
//   password,
//   email)
//   VALUES
//   ("${req.body.firstName}",
//   "${req.body.lastName}",
//   "${req.body.password}",
//   "${req.body.email}")`)
//         .then(result => res.send(result))
//         // .then(user => {
//         //   console.log(user);
//         //   res.send(user)
//         // })
//         .catch((err) => res.status(404).send(err));
//     // next()
// });

module.exports = router;
