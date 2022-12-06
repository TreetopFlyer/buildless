declare namespace Store {
  type Person = { Name: string; Age: number; ID?: number };
  type State = {
    People: Array<Person>;
  };

  type ActionPersonCreate = { Key: "person-create"; Arg: Person };
  type ActionPersonDelete = { Key: "person-delete"; Arg: Person };
  type Action = ActionPersonCreate | ActionPersonDelete;

  type Reducer = (inState: State, inAction: Action) => State;
  type Binding = [state: State, dispatcher: (inAction: Action) => void];
  type Provider = (props: { children: preact.VNode }) => preact.VNode;
  type Consumer = () => Binding;
  type Context = preact.Context<Binding>;
}
