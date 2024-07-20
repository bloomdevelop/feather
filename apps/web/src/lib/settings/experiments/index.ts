import { createStore } from "solid-js/store";
import { ISetting } from "../ISetting";

export interface IExperiments {
  ai: boolean,
  aiAPIKey: string,
}

export class Experiments implements ISetting<IExperiments> {
  store = createStore<IExperiments>({
    ai: false,
    aiAPIKey: "",
  });

  set(k: keyof IExperiments, v: IExperiments[typeof k]) {
    this.store[1](k, v);
  }

  get<T extends keyof IExperiments>(k: T): IExperiments[typeof k] {
    return this.store[0][k];
  }
}

export default Experiments;
