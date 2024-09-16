import { TState } from "@/schemas/StateSchema";

const formatStates = (states: TState[]) => {
  return states.map((state) => ({
    value: state.state_code,
    label: state.name,
  }));
};

export default formatStates;