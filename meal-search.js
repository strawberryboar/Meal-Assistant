const SearchForm = document.getElementById("SearchForm");
const MealDetails = document.getElementById("MealDetails");
let MealSearchArray = new Array();
let MealSearchIngredientArray = new Array();


// Load Search Results
$(document).ready(function(){
    function LoadMealSuggestions() {
        const ABC = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < ABC.length; i++) {
            $.ajax({
                url: 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + ABC.charAt(i),
                method: 'GET'
            }).then(function(response) {
                if (response.meals !== null) {
                    for (var x = 0; x < response.meals.length; x++) {
                        var meal = response.meals[x].strMeal;
                        MealSearchArray.push(meal);

                        $('#MealSearchInput').autocomplete({
                            lookup: MealSearchArray
                        });
                    }
                }
            });
        }

        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
            method: 'GET'
        }).then(function(response) {
            console.log(response)
    
            for (i = 0; i < response.meals.length; i++) {
                var ingredient = response.meals[i].strIngredient;
                MealSearchIngredientArray.push(ingredient);

                $('#MealIngredientSearchInput').autocomplete({
                    lookup: MealSearchIngredientArray
                });
            }
    
        });
    }
    LoadMealSuggestions()
});

// Meal Search Button
$(document).on('click','#MealSearchBtn',function(){
    var SearchSelect = $("#SearchSelect").val();
    if (SearchSelect === "Name") {
        var MealSearchInputVal = $("#MealSearchInput").val();
        MealString = MealSearchInputVal;
        var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + MealSearchInputVal;
    } else if (SearchSelect === "MainIngredient") {
        var MealIngredientSearchInput = $("#MealIngredientSearchInput").val();
        MealString = MealIngredientSearchInput;
        var url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + MealIngredientSearchInput;
    } 
    GenerateSearchResults(url)
});

// Meal Search Results click Event
$(document).on('click','.MealSearchResult',function(){
    var id = $(this).attr('id');
    var APIurl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    SearchForm.classList.add("hidden");
    GenerateMealDetails(APIurl);
    MealDetails.classList.remove("hidden");
});

// Shows meal Results
$(document).on('click','.ReturnMealResults',function(){
    SearchForm.classList.remove("hidden");
    MealDetails.classList.add("hidden");
    $("#MealSource").html("");
    $("#MealVideo").html("");
    $("#MealIMG").attr("src", "");
    $("#IngredientList").html("");
});

// Search Select Listener that changes which search input displays on screen.
$( "#SearchSelect" ).change(function() {
    var SearchSelect = $("#SearchSelect").val();
    if (SearchSelect === "Name") {
        document.getElementById("MealIngredientSearchInput").classList.add("hidden");
        document.getElementById("MealSearchInput").classList.remove("hidden");
        $("#MealIngredientSearchInput").val("");
    } else if (SearchSelect === "MainIngredient") {
        document.getElementById("MealSearchInput").classList.add("hidden");
        document.getElementById("MealIngredientSearchInput").classList.remove("hidden");
        $("#MealSearchInput").val("")
    } 
});