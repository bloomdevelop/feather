import { createStore } from "solid-js/store";
import { ISetting } from "../ISetting";

export interface IGeneral {
  debugMode: boolean;
}

export class General implements ISetting<IGeneral> {
  store = createStore<IGeneral>({
    debugMode: false,
  });

  set(k: keyof IGeneral, v: IGeneral[typeof k]) {
    this.store[1](k, v);
  }

  get<T extends keyof IGeneral>(k: T): IGeneral[typeof k] {
    return this.store[0][k];
  }
}

export default General;
