const db = require('../utils/database') // mysql2.pool.promise()
const { mergeTwoSQLTable, addingredientsToRecipe } = require('../utils/halpersFun')

// const recipes = async () => {
//     // const [recipes, fields] = await db.execute('Select * from recipes r inner join images i on r.imageID = i.id ');
//     const [recipes, fields] = await db.execute('Select * from recipes');
//     return recipes;
// }

const recipes = async () => {
    try {
        const [recipes, fields] = await db.execute('Select * from recipes');
        const [categories, catFields] = await db.execute('select name, recipeId from recipecategory join categories on recipecategory.CategoryTypeId = categories.id; ');
        mergeTwoSQLTable([recipes, categories], "allCategories");
        return recipes;
    } catch (err) {
        console.log(err)
    }
}

// const recipeInfo = async (recipeId) => {
//     try {
//         const recipe = await db.query(`select * from users; select * from recipes`);
//         console.log(recipe);
// const [categories, fieldsC] = await db.execute(', [recipeId]);
// const [instructions, fieldsI] = await db.execute('select recipeId,instruction "name" from instructions where recipeId = ?', [recipeId]);
// const [ingredients, fieldsRI] = await db.execute(`select quantity,mi.name "unit", i.name "ingredientName"   
//     from recipeingredients as ri join ingredients as i on ri.IngredientID = i.id join measuringunits as mi
//     on mi.id = ri.MeasuringUnitID  where recipeId = ?`, [recipeId]);
// const [diets, fieldsRD] = await db.execute(`select name, recipeId from recipediet join diets 
// on diets.id = recipediet.DietId where recipeid= ?`, [recipeId]);

// const newPropertyTitles = ["categories", "diets", "instructions"]
// const newProperties = [categories, diets, instructions]

// for (let i = 0; i < newPropertyTitles.length; i++) {
//     mergeTwoSQLTable([recipe, newProperties[i]], newPropertyTitles[i])
// }
// addingredientsToRecipe([recipe, ingredients])
//         return recipe;
//     } catch (err) {
//         console.log(err);;
//     }
// }






const recipeInfo = async (recipeId) => {
    try {
        const [recipe, fields] = await db.execute(`select recipes.*,users.firstname "username" from recipes join users 
        on recipes.userid = users.id where recipes.id = ?`, [recipeId]);
        const [categories, fieldsC] = await db.execute('select name, recipeId from recipecategory join categories on recipecategory.CategoryTypeId = categories.id', [recipeId]);
        const [instructions, fieldsI] = await db.execute('select recipeId,instruction "name" from instructions where recipeId = ?', [recipeId]);
        const [ingredients, fieldsRI] = await db.execute(`select quantity,mi.name "unit", i.name "ingredientName"   
            from recipeingredients as ri join ingredients as i on ri.IngredientID = i.id join measuringunits as mi
            on mi.id = ri.MeasuringUnitID  where recipeId = ?`, [recipeId]);
        const [diets, fieldsRD] = await db.execute(`select name, recipeId from recipediet join diets 
        on diets.id = recipediet.DietId where recipeid= ?`, [recipeId]);

        const newPropertyTitles = ["categories", "diets", "instructions"]
        const newProperties = [categories, diets, instructions]

        addingredientsToRecipe([recipe, ingredients])

        for (let i = 0; i < newPropertyTitles.length; i++) {
            mergeTwoSQLTable([recipe, newProperties[i]], newPropertyTitles[i])
        }
        // console.log(recipe);
        return recipe;
    } catch (err) {
        console.log(err);;
    }
}



const newUser = async (firstName, lastName, password, email) => {
    const [user, fields] = await db.execute(`INSERT INTO users (firstName, lastName, password, email) VALUES
        ("${firstName}", "${lastName}", "${password}", "${email}")`)
    return { id: user.insertId };
}

const onlyRecipesName = async () => {
    const [names, fields] = await db.execute('Select name from recipes');
    return names;
}

const onlyingredientsName = async () => {
    const [names, fields] = await db.execute('Select name from ingredients');
    return names;
}

const updateUser = async (id, firstName, lastName, password, email) => {
    try {
        // const [userid, fields] = await db.query('Select * from recipes; Select * from users');
        const myquery = "SET @id= ?; SET @firstName= ?;SET @lastName= ?;SET @password= ?;SET @email= ?; \
        call add_or_change_user(@id, @firstName, @lastName, @password, @email)"

        const [user, fields] = await db.query(myquery, [id, firstName, lastName, password, email]);
        const userId = await user.find(element => element.constructor === Array)
        return userId;
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    recipes,
    onlyRecipesName,
    onlyingredientsName,
    newUser,
    recipeInfo,
    updateUser
}