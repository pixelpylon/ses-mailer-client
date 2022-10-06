const getMailer = require("./getMailer")
const expect = require("chai").expect

describe('sendEmail()', () => {
  it('send email', async () => {
    const result = await getMailer().send({
      subject: 'Test',
      text: 'test',
      from: 'team@citytour.dev',
      to: 'polzuka@gmail.com',
      bcc: 'imyrec@gmail.com',
    })
    expect(result).to.eql({result: {}})
  })
})
