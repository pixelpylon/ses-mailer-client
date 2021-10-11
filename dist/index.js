const axios = require('axios');
const {MAILER_SERVICES} = require("./consts");
const {
  tokenizeCredentials,
  tryInitializeMailer,
  trySendEmail,
} = require("./utils");
const {checkSendErrorEmailParams, checkSendEmailParams} = require("./checkers");
const {transformSendEmailParams, transformSendErrorEmailParams} = require("./transformers");

class Mailer {
  constructor (url) {
    const {error, result} = tryInitializeMailer(() => {
      const parsedUrl = new URL(url);
      const token = tokenizeCredentials(parsedUrl.username, parsedUrl.password);

      return axios.create({
        baseURL: `${parsedUrl.protocol}//${parsedUrl.host}`,
        headers: {Authorization: `Basic ${token}`}
      });
    });

    if (error) {
      this.error = error;
    } else {
      this.instance = result;
    }
  }

  send (params) {
    return trySendEmail(this, () => {
      checkSendEmailParams(params);
      const transformedParams = transformSendEmailParams(params);
      return this.instance.post('/sendEmail', transformedParams);
    })
  }

  sendError (params) {
    return trySendEmail(this, () => {
      checkSendErrorEmailParams(params);
      const transformedParams = transformSendErrorEmailParams(params);
      return this.instance.post('/sendErrorEmail', transformedParams);
    });
  }
}

module.exports = {Mailer, MAILER_SERVICES};
