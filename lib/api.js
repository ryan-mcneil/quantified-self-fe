export const postFood = (name, calories) => {
  let url = `https://quantified-self-288.herokuapp.com/api/v1/foods`
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({food: {name: name, calories: calories}})
  }
  return fetch(url, options)
    .then(response => response.json())
    .then(result => { return result;} )
    .catch(error => console.error({ error }))
}

export const getFoods = () => {
  let url = `https://quantified-self-288.herokuapp.com/api/v1/foods`
  return fetch(url)
    .then(response => response.json())
    .then(result => {return result;})
    .catch(error => console.error({ error }))
}

export const deleteFood = (id) => {
  let url = `https://quantified-self-288.herokuapp.com/api/v1/foods/${id}`
  let options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  }
  return fetch(url, options)
    .then(response => { return response; })
    .catch(error => console.error({ error }))
}

export const putFood = (id, name, calories, active) => {
  let url = `https://quantified-self-288.herokuapp.com/api/v1/foods/${id}`
  let options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ food: { name: name, calories: calories, active: active } })
  }
  return fetch(url, options)
    .then(response => response.json())
    .then(result => { return result; })
    .catch(error => console.error({ error }))

}

