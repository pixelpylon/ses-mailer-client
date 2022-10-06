const {Mailer} = require("../dist")

const MAILER_URL = 'https://Farid:S(ZQH%7B7%25mnXs%24%22Y%24@us-central1-sesmailer-a16cc.cloudfunctions.net'

const getMailer = () => {
    return new Mailer(MAILER_URL)
}

module.exports = getMailer
