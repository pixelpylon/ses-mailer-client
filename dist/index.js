const axios = require('axios');
const {getMailerService} = require("./utils");
const {MAILER_SERVICES} = require("./consts");

const {
  tokenizeCredentials,
  tryInitializeMailer,
  tryExecute,
} = require("./utils");

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
    return tryExecute(this, () => {
      return this.instance.post('/sendEmail', params);
    })
  }

  sendError (params) {
    return tryExecute(this, () => {
      const {service, subject, error, payload} = params;

      const errorText = error
        ? error.stack
        : '[No error]';

      const payloadText = payload
        ? JSON.stringify(payload, null, 2)
        : '[No payload]';

      const html = `<pre>${errorText}</pre><br><pre>${payloadText}</pre>`;
      const mailerService = getMailerService({service, error});

      const transformedParams = {
        subject,
        html,
        service: mailerService,
      };

      return this.instance.post('/sendErrorEmail', transformedParams);
    });
  }

  validateAddress (params) {
    return tryExecute(this, () => {
      return this.instance.post('/validateEmailAddress', params);
    });
  }
}

module.exports = {Mailer, MAILER_SERVICES};
