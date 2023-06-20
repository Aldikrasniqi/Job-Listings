/* eslint-disable no-useless-constructor */
class BaseError extends Error {
  statusCode = 400;
  name = 'BaseError';
  message = 'interval server error';
  details = {};

  constructor() {
    super();
  }
}

class EmailNotFound extends BaseError {
  statusCode = 404;
  name = 'EmailNotFound';
  message = 'Email not found';
  details = {};

  constructor() {
    super();
  }
}

class InvalidAccount extends BaseError {
  statusCode = 400;
  name = 'InvalidAccout';
  message = 'Invalid account';
  details = {};

  constructor() {
    super();
  }
}

class NotVerifiedAccount extends BaseError {
  statusCode = 400;
  name = 'NotVerifiedAccount';
  message = 'Not verified account';

  constructor() {
    super();
  }
}
class InvalidToken extends BaseError {
  statusCode = 400;
  name = 'invalid-token';
  message = 'Token is not valid';
  constructor() {
    super();
  }
}

module.exports = {
  EmailNotFound,
  InvalidAccount,
  NotVerifiedAccount,
  InvalidToken,
};
