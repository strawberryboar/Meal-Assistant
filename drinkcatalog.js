const drCatalog = document.getElementById("#drinkCatalog");
const drSearchResults = document.getElementById("#drinkSearchResults");
const drDetails = document.getElementById("#drinkDetails");
const drReturn  = document.getElementById("#returnDrinkCatalog");

function generateDrinkCategories(){
    const drURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

    $.ajax({
        url: drURL,
        method: "GET"
    }).then(function(response){
        $("drinkCategories")
    })

}
