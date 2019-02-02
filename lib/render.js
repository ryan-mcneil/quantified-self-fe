import * as utility from "./utility"

export const foodsList = (foods) => {
  $("#foods-list-items-container").empty();
  foods.forEach((food) => {
    addFoodItem(food.id, food.name, food.calories)
  })
  foodListEventHandlers();
}

const foodListEventHandlers = () => {
  deleteFoodEventHandler();
}

const deleteFoodEventHandler = () => {
  $(".delete-food").on("click", (event) => {
    let id = ($(event.target).parent().attr("id")).replace("food-", "");
    let name = ($(event.target).siblings(".foods-list-item-name").text());
    let calories = ($(event.target).siblings(".foods-list-item-calories").text());
    utility.deleteFromFoodList(id, name, calories);
    })
}

export const addFormFeedback = (text) => {
  $("#add-form-feedback").text(text)
}

export const foodListFeedback = (text) => {
  $("#foods-list-feedback").text(text)
}

export const removeFoodItem = (id) => {
  $(`#food-${id}`).remove();
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
        <button class="delete-food"></button>
      </div>`
  )
}

