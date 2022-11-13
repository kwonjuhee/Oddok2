class OpenviduError extends Error {
  constructor(error, userMessage) {
    super(userMessage ?? error.message);
    this.status = error.code;
  }
}

export default OpenviduError;
