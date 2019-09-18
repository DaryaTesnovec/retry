export default class Retry {
  private retries = 1;
  private currentTry = 0;
  private errorHandler: Function = (err: string) => {};

  constructor(retries: number) {
    this.retries = retries;
  }

  public setErrorHandler(fn: Function) {
    this.errorHandler = fn;
    return this;
  }

  public async start(fn: Function) {
    while (this.currentTry < this.retries) {
      try {
        return await fn(this.currentTry++);
      } catch (e) {
        this.errorHandler(e);
        if (this.currentTry === this.retries) {
          throw e;
        }
      }
    }
  }
}
