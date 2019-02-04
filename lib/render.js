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
  foods.forEach((food) => { addFoodItem(food.id, food.name, food.calories) })
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
          <option id="select-snacks">Snacks</option>
        </select>
        <button class="round-button update-food"></button>
        <button class="round-button delete-food"></button>
      </div>`
  )
}

const foodListEventHandlers = () => {
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
      <option id="select-snacks">Snacks</option>
    </select>
    <button class="round-button update-food"></button>
    <button class="round-button delete-food"></button>`
  )
}

export const foodFeedback = (text) => {
  $("#food-feedback").text(text)
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
  $(event.target).siblings("button, select").hide();
  $(event.target).hide();
  foodListButtons(event);
  foodListEventHandlers();
}

const saveAddToMeal = (event) => {
  let meal = $(event.target).val();
  let foodId = ($(event.target).parent().attr("id")).replace("food-", "");
  // let mealId = getMealId(meal)
  // if no mealId, POST meals with currentDate() and meal
  // .then(response => POST meal_foods with response.id and foodId)
  // else POST meal_foods with mealId and foodId
  // addFoodToMealFoodList()
  cancelAddToMeal(event);
}

// const getMealId = (meal) => {
//   get id from meal container where name=meal
// }

// const currentDate = () => {
//   get text from date container
//   convert date to string per BE requirements
// }