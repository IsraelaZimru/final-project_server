const api = require('../DAL/api');


async function isExists(req, res, next) {
    const { id } = req.params;
    try {
        const recipeInfo = await api.recipeInfo(id);
        if (!recipeInfo) {
            res.status(400).send("The recipe with the given ID was not found");
        }
        res.json(recipeInfo);
    } catch (err) {
        res.status(404).send("The recipe with the given ID was not found")
    }
}

module.exports = {
    isExists
};
