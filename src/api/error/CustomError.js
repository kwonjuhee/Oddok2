class CustomError extends Error {
  constructor(userMessage, action) {
    super(userMessage);
    this.action = action;
  }
}

export default CustomError;
