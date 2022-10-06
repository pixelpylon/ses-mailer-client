const getMailer = require("./getMailer")
const expect = require("chai").expect

describe('validateAddress()', () => {
  it('valid address', async () => {
    const result = await getMailer().validateAddress({email: 'polzuka@gmail.com'})
    expect(result).to.eql({result: ''})
  })
})
