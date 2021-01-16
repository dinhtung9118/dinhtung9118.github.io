import {
  ChangeNotifier,
  ValueListenable,
} from "utils/Notifier/ChangeNotifier";
import { useValueChanged } from "utils/Hooks";

class ConnectNotifier
  extends ChangeNotifier
  implements ValueListenable<boolean> {
  constructor() {
    super();
    window.addEventListener("online", this._onlineListener);
    window.addEventListener("offline", this._onlineListener);
  }

  close() {
    window.removeEventListener("online", this._onlineListener);
    window.removeEventListener("offline", this._onlineListener);
    super.close();
  }

  // tslint:disable-next-line:variable-name
  private _onlineListener = () => {
    if (this._value !== navigator.onLine) {
      this._value = navigator.onLine;
      this.notify();
    }
  };

  // tslint:disable-next-line:variable-name
  _value = navigator.onLine;
  get value() {
    return this._value;
  }
}

export const connectNotifier = new ConnectNotifier();

export const useConnection = () => useValueChanged(connectNotifier);
