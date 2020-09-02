export abstract class BaseModel {
  protected assign<K extends keyof this>(
    props: Partial<Record<K, any>> | any,
    map?: Partial<Record<K, (value: any) => this[K]>>,
  ) {
    props.id = props.id ?? props._id;
    const mapValues = {} as this;

    Object.getOwnPropertyNames(this).forEach((name) => {
      const key = name as K;
      if (map && map[key]) {
        mapValues[key] = map[key]!(props[key]);
      } else {
        mapValues[key] = props[key];
      }
    });

    Object.assign(this, mapValues);
  }

  pickPayload(
    keys: (keyof this)[],
    map: { [key in keyof this]?: <T = any>(value: this[key]) => T } = {},
  ) {
    const payload: Record<string, any> = {};

    keys.forEach((key) => {
      const value = map[key]?.(this[key]) ?? this[key];
      if (value === undefined || value === null) return;
      payload[key as string] = value;
    });

    return payload;
  }

  static ObjectIDTime(id: string) {
    return new Date(parseInt(id.substring(0, 8), 16) * 1000);
  }
}
