import { Completer } from "./Completer";

declare global {
  interface PromiseConstructor {
    delay<T>(mSeconds?: number, result?: T): Promise<T>;

    debounce<T = unknown>(
      time: number,
      call?: () => T,
    ): (call?: () => T) => void;
  }
}

Promise.delay = function delay<T>(mSeconds?: number, value?: T) {
  return new Promise<T>((next) => {
    setTimeout(() => next(value), mSeconds);
  });
};

Promise.debounce = function debounce<T = unknown>(
  time: number,
  gCall?: () => T,
) {
  let completer: Completer<T>;
  let timeout: NodeJS.Timeout;

  return (call?: () => T) => {
    if (completer?.completed !== false) {
      completer = new Completer<T>();
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      completer.resolve((call || gCall)?.());
    }, time);
  };
};

export {};
