const getMailer = require("./getMailer")
const {MAILER_SERVICES} = require("../dist")
const expect = require("chai").expect

describe('sendError()', () => {
  it('sends error', async () => {
    const result = await getMailer().sendError({
      subject: 'Error',
      payload: {payload: 'payload'},
      error: new Error('Error'),
      service: MAILER_SERVICES.CALENDAR,
    })
    expect(result).to.eql({result: {}})
  })
})
