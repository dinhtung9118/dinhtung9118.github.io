// declare global {
// }

declare global {
  interface Math {
    range(from: number, to?: number): number;
  }
  interface Number {
    pad(width: number): string;
  }
}
declare var Math: Math;

Math.range = (from: number, to?: number) => {
  if (to === undefined) {
    to = from;
    from = 0;
  }
  return (to - from) * Math.random() + from;
};
/* eslint-disable */
Number.prototype.pad = function (width: number, z = "0") {
  const num = this.toString();
  return num.length >= width
    ? num
    : new Array(width - num.length + 1).join(z) + num;
};

export {};
