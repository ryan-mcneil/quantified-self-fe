import * as api from "./api"
import * as render from "./render"

export const loadPage = () => {
  setDefaultDate();
  getFoodList();
  getMealFoodLists($("#alternate-date").val());
  enableDatepicker();
  $(".add-food-input").keyup(event => enableAddFoodSubmit(event));
}

const enableAddFoodSubmit = (event) => {
  $("#add-food-submit").off("click");
  if ($("#add-food-name").val() && $("#add-food-calories").val()) {
    $("#add-food-submit").prop("disabled", false);
    $("#add-food-submit").on("click", addFoodSubmitHandler)
  } else {
    $("#add-food-submit").prop("disabled", true);
    $("#add-food-submit").off("click");
  }
}

const addFoodSubmitHandler = () => {
  event.preventDefault();
  let name = $("#add-food-name").val();
  let calories = $("#add-food-calories").val();
  if (Math.floor(calories) == calories && $.isNumeric(calories) && calories > 0) {
    utility.addToFoodList(name, calories);
    $("#add-food-name").val("")
    $("#add-food-calories").val("")
  } else {
    render.foodsFeedback(`Calories must be a positive whole number.`)
  }
}

const enableDatepicker = () => {
  $("#datepicker").datepicker({
    dateFormat: 'MM dd, yy',
    altField: "#alternate-date",
    altFormat: "yy-mm-dd",
    onSelect: () => {
      getMealFoodLists($("#alternate-date").val());
    }
  });
}

export const getFoodList = () => {
  api.getFoods()
    .then(response => render.foodsList(response))
    .catch(error => console.error({ error }))
}

export const getMealFoodLists = (date) => {
  api.getMeals()
    .then(response => {
      let mealsForDate = {
        breakfast: getMeal(response, date, "Breakfast"),
        lunch: getMeal(response, date, "Lunch"),
        dinner: getMeal(response, date, "Dinner"),
        snack: getMeal(response, date, "Snack")
      }
      render.meals(mealsForDate);
    })
    .catch(error => console.error({ error }))
}

export const getMeal = (meals, date, meal) => {
  let result = meals.find(obj => {
    return obj.date.substring(0,10) == date && obj.name == meal
  })
  return result
}

export const addToFoodList = (name, calories) => {
  api.postFood(name, calories)
    .then(response => render.addFoodItem(response.id, name, calories))
    .then(success => render.foodsFeedback(`Successfully added ${name}: ${calories} calories.`))
    .catch(error => render.foodsFeedback(error.message))
}

export const deleteFromFoodList = (id, name, calories) => {
  api.deleteFood(id)
    .then(response => render.removeFoodItem(id))
    .then(success => render.foodsFeedback(`Successfully deleted ${name}: ${calories} calories.`))
    .catch(error => render.foodsFeedback(error.message))
}

export const updateFood = (id, name, calories) => {
  api.putFood(id, name, calories)
    .then(response => render.foodsFeedback(`Successfully updated ${name}: ${calories} calories.`))
    .catch(error => render.foodsFeedback(error.message))
}

export const setDefaultDate = () => {
  let today = new Date();
  let month = today.toLocaleString('en-us', { month: 'long' });
  let date = month + " " + today.getDate() + ", " + today.getFullYear();

  $("#datepicker").val(date)
  $("#alternate-date").val(dateToString(today))
}

export const dateToString = (date) => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
