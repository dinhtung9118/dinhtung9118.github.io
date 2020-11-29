declare global {
  interface Array<T> {
    remove(item: T): number;
    seperate<S>(seperate: S | ((index: number) => S)): (T | S)[];
    readonly first: T;
    readonly last: T;
  }
}
/* eslint-disable */
Object.defineProperties(Array.prototype, {
  remove: {
    value(item: unknown) {
      const index = this.indexOf(item);
      this.splice(index, 1);
      return index;
    },
  },
  seperate: {
    value(seperate: unknown) {
      const arr: unknown[] = [];
      const call = seperate instanceof Function ? seperate : () => seperate;
      for (let i = 0; i < this.length - 1; i++) {
        arr.push(this[i]);
        arr.push(call(i));
      }

      this.length && arr.push(this.last);

      return arr;
    },
  },
  first: {
    get() {
      return this[0];
    },
  },
  last: {
    get() {
      return this[this.length - 1];
    },
  },
});

export {};
