const searchForm = document.getElementById("drinkSearch");
const drinkDetails = document.getElementById("drinkDetails");
let drinkSearchArray = new Array();
let drinkSearchIngredientArray = new Array();

//Function to search for drinks by name or main ingredient with autocomplete feature
$(document).ready(function(){
    function loadDrinkSuggestions() {
        const ABC = "abcdefghijklmnopqrstuvwxyz";
        for (var y = 0; y < ABC.length; y++) {
            $.ajax({
                url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + ABC.charAt(y),
                method: 'GET'
            }).then(function(response) {
                if (response.drinks !== null) {
                    for (var z = 0; z < response.drinks.length; z++) {
                        let drink = response.drinks[z].strDrink;
                        drinkSearchArray.push(drink);

                        $('#drinkInput').autocomplete({
                            lookup: drinkSearchArray
                        });
                    }
                }
            });
        }

        $.ajax({
            url: "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
            method: 'GET'
        }).then(function(response) {
            console.log(response)

            for (var i = 0; i < response.drinks.length; i++) {
                let drinkIngredient = response.drinks[i].strIngredient1;
                drinkSearchIngredientArray.push(drinkIngredient);

                $('#drinkIngredientInput').autocomplete({
                    lookup: drinkSearchIngredientArray
                });
            }

        });
    }
    loadDrinkSuggestions()
});

// Drink Search Button event listener to search for drink by name or main ingredient
$(document).on('click','#drinkSearchBtn',function(){
    var searchSelect = $("#searchSelect").val();
    if (searchSelect === "name") {
        var drinkSearchInputVal = $("#drinkInput").val();
        drinkString = drinkSearchInputVal;
        var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkSearchInputVal;
    } else if (searchSelect === "mainDrinkIngredient") {
        var drinkIngredientSearchInput = $("#drinkIngredientInput").val();
        drinkString = drinkIngredientSearchInput;
        var url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkIngredientSearchInput;
    } 
    generateSearchResults(url)
});

// Drink Search Results click Event to show drink details
$(document).on('click','.drinkSearchResult',function(){
    var id = $(this).attr('id');
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id
    searchForm.classList.add("hidden");
    generateDrinkDetails(APIurl);
    drinkDetails.classList.remove("hidden");
});

// Return to search results
$(document).on('click','.returnDrinkResults',function(){
    searchForm.classList.remove("hidden");
    drinkDetails.classList.add("hidden");
    $("#drinkIMG").attr("src", "");
    $("#drinkIngredientList").html("");
});

$( "#searchSelect" ).change(function() {
    var drinkSearchSelect = $("#searchSelect").val();
    if (drinkSearchSelect === "name") {
        document.getElementById("drinkIngredientInput").classList.add("hidden");
        document.getElementById("drinkInput").classList.remove("hidden");
        $("#drinkIngredientInput").val("");
    } else if (drinkSearchSelect === "mainDrinkIngredient") {
        document.getElementById("drinkInput").classList.add("hidden");
        document.getElementById("drinkIngredientInput").classList.remove("hidden");
        $("#drinkInput").val("")
    } 
}); 