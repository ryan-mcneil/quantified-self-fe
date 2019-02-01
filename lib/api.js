export const postFood = (name, calories) => {
  let url = `https://quantified-self-288.herokuapp.com/api/v1/foods`
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({name: name, calories: calories})
  }
  fetch(url, options)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error({ error }))
}

export const getFoods = () => {
  let url = `https://quantified-self-288.herokuapp.com/api/v1/foods`
  return fetch(url)
    .then(response => response.json())
    .then(result => {return result;})
    .catch(error => console.error({ error }))
}