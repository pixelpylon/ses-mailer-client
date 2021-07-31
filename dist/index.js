const axios = require('axios');
const {tokenizeCredentials, tryInitializeMailer, trySendEmail} = require("./utils");
const {checkSendErrorEmailParams, checkSendEmailParams} = require("./checkers");

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

  send ({from, to, subject, text, html}) {
    return trySendEmail(this, () => {
      checkSendEmailParams({from, to, subject, text, html});
      return this.instance.post('/sendEmail', {from, to, subject, text, html});
    })
  }

  sendError ({service, subject, error, payload}) {
    return trySendEmail(this, () => {
      checkSendErrorEmailParams({service, subject, error, payload});
      const errorText = error.stack;
      const payloadText = JSON.stringify(payload, null, 2);

      const html = payloadText
        ? `<pre>${errorText}</pre><br><pre>${payloadText}</pre>`
        : `<pre>${errorText}</pre>`;

      return this.instance.post('/sendErrorEmail', {service, subject, html});
    });
  }
}

module.exports = {Mailer};
