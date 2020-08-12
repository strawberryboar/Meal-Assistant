const drCatalog = document.getElementById("drinkCatalog");
const drSearchResults = document.getElementById("drinkSearchResults");
const drDetails = document.getElementById("drinkDetails");
const drReturn  = document.getElementById("returnDrinkCatalog");

function generateDrinkCategories(){
    var drURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

    $.ajax({
        url: drURL,
        method: "GET"
    }).then(function(response){
        $(".drinkCategories").append($("<h1>").text("Category List: "));
        for (i=0; i < response.drinks.length; i++) {
            var drCategory = $("<div>");
            drCategory.val(response.drinks[i].strCategory)
            drCategory.attr("class", "drinkCategory")
            var drTitle = $("<h2>").text(response.drinks[i].strCategory);
            drCategory.append(drTitle);
            $(".drinkCategories").append(drCategory);
        }
    });
}

function generateDrinkGlasses() {
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list";

    $.ajax({
        url: APIurl,
        method: 'GET'
    }).then(function(response) {
        $(".drinkGlasses").append($("<h1>").text('Glass List:'));
        for (i = 0; i < response.drinks.length; i++) {
            var glass = $("<div>");
            glass.val(response.drinks[i].strGlass);
            glass.attr("class", "drinkGlass");
            var drGlass = $("<h2>").text(response.drinks[i].strGlass);
            glass.append(drGlass);
            $(".drinkGlasses").append(glass);
        }
    });
}

function generateDrinkAlcohol() {
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list";

    $.ajax({
        url: APIurl,
        method: 'GET'
    }).then(function(response) {
        $(".drinkAlcoholic").append($("<h1>").text('Alcohol List:'));
        for (i = 0; i < response.drinks.length; i++) {
            var alcohol = $("<div>");
            alcohol.val(response.drinks[i].strAlcoholic);
            alcohol.attr("class", "drinkAlcohol");
            var drAlcoholic = $("<h2>").text(response.drinks[i].strAlcoholic);
            alcohol.append(drAlcoholic);
            $(".drinkAlcoholic").append(alcohol);
        }
    });
}

$(document).on("click", ".drinkCategory", function(){
    drCatalog.classList.add("hidden");
    drReturn.classList.remove("hidden");
    drSearchResults.classList.remove("hidden");
    var drinkCategory = $(this).val();
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + drinkCategory;
    generateSearchResults(APIurl);
});

$(document).on("click", ".drinkGlass", function(){
    drCatalog.classList.add("hidden");
    drReturn.classList.remove("hidden");
    drSearchResults.classList.remove("hidden");
    var drGlass = $(this).val();
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=" + drGlass;
    generateSearchResults(APIurl);
});

$(document).on('click', '#drinkRandomGenerator', function(){
    drCatalog.classList.add("hidden");
    drReturn.classList.remove("hidden");
    drSearchResults.classList.remove("hidden");
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    generateSearchResults(APIurl);
});

$(document).on('click','.returnDrinkResults',function(){
    drDetails.classList.add("hidden");
    drReturn.classList.remove("hidden");
    drSearchResults.classList.remove("hidden");
    $("#drinkIMG").attr("src", "");
    $("#drinkIngredientList").html("");
});

$(document).on('click','.drinkSearchResult',function(){
    var id = $(this).attr('id');
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;
    drReturn.classList.add("hidden");
    drSearchResults.classList.add("hidden");
    generateDrinkDetails(APIurl);
    drDetails.classList.remove("hidden");
});

$(document).on('click','#returnDrinkCatalog',function(){
    drDetails.classList.add("hidden");
    drSearchResults.classList.add("hidden");
    drReturn.classList.add("hidden");
    drCatalog.classList.remove("hidden");
});

$(document).on("click", ".drinkAlcohol", function(){
    drCatalog.classList.add("hidden");
    drReturn.classList.remove("hidden");
    drSearchResults.classList.remove("hidden");
    var drAlcohol = $(this).val();
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + drAlcohol;
    generateSearchResults(APIurl);
});