const db = require('../utills/database')

const recipes = async () => {
    // const [recipes, fields] = await db.execute('Select * from recipes r inner join images i on r.imageID = i.id ');
    const [recipes, fields] = await db.execute('Select * from recipes');
    return recipes;
}

module.exports = {
    recipes
}