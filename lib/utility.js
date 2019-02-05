import * as api from "./api"
import * as render from "./render"

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
    .then(success => render.addFormFeedback(`Successfully added ${name}: ${calories} calories.`))
    .catch(error => render.addFormFeedback(error.message))
}

export const deleteFromFoodList = (id, name, calories) => {
  api.putFood(id, name, calories, false)
    .then(response => render.removeFoodItem(id))
    .then(success => render.foodListFeedback(`Successfully deleted ${name}: ${calories} calories.`))
    .catch(error => render.foodListFeedback(error.message))
}

export const updateFood = (id, name, calories) => {
  api.putFood(id, name, calories, true)
    .then(response => render.foodListFeedback(`Successfully updated ${name}: ${calories} calories.`))
    .catch(error => render.foodListFeedback(error.message))
}
