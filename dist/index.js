const {getMailerService, formatPayload} = require("./utils")
const {MAILER_SERVICES} = require("./consts")
const {RpcClient} = require("@exp1/back-utils")

class Mailer {
  constructor (url) {
    this.rpcClient = RpcClient.new(url)
  }

  send (params) {
    return this.rpcClient.safeCall('sendEmail', params)
  }

  sendError (params) {
    const {service, subject, error, payload, to} = params

    const message = error ? (typeof error === 'string' ? error :  error.stack) : '[No error]'

    return this.sendServiceMessage({
      service,
      subject,
      message,
      payload,
      to,
    })
  }

  sendServiceMessage (params) {
    const {service, subject, message, payload, to} = params

    const messageText = message || '[No message]'
    const payloadText = formatPayload(payload)

    const html = `<pre>${messageText}</pre><br><pre>${payloadText}</pre>`
    const mailerService = getMailerService({service})

    const transformedParams = {
      subject,
      html,
      service: mailerService,
      to,
    }

    return this.rpcClient.safeCall('sendErrorEmail', transformedParams)
  }

  validateAddress (params) {
    return this.rpcClient.safeCall('validateEmailAddress', params)
  }

  getDeniedDomains () {
    return this.rpcClient.safeCall('getDeniedDomains')
  }
}

module.exports = {Mailer, MAILER_SERVICES}
