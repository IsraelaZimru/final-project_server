
var express = require('express');

const api = require('../DAL/api'); //fun that actully sending HTTP reqs.

var router = express.Router();

router.post('/', async function (req, res) { //to show details
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

router.get('/:id', async function (req, res) { //organized data for update purposes !!
    try {
        const { id } = req.params;
        const recipe = await api.recipeInfoRow(id);
        if (!recipe) {
            throw new Error("Recipe not found");
            // res.send([{ "err": "err" }]);
        }
        res.json(recipe);
    } catch (err) {
        res.status(404).send("The recipe with the given ID was not found")
    }
});

module.exports = router;
