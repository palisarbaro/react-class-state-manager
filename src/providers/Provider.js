import { UseExampleState } from "../hooks/UseExampleState";
import { makeStateProvider } from "../common/utils/class_state_heplers";

export const [ctx, Provider] = makeStateProvider(()=>new UseExampleState())