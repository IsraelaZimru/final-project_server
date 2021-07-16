const express = require('express');
const api = require('../DAL/api');
const router = express.Router();
const upload = require('../utils/multer')
const { recipeValidations } = require('../DAL/validationObj')
const { validationsFun } = require('../DAL/validationsFun')


router.post('/', async function (req, res) { //to SHOW SINGLE recipe details
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

router.get('/:id', async function (req, res) { //Organized data for UPDATE purposes !!
    try {
        const { id } = req.params;
        const recipe = await api.recipeInfoRow(id);

        if (!recipe) {
            throw new Error("Recipe not found");
        }
        res.json(recipe);
    } catch (err) {
        res.status(404).send("The recipe with the given ID was not found")
    }
});


router.put('/:id', upload.none(), validationsFun(recipeValidations), async function (req, res) {
    try {
        const { id } = req.params;
        const { recipe, ingredients, instructions } = req.body;
        const updatedRecipe = await api.updateRecipe(id, recipe, ingredients, instructions);
        if (!recipe) {
            throw new Error("Recipe not found");
        }
        res.json(recipe);
    } catch (err) {
        res.status(404).send("The recipe with the given ID was not found")
    }
});



module.exports = router;
