import Appearance from "./appearance";
import Experiments from "./experiments";
import General from "./general";
import { ISettingsController } from "./ISetting";

class SettingsController implements ISettingsController {
  appearance = new Appearance();
  experiments = new Experiments();
  general = new General();

  getAll() {
    return {
      appearance: this.appearance.store[0],
      experiments: this.experiments.store[0],
      general: this.general.store[0]
    };
  }

  sync() {
    // TODO: Client Sync
    return Promise.resolve();
  }
}

export default SettingsController;