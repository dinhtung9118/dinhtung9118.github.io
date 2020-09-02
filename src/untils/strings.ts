let { atob, btoa } = window;

declare global {
  interface String {
    decoding: string;
    encoding: string;
  }
}

Object.defineProperties(String.prototype ,{
  decoding:{
    value(){
      return atob(this)
    }
  },
  encoding: {
    value () {
      return btoa(this);
    }
  },
});

export {};
