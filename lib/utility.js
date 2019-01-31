import * as fetch from "./fetch"

function addFood(name, calories) {
  return fetch.postFood(name, calories);
}

module.exports = {
  addFood: addFood
}