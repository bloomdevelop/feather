import { SetStoreFunction, Store } from "solid-js/store";
import { IAppearance } from "./appearance";
import { IExperiments } from "./experiments";

interface ISettings<T> {
  store: [get: Store<T>, set: SetStoreFunction<T>];
  set(k: string, v: any): void;
  get(k: string): any;
}

interface ISettingsController {
  appearance: ISettings<IAppearance>;
  experiments: ISettings<IExperiments>;

  getAll(): object;

  sync(): Promise<void>;
}

export type { ISettings as ISetting, ISettingsController };