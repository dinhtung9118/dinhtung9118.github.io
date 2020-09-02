export class Completer<R = null> {
  completed = false;
  rejected = false;
  promise!: Promise<R>;

  resolve!: (value?: R | PromiseLike<R>) => void;
  reject!: (error?: any) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (value?: any) => {
        this.checkBadStack();
        this.completed = true;
        resolve(value);
      };
      this.reject = (error?: any, stackTrace?: string) => {
        this.checkBadStack();
        this.completed = true;
        this.rejected = true;
        reject(error);
      };
    });
  }

  private checkBadStack() {
    if (this.completed) {
      throw Error("Completer already completed!");
    }
  }
}
