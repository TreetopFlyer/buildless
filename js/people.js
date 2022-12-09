import Preact from "preact";
import { html } from "htm";
import { Consumer } from "./store.js";

/** @typedef {(e:SubmitEvent|Event)=>void|null} handler */

/** @type {(props:{person:Store.Person })=>preact.VNode} */
const Person = (props) => {
  const [, dispatch] = Consumer();

  /** @type {handler} */ const handleClick = () => {
    dispatch({ Key: "person-delete", Arg: props.person });
  };

  return html`
    <div class="flex font-sans gap-5">
        <button class="w-8 h-8 text(white xs) font-black bg-red-500 rounded-lg" onClick=${handleClick}>X</button>
        <span class="w-36">${props.person.Name}</span>
        <span class="w-12">${props.person.Age}</span>
    </div>`;
};

/** @type {()=>preact.VNode} */
const PersonTable = () => {
  const [state] = Consumer();
  return html`<h3 class="text-lg font-sans mb-3">People</h3>
  <div class="p-4">
    ${
    state.People.length > 0
      ? html`
      <div class="flex flex-col gap-5">
        <div class="flex font-sans text(xs gray-500) gap-5">
          <span class="w-8">Delete</span>
          <span class="w-36">Name</span>
          <span class="w-12">Age</span>
        </div>
        ${state.People.map((p) => html`<${Person} person=${p}/>`)}
      </div>`
      : html`
      <p class="text(sm gray-500) italic font-sans">No people created</p>
      `
  }</div>`;
};

/** @type {()=>preact.VNode} */
const PersonForm = () => {
  const [, dispatch] = Consumer();
  const [nameGet, nameSet] = Preact.useState("default name");
  const [ageGet, ageSet] = Preact.useState(21);

  /** @type {handler} */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ Key: "person-create", Arg: { Name: nameGet, Age: ageGet } });
  };

  /** @type {handler} */
  const handleName = (e) => {
    e.target && nameSet(/** @type {HTMLInputElement}*/ (e.target).value);
  };

  /** @type {handler} */
  const handleAge = (e) => {
    e.target &&
      ageSet(parseInt(/** @type {HTMLInputElement}*/ (e.target).value));
  };

  return html`
  <h3 class="text-lg font-sans">Add Person</h3>
  <form onSubmit=${handleSubmit} class="p-4 font-sans flex items-end">
    <span>
      <label for="name" class="block text-xs">Name</label>
      <input class="bg-gray-100 p-2 mr-2 rounded-lg" type="text"   value=${nameGet} onInput=${handleName}/>
    </span>
    <span>
      <label for="name" class="block text-xs">Age</label>
      <input class="bg-gray-100 p-2 mr-2 rounded-lg" type="number" value=${ageGet}  onInput=${handleAge} min="0" max="111"/>
    </span>
    <button class="p-2 rounded-lg text-white bg-blue-700">Create</button>
  </form>`;
};

/** @type {()=>preact.VNode} */
export default () => {
  return html`
    <div>
      <h2 class="pb-2 mb-2 border-b text-2xl font-sans border(">Person Records</h2>
      <div class="px-2">
        <${PersonForm}/>
        <${PersonTable}/>
      </div>
    </div>`;
};
