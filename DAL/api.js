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

const login = async (email, password) => {
    try {
        const [result, fields] = await db.execute(`SELECT id,firstname as 'name',email FROM users WHERE email = ? and password = ?`, [email, password]);

        return result[0];

    } catch (error) {
        throw new Error('Unknown error');
    }
}
//addNewRecipe(formInputs)
const addNewRecipe = async (recipe, ingredients, instructions) => {
    try {
        // console.log(ingredients)
        const query = `SET @id = ?; SET @name = ? ; SET @userID = ?; SET @description = ?; SET @level = ?; SET @Servings = ?;
        SET @prepTimeMins = ?; SET @CookingTime = ?;
        call add_or_change_recipe(@id, @name, @userID, @description, @level, @Servings, @prepTimeMins, @CookingTime);`

        const { CookingTime, Servings, prepTimeMins, recipeName, userId, description, level, categories, diets } = recipe;
        const [newRecipe, fields] = await db.query(query, [0, recipeName, userId, description, level, Servings, prepTimeMins, CookingTime])
        const newRecipeId = await newRecipe.find(element => element.constructor === Array)
        const flatingredientsData = ingredients.flatMap(ele => [ele.ingredient.id, ele.unit.id, ele.quantity])

        const temp = `(${newRecipeId[0].id},?), `.repeat(categories.length).slice(0, -2)
        const temp2 = `(${newRecipeId[0].id},?), `.repeat(diets.length).slice(0, -2)
        const temp3 = `(${newRecipeId[0].id},?), `.repeat(instructions.length).slice(0, -2)
        const temp4 = `(${newRecipeId[0].id},?, ?, ?), `.repeat(ingredients.length).slice(0, -2)




        const categoriesDietsInstructionQuery = `INSERT INTO recipecategory (recipeId, CategoryTypeId) VALUES ${temp};
         INSERT INTO recipediet (recipeId, DietId) VALUES ${temp2};
         INSERT INTO instructions (recipeId,instruction) VALUES ${temp3};
         INSERT INTO recipeingredients (recipeID, IngredientID, MeasuringUnitID, Quantity) VALUES ${temp4};`

        const t = [...categories, ...diets, ...instructions, ...flatingredientsData]
        // console.log(categoriesDietsInstructionQuery, t);
        const [moreInfo, fieldsC] = await db.query(categoriesDietsInstructionQuery, [...t]);

        return newRecipeId[0].id;
    } catch (err) {
        console.log(err);;
    }
}


const getDietsCategoriesInfo = async () => {
    try {
        const [data, fields] = await db.query('Select id,name from diets;Select id,name from categories');
        // const [categories, fieldsc] = await db.execute('Select id,name from categories');
        return data;
    } catch (err) {
        console.log(err);
    }
}

const checkAvailable = async (name) => {
    try {
        const [data, fields] = await db.execute('Select * from recipes where name = ?', [name]);
        if (data.length === 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

const unitsAndIngs = async () => {
    try {
        const [data, fields] = await db.query('Select id,name from ingredients;Select id,name from measuringunits');
        // const [categories, fieldsc] = await db.execute('Select id,name from categories');
        return data;
    } catch (err) {
        console.log(err);
    }
}

const addImage = async (imageName, idRecipe) => {
    try {
        const [data, fields] = await db.execute(`UPDATE recipes SET image = ? WHERE id = ?;`, ["images/" + imageName, idRecipe]);
        return data;
    } catch (err) {
        console.log(err);
    }
}

const deleteRecipe = async (id) => {
    try {
        const [data, fields] = await db.query(`SET @id = ?; CALL delete_recipe_data_from_linked_tables(@id);`, [id]);
        return data;
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    recipes,
    onlyRecipesName,
    onlyingredientsName,
    newUser,
    recipeInfo,
    updateUser,
    login,
    addNewRecipe,
    getDietsCategoriesInfo,
    checkAvailable,
    unitsAndIngs,
    addImage,
    deleteRecipe
}