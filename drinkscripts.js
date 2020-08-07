var drinkString;

function generateSearchResults(APIurl) {
    let drinkSearchResults = $("#drinkSearchResults");
    drinkSearchResults.html("");
    let errorMsg = $("#drinkError");
    errorMsg.text("")

    $.ajax({
        url: APIurl,
        method: "GET"
    }).then(function(response){
        if(response.drinks === null) {
            errorMsg.css("color", "red");
            errorMsg.text("Error: No search results found for " + drinkString + ". Please try again");
        }else{
            for (k=0; k < response.drinks.length; k++) {
                let drinkObject = response.drinks[k];
                let resultsDiv = $("<div>");
                resultsDiv.attr("id", drinkObject.idDrink);
                resultsDiv.attr("class", "drinkSearchResult");
                let drinkTitle = $("<h1>").text(drinkObject.strDrink);
                drinkTitle.attr("id", drinkObject.idDrink);
                resultsDiv.append(drinkTitle);

                if (drinkObject.strCategory !== undefined) {
                    let drinkDesc = $("<p>").text("Category: " + drinkObject.strCategory);
                    resultsDiv.append(drinkDesc);
                }

                let drImg = $("<img>").attr("scr", drinkObject.strDrinkThumb);
                drImg.width(150);
                resultsDiv.append(drImg);
                $("#drinkSearchResults").append(resultsDiv);
            }
        }
    });
}

function generateDrinkDetails(APIurl) {
    $.ajax({
        url: APIurl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        let drinkObject = response.drinks[0];
        $("#drinkName").text(drinkObject.strDrink);
        $("#drinkIMG").attr("src", drinkObject.strDrinkThumb);
        $("#drinkIMG").width(300);
        $("#drinkCategory").text("Category: " + drinkObject.strCategory);
        let drinkIngredientsArray = [drinkObject.strIngredient1, drinkObject.strIngredient2, drinkObject.strIngredient3, drinkObject.strIngredient4, drinkObject.strIngredient5, drinkObject.strIngredient6, drinkObject.strIngredient7, drinkObject.strIngredient8, drinkObject.strIngredient9, drinkObject.strIngredient10, drinkObject.strIngredient11, drinkObject.strIngredient12, drinkObject.strIngredient13, drinkObject.strIngredient14, drinkObject.strIngredient15];
        let drinkMeasurementsArray = [drinkObject.strMeasure1, drinkObject.strMeasure2, drinkObject.strMeasure3, drinkObject.strMeasure4, drinkObject.strMeasure5, drinkObject.strMeasure6, drinkObject.strMeasure7, drinkObject.strMeasure8, drinkObject.strMeasure9, drinkObject.strMeasure10, drinkObject.strMeasure11, drinkObject.strMeasure12, drinkObject.strMeasure13, drinkObject.strMeasure14, drinkObject.strMeasure15];
        for (i = 0; i < drinkIngredientsArray.length; i ++) {
            if (drinkIngredientsArray[i] !== null && drinkIngredientsArray [i] !== "") {
                let li = $("<li>").text(drinkIngredientsArray[i] + " - " + drinkMeasurementsArray[i]);
                $("#drinkIngredientList").append(li);
            }
        }
        $("#drinkInstructions").text(drinkObject.strInstructions);
    })
}