import * as api from "./api"
import * as render from "./render"

export const getFoodList = () => {
  api.getFoods()
    .then(response => render.foodsList(response))
    .catch(error => console.error({ error }))
}

export const getMealFoodLists = () => {
  api.getMeals()
    .then(response => render.mealFoodList('breakfast', response.breakfast))
    .then(response => render.mealFoodList('lunch', response.lunch))
    .then(response => render.mealFoodList('dinner', response.dinner))
    .then(response => render.mealFoodList('snacks', response.snacks))
    .catch(error => console.error({ error }))
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
