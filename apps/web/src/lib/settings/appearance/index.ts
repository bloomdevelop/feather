import { createStore } from "solid-js/store";
import { ISetting } from "../ISetting";

export interface IAppearance {
  compactMode: boolean;
  test_key: string;
}

export class Appearance implements ISetting<IAppearance> {
  store = createStore<IAppearance>({
    compactMode: false,
    test_key: "s",
  });
  
  set(k: keyof IAppearance, v: IAppearance[typeof k]) {
    this.store[1](k, v);
  }

  get<T extends keyof IAppearance>(k: T): IAppearance[typeof k] {
    return this.store[0][k];
  }
}

export default Appearance;