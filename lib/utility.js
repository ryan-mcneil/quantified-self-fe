import * as api from "./api"
import * as render from "./render"

export const addFood = (name, calories) => {
  api.postFood(name, calories)
    .then(response => getFoodList())
    .then(success => render.addFormFeedback(`Successfully added ${name}: ${calories} calories.`))
    .catch(error => render.addFormFeedback(error.message))
}

export const getFoodList = () => {
  api.getFoods()
    .then(response => render.foodsList(response))
    .catch(error => console.error({ error }))
  }
