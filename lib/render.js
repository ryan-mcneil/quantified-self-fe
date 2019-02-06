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
        <button class="round-button update-food"></button>
        <button class="round-button delete-food"></button>
      </div>`
  )
}

const foodListEventHandlers = () => {
  deleteFoodEventHandler();
  updateFoodEventHandler();
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
    $(event.target).siblings("button").hide();
    $(event.target).hide();
    updateFoodButtons(event);
    updateFoodButtonsEventHandlers(event);
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
    `<button class="round-button update-food"></button>
    <button class="round-button delete-food"></button>`
  )
}

export const addFormFeedback = (text) => {
  $("#add-form-feedback").text(text)
}

export const foodsFeedback = (text) => {
  $("#foods-feedback").text(text)
}

export const removeFoodItem = (id) => {
  $(`#food-${id}`).remove();
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
}

const mealFoodList = (meal) => {
  $(`h3:contains("${meal.name}")`).parent().attr("id", `${meal.name.toLowerCase()}-${meal.id}-container`)
  meal.foods.forEach(food => {
    $(`#${meal.name.toLowerCase()}-foods`).append(
      `<div class="foods-list-item-container meal-food" id="meal-food-${food.id}">
        <div class="foods-list-item-name">
          ${food.name}
        </div>
        <div class="foods-list-item-calories">
          ${food.calories}
        </div>
        <button class="round-button delete-food"></button>
      </div>`
    )
  });
}

const mealSubtotals = (meal) => {
  let totalCalories = meal.foods.reduce((total, food) => total + food.calories, 0);
  let caloriesRemaining = meal.calorie_goal - totalCalories;

  $(`#${meal.name.toLowerCase()}-${meal.id}-container`)
    .find(".meal-total-calories-value")
    .text(totalCalories)
  $(`#${meal.name.toLowerCase()}-${meal.id}-container`)
    .find(".meal-calories-remaining-value")
    .text(caloriesRemaining)
}

const dateTotals = (meals) => {
  let totalGoalCalories = Object.keys(meals)
    .reduce((total, meal) => total + meals[meal].calorie_goal, 0);
  let totalCalories = 0

  // update goals for each meal
  Object.keys(meals).forEach(meal => {
    $(`#${meals[meal].name.toLowerCase()}-goal`).text(meals[meal].calorie_goal);
  })

  // update total calories for day
  Object.keys(meals).forEach(meal => {
    totalCalories += meals[meal].foods.reduce((total, food) => total + food.calories, 0)
  })

  // set total calories consumed, total goal calories, and total calories remaining
  $("#total-calories").text(totalCalories);
  $("#total-goal-calories").text(totalGoalCalories);
  $("#total-calories-remaining").text(totalGoalCalories - totalCalories);
}
