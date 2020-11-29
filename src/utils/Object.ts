declare global {
  interface ObjectConstructor {
    isEmpty<T extends object>(obj: T): boolean;
    map<T, O>(
      o: Record<string, T>,
      callBack: (v: T, k: string) => O,
    ): Record<string, O>;
  }
}

Object.assign(Object, {
  isEmpty<T extends object>(obj: T) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  },
  map<Out extends Record<keyof In, any>, In extends object>(
    obj: In,
    callBack: <O, V>(value: V, key: keyof In) => O,
  ): Out {
    const out = {} as Out;

    Object.entries(obj).forEach(([key, value]) => {
      const k = key as keyof In;
      out[k] = callBack(value, k);
    });

    return out;
  },
});

export {};
