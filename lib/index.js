import * as utility from "./utility"

$(".add-food-input").keyup(enableAddFoodSubmit)

function enableAddFoodSubmit() {
  if ($("#add-food-name").val() && $("#add-food-calories").val()) {
    $("#add-food-submit").prop("disabled", false);
    document.getElementById("add-food-submit")
      .addEventListener("click", addFoodSubmitHandler);
  } else {
    $("#add-food-submit").prop("disabled", true).off("click");
  }
}

function addFoodSubmitHandler() {
  event.preventDefault();
  let name = $("#add-food-name").val();
  let calories = $("#add-food-calories").val()
  utility.addFood(name, calories)
}
