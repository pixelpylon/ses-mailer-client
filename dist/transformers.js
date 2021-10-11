const {getMailerService, toArray} = require("./utils");

function transformSendEmailParams ({from, to, subject, text, html, replyTo}) {
  return {
    from,
    to: toArray(to),
    subject,
    text,
    html,
    replyTo: toArray(to),
  };
}

function transformSendErrorEmailParams ({service, subject, error, payload}) {
  const errorText = error.stack;
  const payloadText = payload
    ? JSON.stringify(payload, null, 2)
    : '[No payload]';

  const html = `<pre>${errorText}</pre><br><pre>${payloadText}</pre>`;
  const mailerService = getMailerService({service, error});

  return {
    service: mailerService,
    subject,
    html,
  };
}

module.exports = {
  transformSendEmailParams,
  transformSendErrorEmailParams,
}