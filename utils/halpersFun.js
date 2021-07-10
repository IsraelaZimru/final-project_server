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


module.exports = { mergeTwoSQLTable, addingredientsToRecipe };