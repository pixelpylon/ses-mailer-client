function getMailerService({ service, error }) {
  if (service) {
    return service;
  }

  if (error && error.service) {
    return error.service;
  }

  return "default";
}

function formatPayload(payload) {
  if (!payload) {
    return "[No payload]";
  }

  return typeof payload === "string"
    ? payload
    : JSON.stringify(payload, null, 2);
}

module.exports = {
  getMailerService,
  formatPayload,
};
