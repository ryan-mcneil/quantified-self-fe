import * as utility from "./utility"

export const foodsList = (foods) => {
  $("#foods-list-items-container").empty();
  foods.forEach((food) => {
    addFoodItem(food.id, food.name, food.calories)
  })
  foodListEventHandlers();
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
    let name = ($(event.target).siblings(".foods-list-item-name").text());
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
  let name = ($(event.target).siblings(".foods-list-item-name").text());
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

export const foodListFeedback = (text) => {
  $("#foods-list-feedback").text(text)
}

export const removeFoodItem = (id) => {
  $(`#food-${id}`).remove();
}

