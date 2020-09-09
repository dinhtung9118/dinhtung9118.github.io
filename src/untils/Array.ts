declare global {
  interface Array<T> {
    remove(item: T): number;
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
