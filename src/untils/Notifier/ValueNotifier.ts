import { ChangeNotifier, ValueListenable } from "./ChangeNotifier";

export class ValueNotifier<T = any> extends ChangeNotifier
  implements ValueListenable<T> {
  constructor(protected $value: T) {
    super();
  }

  get value(): T {
    return this.$value;
  }

  set value(value) {
    if (this.$value !== value) {
      this.$value = value;
      this.notify();
    }
  }
}
