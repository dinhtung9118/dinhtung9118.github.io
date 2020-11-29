let { atob, btoa } = window;

declare global {
  interface String {
    decoding: string;
    encoding: string;
  }
}

// eslint-disable-next-line no-extend-native
Object.defineProperties(String.prototype, {
  decoding: {
    value() {
      return atob(this);
    },
  },
  encoding: {
    value() {
      return btoa(this);
    },
  },
});

export {};
