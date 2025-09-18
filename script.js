const form = document.getElementById("recipe-form");
const titleInput = document.getElementById("title");
const ingredientsInput = document.getElementById("ingredients");
const instructionsInput = document.getElementById("instructions");
const recipeList = document.getElementById("recipe-list");

const detailSection = document.getElementById("recipe-details");
const detailTitle = document.getElementById("detail-title");
const detailIngredients = document.getElementById("detail-ingredients");
const detailInstructions = document.getElementById("detail-instructions");
const deleteButton = document.getElementById("delete-recipe");
const closeButton = document.getElementById("close-details");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let currentRecipeIndex = null;

function saveRecipes() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function renderRecipes() {
  recipeList.innerHTML = "";
  recipes.forEach((recipe, index) => {
    const li = document.createElement("li");
    li.textContent = recipe.title;
    li.addEventListener("click", () => showDetails(index));
    recipeList.appendChild(li);
  });
}

function showDetails(index) {
  const recipe = recipes[index];
  detailTitle.textContent = recipe.title;
  detailIngredients.innerHTML = recipe.ingredients
    .split("\n")
    .map((i) => `<li>${i}</li>`)
    .join("");
  detailInstructions.textContent = recipe.instructions;
  detailSection.classList.remove("hidden");
  currentRecipeIndex = index;
}

function hideDetails() {
  detailSection.classList.add("hidden");
  currentRecipeIndex = null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newRecipe = {
    title: titleInput.value,
    ingredients: ingredientsInput.value,
    instructions: instructionsInput.value,
  };
  recipes.push(newRecipe);
  saveRecipes();
  renderRecipes();
  form.reset();
});

deleteButton.addEventListener("click", () => {
  if (currentRecipeIndex !== null) {
    recipes.splice(currentRecipeIndex, 1);
    saveRecipes();
    renderRecipes();
    hideDetails();
  }
});

closeButton.addEventListener("click", hideDetails);

renderRecipes();
