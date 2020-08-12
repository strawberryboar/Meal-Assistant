function GenerateMealIngredients() {
    var APIurl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

    $.ajax({
        url: APIurl,
        method: 'GET'
    }).then(function(response) {
        $(".MealIngredientList").append($("<h1>").text("Ingredients List:"));
        for (i = 0; i < response.meals.length; i++) {
            var ul = $("<ul>")
            var ingredient = $("<li>").text(response.meals[i].strIngredient);
            ul.append(ingredient);
            $(".MealIngredientList").append(ul);
        }

    });
}

$(document).ready(function(){
    GenerateMealIngredients();
});