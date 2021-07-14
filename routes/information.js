const express = require('express');
const api = require('../DAL/api'); //fun that actully sending HTTP reqs.
const router = express.Router();
const path = require('path')



/* GET users listing. */
router.get('/', async function (req, res) {  //router ==app.get but with more thing...
    const dietsAndCats = await api.getDietsCategoriesInfo();
    res.json(dietsAndCats);
});

router.get('/unitsAndIngs', async function (req, res) {  //router ==app.get but with more thing...
    const respone = await api.unitsAndIngs();
    res.json(respone);
});


router.get('/RecipeNameAvailable/:name', async function (req, res) {
    const { name } = req.params;
    const response = await api.checkAvailable(name);
    res.json(response);
});





module.exports = router;
