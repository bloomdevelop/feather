import { createStore } from "solid-js/store";
import { ISetting } from "../ISetting";

export interface IExperiments {
  ai: boolean;
  aiAPIKey: string;
  aiSystemInstructions: string;
  aiModel:
    | "gemini-1.0-pro"
    | "gemini-1.5-pro"
    | "gemini-1.5-flash"
    | "gemma-2-9b-it"
    | "gemma-2-27b-it";
  reactions: boolean;
}

export class Experiments implements ISetting<IExperiments> {
  store = createStore<IExperiments>({
    ai: false,
    aiAPIKey: "",
    aiSystemInstructions: "",
    aiModel: "gemini-1.5-pro",
    reactions: false,
  });

  set(k: keyof IExperiments, v: IExperiments[typeof k]) {
    this.store[1](k, v);
  }

  get<T extends keyof IExperiments>(k: T): IExperiments[typeof k] {
    return this.store[0][k];
  }
}

export default Experiments;
