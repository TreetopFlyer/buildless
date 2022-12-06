import Preact from "preact";

/** @type {Store.State} */
export const Initial = {
  People: [],
};

/** @type {Store.Reducer} */
export const Reducer = (inState, inAction) => {
  const clone = { ...inState };
  switch (inAction.Key) {
    case "person-create": {
      clone.People.push({ ...inAction.Arg, ID: new Date().getTime() });
      break;
    }
    case "person-delete": {
      for (let i = 0; i < inState.People.length; i++) {
        if (inState.People[i].ID == inAction.Arg.ID) {
          inState.People.splice(i, 1);
          break;
        }
      }
    }
  }
  return clone;
};

/** @type {Store.Context} */
const Context = Preact.createContext([Initial, (_a) => {}]);

/** @type {Store.Provider} */
export const Provider = (props) => {
  const binding = Preact.useReducer(Reducer, Initial);
  return Preact.createElement(Context.Provider, {
    value: binding,
    children: props.children,
  });
};

/** @type {Store.Consumer} */
export const Consumer = () => Preact.useContext(Context);
