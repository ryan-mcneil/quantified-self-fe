import * as api from "./api"

export const addFood = (name, calories) => {
  return api.postFood(name, calories);
}
