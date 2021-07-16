const mergeTwoSQLTable = ([recipes, categories], newProperty) => {
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const newCollection = []
        for (let j = 0; j < categories.length; j++) {
            const category = categories[j];
            if (category.recipeId === recipe.id) {
                newCollection.push(category.name)
            }
        }
        recipe[newProperty] = newCollection;
    }
}

const addingredientsToRecipe = ([recipe, ingredients]) => {
    const newArr = [];
    for (let i = 0; i < ingredients.length; i++) {
        const { quantity, unit, ingredientName } = ingredients[i];
        let newl = `${quantity} ${unit} ${ingredientName}`;
        newArr.push(newl);
    }
    recipe[0]["ingredients"] = newArr;
}

const organizedData = (recipe) => {
    // console.log("recipe", recipe);
    const [data] = recipe[0];
    const categories = recipe[1].map(cat => cat.id)
    const diets = recipe[2].map(diet => diet.id)

    data["categories"] = categories;
    data["diets"] = diets;
    // console.log("data", data);

    return data;
}

const organizedIngredients = (obj) => {
    console.log("obj", obj);
    const organizedData = obj.map(el => {
        return {
            ingredient: {
                id: el.ingredientId,
                name: el.ingredientName
            },
            unit: {
                id: el.unitId,
                name: el.unitName
            },
            quantity: el.Quantity
        }
    })
    console.log("organizedData", organizedData);
    return organizedData;
}

const organizedinstructions = (obj) => {
    const organizedData = obj.map(el => {
        return `${el.instruction}`
    })
    console.log("organizedData", organizedData);
    return organizedData;
}


module.exports = {
    mergeTwoSQLTable,
    addingredientsToRecipe,
    organizedData,
    organizedIngredients,
    organizedinstructions
};