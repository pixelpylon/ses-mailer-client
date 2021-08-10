function checkSendEmailParams ({from, to, subject, text, html}) {
  if (!subject) {
    throw new Error(`Mandatory parameter 'subject' is not passed`);
  }

  if (!html && !text) {
    throw new Error(`Must pass parameter 'html' or 'text'`);
  }

  if (!to) {
    throw new Error(`Mandatory parameter 'to' is not passed`);
  }

  if (!from) {
    throw new Error(`Mandatory parameter 'from' is not passed`);
  }
}

function checkSendErrorEmailParams ({service, subject, error, payload}) {
  if (!error) {
    throw new Error(`Mandatory parameter 'error' is not passed`);
  }

  if (!subject) {
    throw new Error(`Mandatory parameter 'subject' not passed`);
  }
}

module.exports = {
  checkSendEmailParams,
  checkSendErrorEmailParams,
}
