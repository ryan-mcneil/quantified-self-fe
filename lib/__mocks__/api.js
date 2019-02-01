export const postFood = (name, calories) => {
  return Promise.resolve({ id: 1 });
}

export const getFoods = () => {
  let response = {
    body:
    [
      {
        "id": 1,
        "name": "Banana",
        "calories": 150
      },
      {
        "id": 2,
        "name": "Orange",
        "calories": 120
      },
      {
        "id": 3,
        "name": "Coffee",
        "calories": 90
      }      
    ]
  };
  return response
}