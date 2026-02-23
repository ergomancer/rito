class ExtendedError extends Error {
  statusCode: number;

  constructor(status: number, name: string, message: string) {
    super(message);
    this.statusCode = status;
    this.name = name;
  }
}

export type { ExtendedError };

export const DatabaseError = new ExtendedError(
  500,
  "InternalServerError",
  "Could not process request!",
);

export const UsernameTaken = new ExtendedError(
  400,
  "UsernameTaken",
  "The username is already taken!",
);

export const NotFound = new ExtendedError(
  404,
  "NotFound",
  "The request resource does not exist!",
);

export const InvalidData = new ExtendedError(
  400,
  "InvalidData",
  "Cannot create user with invalid data!",
);

export const NotAuthenticated = new ExtendedError(
  401,
  "NotAuthenticated",
  "You need to log-in with valid credentials to proceed!",
);
