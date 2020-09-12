export interface Listenable {
  readonly closed: boolean;
  readonly hasListener: boolean;
  listen(listener: () => void): () => void;
  close: () => void;
}

export interface ValueListenable<T> extends Listenable {
  readonly value: T;
}

export class ChangeNotifier implements Listenable {
  private $listeners: (() => void)[] = [];
  private $closed = false;
  get closed() {
    return this.$closed;
  }
  get hasListener() {
    this.$debugClose();
    return !!this.$listeners.length;
  }

  protected notify() {
    this.$debugClose();
    const listeners = this.$listeners.slice();
    listeners.forEach((listener) => listener.call(this));
  }

  listen(listener: () => void): () => void {
    this.$debugClose();
    const { $listeners } = this;

    $listeners.push(listener);

    return () => $listeners.remove(listener);
  }

  close() {
    this.$debugClose();
    this.$listeners = [];
    this.$closed = false;
  }

  private $debugClose() {
    if (this.$closed) throw Error("ChangeNotifier has closed");
  }
}
