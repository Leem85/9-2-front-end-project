const foodForm = document.querySelector("form");
const foodInput = document.querySelector("form input#food");
const recipesDiv = document.querySelector("div#recipes");
const searchedItem = document.querySelector("h1#search-title");
const calories = document.querySelector("table tr td#calories");
const fat = document.querySelector("table tr td#fat");
const protein = document.querySelector("table tr td#protein");
const carbs = document.querySelector("table tr td#carbs");
const fiber = document.querySelector("table tr td#fiber");
const sugar = document.querySelector("table tr td#sugar");

const nutrientsOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d306446bd6msh5a73025a5c1ffa1p1bae8bjsn00652585ec83",
    "X-RapidAPI-Host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
  },
};
const randomRecipesOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d306446bd6msh5a73025a5c1ffa1p1bae8bjsn00652585ec83",
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  },
};


foodForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // const searchValue = foodInput.value

  if(foodInput.value === '') return alert('Enter a valid food!')

  fetch(
    `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${foodInput.value}`,
    nutrientsOptions
  )
    .then((response) => response.json())
    .then((data) => {

      if(Object.keys(data.totalNutrients).length === 0) return alert('Enter correct info')
      
      searchedItem.innerText = `Searched Item: ${foodInput.value}`

      calories.innerText = data.calories
      
      console.log('this is the response', data.totalNutrients)

      fat.innerText = `${data.totalNutrients.FAT.quantity.toFixed(1)}${data.totalNutrients.FAT.unit}`
     
      protein.innerText = `${data.totalNutrients.PROCNT.quantity.toFixed(1)}${data.totalNutrients.PROCNT.unit}`
     
      carbs.innerText = `${data.totalNutrients.CHOCDF.quantity.toFixed(1)}${data.totalNutrients.CHOCDF.unit}`
     
      fiber.innerText = `${data.totalNutrients.FIBTG.quantity.toFixed(1)}${data.totalNutrients.FIBTG.unit}`
     
      sugar.innerText = `${data.totalNutrients.SUGAR.quantity.toFixed(1)}${data.totalNutrients.SUGAR.unit}` 

      
      foodForm.reset()
    })
    .catch((err) => console.error(err));


});

document.addEventListener("DOMContentLoaded", (event) => {

  fetch(
    'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    randomRecipesOptions
  )
    .then((response) => response.json())
    .then((response) => {
      console.log('this is response', response.recipes[0] )
     recipesDiv.innerHTML = `
       <hr>
       <div class='wrapper'>
         <div class='left'>
           <h1>Random Recipe</h1>  
           <h3>${response.recipes[0].title}</h3>
           <img height='300px' width='300px' src="${response.recipes[0].   image}">
           </div>
           <div class='right'>
             <p>Ready in ${response.recipes[0].readyInMinutes} minutes</p>
             <span>${response.recipes[0].instructions}</span>
           </div>
       </div>
`
    })
    .catch((err) => console.error(err));
});
