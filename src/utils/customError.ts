class CustomError extends Error {
  status = 400;

  constructor(status: number, message: string) {
    super(message)    //calls the constructor of the Error class

    this.status = status;

    // because we are extending a built-in class. Changes/Sets the prototype of this to CustomError.prototype
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.message;
  }
}

export const createCustomError = (status: number, message: string) => {
  const err = new CustomError(status, message);
  err.status = status;
  err.message = message;
  return err;
};
