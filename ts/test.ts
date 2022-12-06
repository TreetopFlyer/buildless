import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import * as Store from "../js/store.js";

Deno.test("Check Reducer", async (test) => {
  let state = Store.Initial;

  await test.step({
    name: "Initial Conditions",
    fn: () => {
      assertEquals(state.People.length, 0, "initial conditions");
    },
  });

  await test.step({
    name: "Person Created",
    fn: () => {
      state = Store.Reducer(state, {
        Key: "person-create",
        Arg: { Name: "Test", Age: 100 },
      });
      assertEquals(state.People.length, 1, "Person Added");

      const person = state.People[0];
      assertEquals(person.Name, "Test", "Name set correctly");
      assertEquals(person.Age, 100, "Age set correctly");
      assertEquals(person.ID && person.ID > 0, true, "has ID");
    },
  });

  await test.step("Person Deleted", () => {
    state = Store.Reducer(state, {
      Key: "person-delete",
      Arg: state.People[0],
    });
    assertEquals(state.People.length, 0, "Person Removed");
  });
});
