const axios = require('axios');
const {getMailerService, formatPayload} = require("./utils");
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
    const {service, subject, error, payload, to} = params;

    const message = error ? error.stack : '[No error]';

    return this.sendServiceMessage({
      service,
      subject,
      message,
      payload,
      to,
    });
  }

  sendServiceMessage (params) {
    return tryExecute(this, () => {
      const {service, subject, message, payload, to} = params;

      const messageText = message || '[No message]';
      const payloadText = formatPayload(payload);

      const html = `<pre>${messageText}</pre><br><pre>${payloadText}</pre>`;
      const mailerService = getMailerService({service});

      const transformedParams = {
        subject,
        html,
        service: mailerService,
        to,
      };

      return this.instance.post('/sendErrorEmail', transformedParams);
    });
  }

  validateAddress (params) {
    return tryExecute(this, () => {
      return this.instance.post('/validateEmailAddress', params);
    });
  }

  getDeniedDomains () {
    return tryExecute(this, () => {
      return this.instance.post('/getDeniedDomains');
    });
  }
}

module.exports = {Mailer, MAILER_SERVICES};
