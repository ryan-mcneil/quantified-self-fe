import * as utility from "./utility"

$(".add-food-input").keyup(event => enableAddFoodSubmit(event))

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
  utility.addFood(name, calories);
}
