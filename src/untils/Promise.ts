import { Completer } from "./Completer";

declare global {
  interface PromiseConstructor {
    delay<T>(mSeconds?: number, result?: T): Promise<T>;

    debounce<T = unknown>(
      time: number,
      call?: () => T,
    ): (call?: () => T) => Promise<T>;
  }
}

Promise.delay = function delay<T>(mSeconds?: number, value?: T) {
  return new Promise<T>((next) => {
    setTimeout(() => next(value), mSeconds);
  });
};
