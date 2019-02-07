//=============================================================================
//extend jQuery to include case-insensitive 'contains' function
$.extend($.expr[":"], {
  "containsIN": function (elem, i, match, array) {
    return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});
//=============================================================================

import * as utility from "./utility"

export const foodsList = (foods) => {
  $("#foods-list-items-container").empty();
  foods.forEach(food => { addFoodItem(food.id, food.name, food.calories) })
  foodListEventHandlers();
  foodListFilterForm(foods.length)
}

export const addFoodItem = (id, name, calories) => {
  $("#foods-list-items-container").append(
    `<div class="foods-list-item-container" id="food-${id}">
        <div class="foods-list-item-name">
          ${name}
        </div>
        <div class="foods-list-item-calories">
          ${calories}
        </div>
        <select class="add-to-meal-select">
          <option>Add to meal...</option>
          <option id="select-breakfast">Breakfast</option>
          <option id="select-lunch">Lunch</option>
          <option id="select-dinner">Dinner</option>
          <option id="select-snack">Snack</option>
        </select>
        <button class="round-button update-food"></button>
        <button class="round-button delete-food"></button>
      </div>`
  )
}

export const foodListEventHandlers = () => {
  deleteFoodEventHandler();
  updateFoodEventHandler();
  addFoodToMealSelectEventHandler();
}

const deleteFoodEventHandler = () => {
  $(".delete-food").off("click").on("click", (event) => {
    let id = ($(event.target).parent().attr("id")).replace("food-", "");
    let name = ($(event.target).siblings(".foods-list-item-name").text().replace(/\s+/g, " ").trim());
    let calories = ($(event.target).siblings(".foods-list-item-calories").text());
    utility.deleteFromFoodList(id, name, calories);
    })
}

const updateFoodEventHandler = () => {
  $(".update-food").off("click").on("click", (event) => {
    $(event.target).siblings(".foods-list-item-name").attr("contenteditable", "true");
    $(event.target).siblings(".foods-list-item-name").addClass("editable");
    $(event.target).siblings(".foods-list-item-calories").attr("contenteditable", "true");
    $(event.target).siblings(".foods-list-item-calories").addClass("editable");
    $(event.target).siblings("button, select").hide();
    $(event.target).hide();
    updateFoodButtons(event);
    updateFoodButtonsEventHandlers(event);
  })
}

const addFoodToMealSelectEventHandler = () => {
  $(".add-to-meal-select").off("change").on("change", (event) => {
    $(event.target).siblings("button").hide();
    addFoodToMealButtons();
    addFoodToMealButtonsEventHandlers(event);
  })
}

const foodListFilterForm = (foodsQuantity) => {
  if(foodsQuantity > 1) {
    $("#foods-list-filter").append(
      `<form id="filter-food-form">
        <div class="filter-food-input-group">
          <label for="filter-food-input">Filter:</label>
          <input id="filter-food-input" 
                  type="text" 
                  placeholder="Filter food by name" 
                  aria-label="input for food filter">
        </div>
      </form>`
    )
  $("#filter-food-input").keyup(( ) => { filterFoodList() });
  };
}

const filterFoodList = () => {
  let filter = $("#filter-food-input").val();
  if(filter) {
    $("#foods-list-items-container").children().hide();
    //containsIN is an extension of jQuery defined at the top of this file
    $(`.foods-list-item-container:containsIN("${filter}")`).show();
  } else {
    $("#foods-list-items-container").children().show();
  }
}

const updateFoodButtons = (event) => {
  $(event.target).parent().append(
    `<button class="oval-button cancel-update-food">Cancel</button>
    <button class="oval-button save-update-food">Save</button>`
  )
}

const updateFoodButtonsEventHandlers = (event) => {
  $(".cancel-update-food").off("click").on("click", (event) => {
    cancelUpdateFood(event)
  })
  $(".save-update-food").off("click").on("click", (event) => {
    saveUpdateFood(event)
  })
}

const cancelUpdateFood = (event) => {
  $(event.target).siblings("button").hide();
  $(event.target).hide();
  $(event.target).siblings(".foods-list-item-name").attr("contenteditable", "false");
  $(event.target).siblings(".foods-list-item-name").removeClass("editable");
  $(event.target).siblings(".foods-list-item-calories").attr("contenteditable", "false");
  $(event.target).siblings(".foods-list-item-calories").removeClass("editable");
  foodListButtons(event);
  foodListEventHandlers();
}

const saveUpdateFood = (event) => {
  let id = ($(event.target).parent().attr("id")).replace("food-", "");
  let name = ($(event.target).siblings(".foods-list-item-name").text().replace(/\s+/g, " ").trim());
  let calories = ($(event.target).siblings(".foods-list-item-calories").text());
  utility.updateFood(id, name, calories);
  cancelUpdateFood(event);
}

const foodListButtons = (event) => {
  $(event.target).parent().append(
    `<select class="add-to-meal-select">
      <option>Add to meal...</option>
      <option id="select-breakfast">Breakfast</option>
      <option id="select-lunch">Lunch</option>
      <option id="select-dinner">Dinner</option>
      <option id="select-snack">Snack</option>
    </select>
    <button class="round-button update-food"></button>
    <button class="round-button delete-food"></button>`
  )
}

export const foodsFeedback = (text) => {
  $("#foods-feedback").text(text)
}

export const removeFoodItem = (id) => {
  $(`#food-${id}`).remove();
}

const addFoodToMealButtons = () => {
  $(event.target).parent().append(
    `<button class="oval-button cancel-add-to-meal">Cancel</button>
    <button class="oval-button save-add-to-meal">Add</button>`
  )
}

const addFoodToMealButtonsEventHandlers = (event) => {
  $(".cancel-add-to-meal").off("click").on("click", (event) => {
    cancelAddToMeal(event)
  })
  $(".save-add-to-meal").off("click").on("click", (event) => {
    saveAddToMeal(event)
  })
}

const cancelAddToMeal = (event) => {
  $(event.target).siblings("button, select").remove();
  $(event.target).siblings("select").prop("selected", false);
  $(event.target).hide();
  foodListButtons(event);
  foodListEventHandlers();
}

const saveAddToMeal = (event) => {
  let meal = {
    id: utility.getMealId($(event.target).siblings("select").val()),
    name: $(event.target).siblings("select").val()
  }
  let food = {
    id: $(event.target).parent().attr("id").replace("food-", ""),
    name: $(event.target).parent().children(":first-child").text().replace(/\s+/g, " ").trim(),
    calories: $(event.target).parent().children(":nth-child(2)").text().replace(/\s+/g, " ").trim()
  }
  utility.addFoodToMeal(meal, food);
  addFoodToMealFoodList(meal, food)
  cancelAddToMeal(event);
}

export const meals = (meals) => {
  $(".meal-food").remove();
  $(".meal-total-calories-value").empty();
  $(".meal-calories-remaining-value").empty();
  $("#total-calories").val(0);
  Object.keys(meals).forEach(meal => {
    mealFoodList(meals[meal]);
    mealSubtotals(meals[meal]);
  })
  dateTotals(meals)
  mealEventHandlers();
}

const mealFoodList = (meal) => {
  $(`h3:contains("${meal.name}")`).parent().attr("id", `${meal.name}-${meal.id}`)
  meal.foods.forEach(food => {
    if(food.id && food.name && food.calories) {
      addFoodToMealFoodList(meal, food);
    }
  });
}

export const addFoodToMealFoodList = (meal, food) => {
  $(`#${meal.name}-foods`).append(
    `<div class="foods-list-item-container meal-food" id="meal-${meal.id}-food-${food.id}">
        <div class="foods-list-item-name">
          ${food.name}
        </div>
        <div class="foods-list-item-calories">
          ${food.calories}
        </div>
        <button class="round-button delete-meal-food"></button>
      </div>`
  )
  deleteMealFoodsEventHandler();
}

export const mealSubtotals = (meal) => {
  let totalCalories = meal.foods.reduce((total, food) => total + food.calories, 0);
  let caloriesRemaining = meal.calorie_goal - totalCalories;

  $(`#${meal.name}-${meal.id}`)
    .find(".meal-total-calories-value")
    .text(totalCalories)
  $(`#${meal.name}-${meal.id}`)
    .find(".meal-calories-remaining-value")
    .text(caloriesRemaining)
}

const dateTotals = (meals) => {
  mealGoals(meals);
  grandTotals(meals)
}

const mealGoals = (meals) => {
  Object.keys(meals).forEach(meal => {
    $(`#${meals[meal].name}-goal`).text(meals[meal].calorie_goal);
  })
}

const grandTotals = (meals) => {
  let caloriesConsumed = totalCaloriesConsumed(meals);
  let goalCalories = totalGoalCalories(meals)
  clearGrandTotals(); 
  $("#total-calories").text(caloriesConsumed);
  $("#total-goal-calories").text(goalCalories);
  $("#total-calories-remaining").text(goalCalories - caloriesConsumed); 
}

const totalCaloriesConsumed = (meals) => {
  let totalCalories = 0
  Object.keys(meals).forEach(meal => {
    totalCalories += meals[meal].foods.reduce((total, food) => total + food.calories, 0)
  })
  return totalCalories
}

const totalGoalCalories = (meals) => {
  let mealArray = ["Breakfast", "Lunch", "Dinner", "Snack"]
  let totalGoalCalories = 0;
  mealArray.forEach(meal => {
    if(meals[meal]) {
      totalGoalCalories += meals[meal].calorie_goal
    } else {
      let goal = parseInt($(`#${meal}-goal`).text());
      totalGoalCalories += goal
    }
  });
  return totalGoalCalories
}

const clearGrandTotals = () => {
  $("#total-calories").text(0);
  $("#total-goal-calories").text(0);
  $("#total-calories-remaining").text(0);
}

const mealEventHandlers = () => {
  deleteMealFoodsEventHandler();
  updateGoalEventHandler();
}

const deleteMealFoodsEventHandler = () => {
  $(".delete-meal-food").off("click").on("click", (event) => {
    let food = {
      id: ($(event.target).parent().attr("id")).split("food-")[1],
      name: ($(event.target).siblings(".foods-list-item-name").text().replace(/\s+/g, " ").trim()),
      calories: ($(event.target).siblings(".foods-list-item-calories").text().replace(/\s+/g, " ").trim())
    }
    let meal = {
      id: ($(event.target).parents("div.meal-container").attr("id").replace(/\D/g, "")),
      name: ($(event.target).parents("div.meal-container").children("h3").text())
    }
    utility.deleteFromMealFoodsList(meal, food);
  })
}

export const removeMealsFoodItem = (mealId, foodId) => {
  $(`#meal-${mealId}-food-${foodId}`).remove();
}

const updateGoalEventHandler = () => {
  $(".update-goal").off("click").on("click", () => {
    $(event.target).siblings(".foods-list-item-calories").attr("contenteditable", "true");
    $(event.target).siblings(".foods-list-item-calories").addClass("editable");
    $(event.target).hide();
    updateGoalButtons(event);
    updateGoalButtonsEventHandlers(event);
  })
}

const updateGoalButtons = (event) => {
  $(event.target).parent().append(
    `<button class="oval-button cancel-update-goal">Cancel</button>
    <button class="oval-button save-update-goal">Save</button>`
  )
}

const updateGoalButtonsEventHandlers = (event) => {
  $(".cancel-update-goal").off("click").on("click", (event) => {
    cancelUpdateGoal(event)
  })
  $(".save-update-goal").off("click").on("click", (event) => {
    saveUpdateGoal(event)
  })
}

const cancelUpdateGoal = (event) => {
  $(event.target).siblings("button").hide();
  $(event.target).hide();
  $(event.target).siblings(".foods-list-item-calories").attr("contenteditable", "false");
  $(event.target).siblings(".foods-list-item-calories").removeClass("editable");
  updateGoalButton(event);
  updateGoalEventHandler();
}

const saveUpdateGoal = (event) => {
  let id = ($(event.target).parent().attr("id")).replace(/\D/g, "");
  let name = ($(event.target).siblings(".foods-list-item-name").text().replace(/\s+/g, " ").trim());
  let calories = ($(event.target).siblings(".foods-list-item-calories").text());
  utility.updateGoal(id, name, calories);
  cancelUpdateGoal(event);
}

const updateGoalButton = (event) => {
  $(event.target).parent().append(
    `<button class="round-button update-goal"></button>`
  )
}


