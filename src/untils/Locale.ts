export class Locale {
  constructor(props: Omit<Locale, "code">) {
    Object.assign(this, props);
  }

  title!: string;
  language!: string;
  country!: string;

  get code() {
    return `${this.language}-${this.country}`;
  }

  static parse(code: string, title: string = "") {
    const split = code.split("-");
    return new Locale({
      title,
      language: split[0],
      country: split[1],
    });
  }

  static system() {
    return Locale.parse(navigator.language, "System");
  }
}
