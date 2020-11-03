export enum ModelStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export abstract class BaseModel {
  protected assign<K extends keyof this>(
    props: Partial<Record<K, any>> | any,
    map?: Partial<Record<K, (value: any) => this[K]>>,
  ) {
    if (!props) return;
    props.id = props.id || props._id;
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

  static statusFromBool(bool: boolean) {
    return bool ? ModelStatus.ACTIVE : ModelStatus.INACTIVE;
  }

  static statusToBool(status: ModelStatus) {
    return status === ModelStatus.ACTIVE;
  }
}
