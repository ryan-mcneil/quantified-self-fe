import * as api from "./api"
import * as render from "./render"

export const addFood = (name, calories) => {
  return api.postFood(name, calories);
}

export const getFoods = (name, calories) => {
  api.getFoods()
    .then(response => render.foodsList(response))
  }
