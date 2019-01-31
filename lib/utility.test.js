import * as fetch from "./__mocks__/fetch"
import * as utility from "./utility"
jest.mock("./fetch");

it('should return an id', () => {
  utility.addFood("Banana", 80)
    .then(response => {
      expect(response.id).toBe(1);
      expect(fetch.postFood).toBeCalled
    })
    .catch(error => console.error({ error }))
})