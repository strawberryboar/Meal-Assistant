var MealString;

function GenerateSearchResults(APIurl) {
    var searchresults = $("#MealSearchresults")
    searchresults.html("");
    var ErrorMsg = $("#MealErrorMsg");
    ErrorMsg.text("");
    
    $.ajax({
        url: APIurl,
        method: 'GET'
    }).then(function(response) {
        if (response.meals === null) {
            
            ErrorMsg.css("color", "red");
            ErrorMsg.text('Error: No search results found for ' + MealString + '. Please try again.')
        } else {
            for (i = 0; i < response.meals.length; i++) {
                var MealObject = response.meals[i];
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
                searchresults.append(ResultDiv);
            }
        }
    });
}

function GenerateMealDetails(APIurl) {
    $.ajax({
        url: APIurl,
        method: 'GET'
    }).then(function(response) {
        var MealObject = response.meals[0];
        $("#MealTitle").text(MealObject.strMeal);
        $("#MealIMG").attr("src", MealObject.strMealThumb);
        $("#MealIMG").width(300);
        $("#MealArea").text("Area: " + MealObject.strArea);
        $("#MealCategory").text("Category: " + MealObject.strCategory);
        var IngredientArray = [MealObject.strIngredient1, MealObject.strIngredient2,
            MealObject.strIngredient3, MealObject.strIngredient4, MealObject.strIngredient5,
            MealObject.strIngredient6, MealObject.strIngredient7, MealObject.strIngredient8,
            MealObject.strIngredient9, MealObject.strIngredient10, MealObject.strIngredient11,
            MealObject.strIngredient12, MealObject.strIngredient13, MealObject.strIngredient14,
            MealObject.strIngredient15, MealObject.strIngredient16, MealObject.strIngredient17,
            MealObject.strIngredient18, MealObject.strIngredient19, MealObject.strIngredient20];
        var MeasurementArray = [MealObject.strMeasure1, MealObject.strMeasure2, 
            MealObject.strMeasure3, MealObject.strMeasure4, MealObject.strMeasure5, 
            MealObject.strMeasure6, MealObject.strMeasure7, MealObject.strMeasure8, 
            MealObject.strMeasure9, MealObject.strMeasure10, MealObject.strMeasure11,
            MealObject.strMeasure12, MealObject.strMeasure13, MealObject.strMeasure14, 
            MealObject.strMeasure15, MealObject.strMeasure16, MealObject.strMeasure17, 
            MealObject.strMeasure18, MealObject.strMeasure19, MealObject.strMeasure20];
        for (i = 0; i < IngredientArray.length; i++) {
            if (IngredientArray[i] !== null && IngredientArray[i] !== "") {
                var li = $("<li>").text(IngredientArray[i] + " - " + MeasurementArray[i]);
                $("#IngredientList").append(li);
            }
        }
        $("#MealInstructions").text(MealObject.strInstructions);
        var source = $("<a>").text("Original Source");
        source.attr("href", MealObject.strSource);
        $("#MealSource").append(source);
        var video = $("<a>").text("YouTube Video");
        video.attr("href", MealObject.strYoutube);
        $("#MealVideo").append(video);
        ////////// New Additions as of 8/6/2020 ////////// 
        var MealID = MealObject.idMeal;
        $("#SaveMealBtn").val(MealID);
        $("#RemoveMealBtn").val(MealID);
        var SavedMeals = JSON.parse(localStorage.getItem("SavedMeals"));
        if (SavedMeals === null) {
            RemoveMealBtn.classList.add("hidden");
            SaveMealBtn.classList.remove("hidden");
        } else if (SavedMeals.includes(MealID)) {
            SaveMealBtn.classList.add("hidden");
            RemoveMealBtn.classList.remove("hidden");
        } else {
            RemoveMealBtn.classList.add("hidden");
            SaveMealBtn.classList.remove("hidden");
        }
        ////////////////////////////////////////////////////
    });
}

$(document).on('click','#SaveMealBtn',function(){
    var MealID = $(this).val();
    var SavedMeals = JSON.parse(localStorage.getItem("SavedMeals"));
    if (SavedMeals === null) {
        var NewMealArray = new Array();
        NewMealArray.push(MealID);
        localStorage.setItem("SavedMeals", JSON.stringify(NewMealArray));
    } else {
        SavedMeals.push(MealID);
        localStorage.setItem("SavedMeals", JSON.stringify(SavedMeals));
    }
    var APIurl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + MealID;
    $("#MealSource").html("");
    $("#MealVideo").html("");
    $("#IngredientList").html("");
    GenerateMealDetails(APIurl)
});

$(document).on('click','#RemoveMealBtn',function(){
    var MealID = $(this).val();
    var SavedMeals = JSON.parse(localStorage.getItem("SavedMeals"));
    var index = SavedMeals.indexOf(MealID);
    SavedMeals.splice(index, 1);
    localStorage.setItem("SavedMeals", JSON.stringify(SavedMeals));
    var APIurl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + MealID;
    $("#MealSource").html("");
    $("#MealVideo").html("");
    $("#IngredientList").html("");
    GenerateMealDetails(APIurl);
});