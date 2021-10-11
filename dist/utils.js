const {MAILER_SERVICES} = require("./consts");

function tokenizeCredentials (login, password) {
  return Buffer.from(`${login}:${decodeURIComponent(password)}`).toString('base64');
}

function tryInitializeMailer (fn) {
  try {
    const result = fn();
    return {result};
  } catch (error) {
    console.error(error);
    return {error};
  }
}

async function trySendEmail (mailer, fn) {
  if (mailer.error) {
    console.error('Sending was skipped because mailer was not initialized correctly')
    return;
  }

  try {
    await fn();
  } catch (error) {
    console.error(error);
  }
}

function getMailerService ({service, error}) {
  if (service) {
    return service;
  }

  if (error.service) {
    return error.service;
  }

  return MAILER_SERVICES.DEFAULT;
}

function toArray (value) {
  return Array.isArray(value)
    ? value
    : [value];
}

module.exports = {
  tokenizeCredentials,
  tryInitializeMailer,
  trySendEmail,
  getMailerService,
  toArray,
}
