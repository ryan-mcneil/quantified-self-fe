import * as api from "./api"
import * as render from "./render"

export const addFood = (name, calories) => {
  return api.postFood(name, calories);
}

export const getFoodList = () => {
  return api.getFoods()
    .then(response => render.foodsList(response))
    .catch(error => console.error({ error }))
  }
