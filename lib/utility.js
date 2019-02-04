import * as api from "./api"
import * as render from "./render"

export const addToFoodList = (name, calories) => {
  api.postFood(name, calories)
    .then(response => render.addFoodItem(response.id, name, calories))
    .then(success => render.foodFeedback(`Successfully added ${name}: ${calories} calories.`))
    .catch(error => render.foodFeedback(error.message))
}

export const getFoodList = () => {
  api.getFoods()
    .then(response => render.foodsList(response))
    .catch(error => console.error({ error }))
  }

export const deleteFromFoodList = (id, name, calories) => {
  api.putFood(id, name, calories, false)
    .then(response => render.removeFoodItem(id))
    .then(success => render.foodFeedback(`Successfully deleted ${name}: ${calories} calories.`))
    .catch(error => render.foodFeedback(error.message))
}

export const updateFood = (id, name, calories) => {
  api.putFood(id, name, calories, true)
    .then(response => render.foodFeedback(`Successfully updated ${name}: ${calories} calories.`))
    .catch(error => render.foodFeedback(error.message))
}
