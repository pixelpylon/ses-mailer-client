const getMailer = require("./getMailer")
const expect = require("chai").expect

describe('getDeniedDomains()', () => {
  it('returns denied domains', async () => {
    const result = await getMailer().getDeniedDomains()
    expect(result).to.eql({
        result: [
          "tripadvisor.com",
          "getyourguide.com"
        ]
    })
  })
})
