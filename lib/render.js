export const foodsList = (foods) => {
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