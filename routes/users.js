var express = require('express');
var router = express.Router();
const db = require('../utils/database')
const api = require('../DAL/api'); //fun that actully sending HTTP reqs.


router.post('/getUserInfo', function (req, res) {
  console.log(req.body.id, "req.body.id");
  db.execute(`SELECT * FROM users WHERE id= ?`, [req.body.id])
    .then(result => result[0])
    .then(user => {
      console.log(user);
      res.send(user)
    })
    .catch((err) => res.status(404).send(err));
});



router.post('/', function (req, res) {
  db.execute(`SELECT id,firstname as 'name',email FROM users WHERE email="${req.body.email}" and password="${req.body.password}"`)
    .then(result => result[0])
    .then(user => {
      console.log(user);
      res.send(user)
    })
    .catch((err) => res.status(404).send(err));
});

//לוודא שהפרמטרים תקינים - לוודא שיש בכלל יוזר עם ת.ז הזו, אחרת לשלוח הודעת שגיאה 
router.put('/:id', async function (req, res) { //I have to add validation!!!
  try {
    const { id } = req.params;
    const { firstName, lastName, password, email } = req.body;
    console.log(id, firstName, lastName, password, email);
    const userId = await api.updateUser(id, firstName, lastName, password, email)
    res.json(userId)
  } catch (err) {
    res.status(404).send(err);
  }
})


module.exports = router;
