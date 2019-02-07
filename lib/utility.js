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
    addToFoodList(name, calories);
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
  $(".meal-container").removeAttr("id");
  api.getMeals()
    .then(response => {
      let mealsForDate = [
        getMeal(response, date, "Breakfast"),
        getMeal(response, date, "Lunch"),
        getMeal(response, date, "Dinner"),
        getMeal(response, date, "Snack")
      ]
      let meals = filterUndefinedMeals(mealsForDate)
      api.getGoals()
        .then(response => render.meals(meals, response)) 
      ;
    })
    .catch(error => console.error({ error }));
}

export const getMeal = (meals, date, mealName) => {
  let result = meals.find(meal => {
    return meal.date.substring(0,10) == date && meal.name == mealName
  })
  return result
}

const filterUndefinedMeals = (meals) => {
  return meals.filter(meal => {
    return meal !== undefined
  })
}

export const addToFoodList = (name, calories) => {
  api.postFood(name, calories)
    .then(response => {
      render.addFoodItem(response.id, name, calories);
      render.foodListEventHandlers();
    })
    .then(success => render.foodsFeedback(`Successfully added ${name}: ${calories} calories.`))
    .catch(error => render.foodsFeedback(error.message))
}

export const deleteFromFoodList = (id, name, calories) => {
  api.putFood(id, name, calories, false)
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

export const addFoodToMeal = (meal, food) => {
  if(meal.id && food.id) {
    api.postMealFoods(meal.id, food.id)
      .then(response => {
        getMealFoodLists($("#alternate-date").val());
        render.foodsFeedback(response.message);
      })
      .catch(error => render.foodsFeedback(error.message));
  } else {
    addMealToCurrentDate(meal)
      .then(response => api.postMealFoods(response.id, food.id))
      .then(response => { 
        getMealFoodLists($("#alternate-date").val());
        render.foodsFeedback(response.message) 
      })
      .catch(error => render.foodsFeedback(error.message));
  }
}

const addMealToCurrentDate = (meal) => {
  let date = $("#alternate-date").val();
  return api.postMeals(meal.name, date)
    .then(response => {
      getMealFoodLists($("#alternate-date").val());
      return response;
    })
    .catch(error => render.foodsFeedback(error.message));
}

export const getMealId = (mealName) => {
  // get id from meal container where name=mealName
  let mealContainerId = $(`h3:contains("${mealName}")`).parent().attr("id");
  if (mealContainerId) {
    return mealContainerId.replace(`${mealName}-`, "");
  } else {
    return null;
  }
}

export const deleteFromMealFoodsList = (meal, food) => {
  api.deleteMealsFood(meal.id, food.id)
    .then(response => getMealFoodLists($("#alternate-date").val()))
    .then(success => render.foodsFeedback(`Successfully deleted ${food.name} from ${meal.name}`))
    .catch(error => render.foodsFeedback(error.message))
}

export const updateGoal = (id, name, calories) => {
  api.putGoal(id, name, calories)
    .then(response => {
      render.foodsFeedback(`Successfully updated ${name} goal: ${calories} calories.`);
    })
    .catch(error => render.foodsFeedback(error.message))
}
