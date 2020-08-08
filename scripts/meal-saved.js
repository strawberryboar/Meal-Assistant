const MealSearchresults = document.getElementById("MealSearchresults");
const MealDetails = document.getElementById("MealDetails");

// Loads Saved Meals
function LoadSavedMeals() {
    var SavedMeals = JSON.parse(localStorage.getItem("SavedMeals"));

    // Updated IF statement to fix bug
    if (SavedMeals === null || SavedMeals.length === 0) {
        $("#MealErrorMsg").text("You have not added any meals to your saved meal list yet! Start saving meals to see this list populate.")
    } else {
        for (var i = 0; i < SavedMeals.length; i++) {
            var MealID = SavedMeals[i];
            var APIurl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + MealID;
            
            $.ajax({
                url: APIurl,
                method: 'GET'
            }).then(function(response) { 
                console.log(response.meals[0])
                var MealObject = response.meals[0];
                var ResultDiv = $("<div>");
                ResultDiv.attr("id", MealObject.idMeal);
                ResultDiv.attr("class", "MealSearchResult");
                var title = $("<h1>").text(MealObject.strMeal);
                title.attr("id", MealObject.idMeal);
                ResultDiv.append(title);
    
                if (MealObject.strArea !== undefined && MealObject.strCategory !== undefined) {
                    var description = $("<p>").text("Area: " + MealObject.strArea 
                    + " - Category: " + MealObject.strCategory);
                    ResultDiv.append(description);
                }
    
                var img = $("<img>").attr("src", MealObject.strMealThumb);
                img.width(150);
                ResultDiv.append(img);
                $("#MealSearchresults").append(ResultDiv);
            });
        }
    }
}

LoadSavedMeals()

// Meal Search Results click Event
$(document).on('click','.MealSearchResult',function(){
    var id = $(this).attr('id');
    var APIurl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    MealSearchresults.classList.add("hidden");
    GenerateMealDetails(APIurl);
    MealDetails.classList.remove("hidden");
});

// Shows meal Results
$(document).on('click','.ReturnMealResults',function(){
    MealSearchresults.classList.remove("hidden");
    MealDetails.classList.add("hidden");
    $("#MealSource").html("");
    $("#MealVideo").html("");
    $("#MealIMG").attr("src", "");
    $("#IngredientList").html("");
    $("#MealSearchresults").html("");
    LoadSavedMeals()
});