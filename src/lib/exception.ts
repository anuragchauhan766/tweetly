export class AuthRequiredError extends Error {
  constructor(message = "You must be sign in to access this Resource") {
    super(message);
    this.name = "Unauthorized";
  }
}
