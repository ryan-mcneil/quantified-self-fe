import * as utility from "./utility"
import * as api from "./api"

jest.mock("./api");

it('should return an id', () => {
  utility.addFood("Banana", 80)
    .then(response => {
      expect(response.id).toBe(1);
      expect(api.postFood).toBeCalled
    })
    .catch(error => console.error({ error }))
})