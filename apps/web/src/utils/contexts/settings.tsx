import { createContext } from "solid-js";
import SettingsController from "../settings/Controller";

interface ISettingsContext {
  settings: SettingsController;
}

const SettingsContext = createContext<ISettingsContext>();

function SettingsProvider(props: any) {
  const settings = new SettingsController();

  return (
    <SettingsContext.Provider value={{ settings }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
