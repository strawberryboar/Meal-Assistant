function generateDrinkIngredients() {
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

    $.ajax({
        url: APIurl,
        method: 'GET'
    }).then(function(response) {
        $(".drinkIngredientList").append($("<h1>").text("Ingredients List: "));
        for (i = 0; i < response.drinks.length; i++) {
            var ul = $("<ul>")
            var ingredient = $("<li>").text(response.drinks[i].strIngredient1);
            ul.append(ingredient);
            $(".drinkIngredientList").append(ul);
        }
    });
}

$(document).ready(function(){
    generateDrinkIngredients();
});