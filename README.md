# Project-1

GitHub Live Page: https://strawberryboar.github.io/Meal-Assistant/

Contributors: Athena Petrovich (strawberryboar), Maynard Peralta (maynperalta), & Vincent McGargill (vmcgargill)

## Overall Scope

The Meal Assistant is an app that allows users to search for both food and drink recipes by name/title, search for recipes by ingredient, browse various recipes via a catalog, and save various meal recipes and cocktail drink recipes. This application can even generate random recipes if they are not sure what they want.

## User Story

As a restaurant owner running a business in a downtown location, I want to create an app for my management, bartending, and cooking staff that provides a search engine that retrieves information from a database using an API. That way if the bartenders and managers want to introduce a new specialty drink on the menu based off of excess ingredients, they can look up various drink recipes that use those ingredients. The app will also allow our chefs and management staff to look up food recipes based on the type of restaurant we run, and/or recipes that use a specific ingredient in case we have an excess amount of a specific ingredient. That way we can add new meals to the menu based off our ingredient inventory.

## APIs & Frameworks

The Cocktail DB: http://www.recipepuppy.com/about/api/

The Meal DB: https://www.themealdb.com/api.php

Bulma CSS Framework: https://bulma.io/

## Technologies

- HTML
- CSS
- JavaScript
- jQuery & Autocomplete
- Bulma CSS Framework
- AJAX API Requests

## Navbar & Footer

The Navbar is designed so that the user my browse The Meal Assistant by either 2 main sections: food or drink.

- Food: The food section of The Meal Assistant contains the Meal Catalog, Meal Search, Saved Meals, Meal Ingredients, and Random Meals.

- Drink: The drink section of the Meal Assistant contains the Drink Catalog, Drink Search, Saved Drinks, Drink Ingredients, and Random Drink.

The footer of the website simply links the user to each contributor's respective GitHub page.

## Home Page

The home page or index page is the page that the user first sees when they visit the website. This page presents the user with a welcome message that explains what the app is and what it does. The home page also has a get started button. Once they click on the welcom button, then it sets off a onClick event listener that takes the

## Meal Catalog & Drink Catalog

The Meal Catalog and Drink Catalog pages let the user browse a catalog of all meals based on their catagories and areas/countries of origin. This page utlizes 3 script pages to generate the Meal/Drink catalog. The first script page is the primary script page the provides the Generate Search Resualts and Generate Details function that are also used on other HTML pages. The second script page is the Catalog page which provides functions that generate the various categories, areas, glasses, and alcohol types. The third script page is the page that runs the function needed to call the api and display the various categories, areas, and glasses.

## Meal Search & Drink Search

The search pages allow the user to search for either meal/drink name or ingredient. The search input also features a jQuery autocomplete function that generates a list of meal/drink names or ingredient suggestions. For the meal/drink names, the AJAX call runs through a loop 26 times from letters A-Z because the only way to get all the names from the API is by looping through the search by letter API call by every letter, then getting all of the names, then adding those names to the search by name array, then inputting those names in the autocomplete function for the HTML search input. The ingredient autocomplete function has the same process but it is easier and faster because the database has an API call where you can call for all the the ingredient titles. There is no API call that just calls by meal/drink title. Once the user searches for something such as "Beef" then it will display all results that have the name beef in it's title. If the user selects one of the divs, then it will display that meal detail using the meal ID stored in that element to identify which meal from the database is on display.

## Saved Meals & Drinks

The saved meals and drinks page allows the user to load all of their saved objects from the database. For this project, the meal/drink ID is saved and stored locally on the user's computer browser. The user may save or unsave a meal whenever they are in the meal details because the Generate Meal/Drink functions checks the local storage if that object is saved or not. If the object is saved then it presents an unsaved button. If the object is unsaved then it presents a saved button. The user may click on their saved meals to view the details, and they may even unsave it if they would like, once they return to the save menu, then it refreshes to see if the item was removed from local storage.

## Meal & Drink Ingredients

The ingredient pages simply loads and displays to the user all of the ingredients that are currently on the database using an API call with AJAX. We would have added a feature where the user can click on an ingredient and it will display all of the meals/drinks with that ingredient. But that is what the search pages are for. Plus, not all of the ingredients on the databases are used on the free versions of the Meal and Cocktail DB APIs. So some of those ingredients would return no results.

## Random Meal & Drinks

The random meal and drink pages simply calls to the API for a completely random object from the database. Then it displays that object on the user's screen. The user may then click on the div container to view the object's details, or if they would like to randomly generate something else, they may return to the previous page. This would be ideal for people who don't really know what they want and they want something different.

# Conclusion

The Meal Assistant would be useful for restaurants and bars to use in case they want to add new menu items based on name, ingredients used, the type of dish, the type of glass drink, etc. This would be ideal for restaurant businesses to use if they have to start adding new drinks or dishes to the menu.

![meal assistant](./sources/Meal-Assistant.gif)
