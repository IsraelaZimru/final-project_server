
var express = require('express');

const api = require('../DAL/api'); //fun that actully sending HTTP reqs.

var router = express.Router();

router.post('/', async function (req, res) {
    try {
        const recipeInfo = await api.recipeInfo(req.body.id);
        if (!recipeInfo) {
            res.send([{ "err": "err" }]);
        }
        res.json(recipeInfo);
    } catch (err) {
        res.status(404).send("The recipe with the given ID was not found")
    }
});


module.exports = router;
