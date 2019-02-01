export const foodsList = (foods) => {
  $("#foods-list-items-container").empty();
  foods.forEach((food) => {
    $("#foods-list-items-container").append(
      `<div class="foods-list-item-container">
        <div class="foods-list-item-name">
          ${food.name}
        </div>
        <div class="foods-list-item-calories">
          ${food.calories}
        </div>
      </div>`
    )
  })
}

export const addFormFeedback = (text) => {
  $("#add-form-feedback").text(text)
}