import scss from "./styles.scss";
import * as utility from "./utility"
import * as render from "./render"

utility.getFoodList();
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
  if (Math.floor(calories) == calories && $.isNumeric(calories) && calories > 0) {
    utility.addFood(name, calories);
    $("#add-food-name").val("") 
    $("#add-food-calories").val("")
  } else {
    render.addFormFeedback(`Calories must be a positive whole number.`)
  }
}
