const getMailer = require("./getMailer");
const expect = require("chai").expect;

describe("sendError()", () => {
  it("sends error", async () => {
    const result = await getMailer().sendError({
      subject: "Error",
      payload: { payload: "payload" },
      error: new Error("Error"),
      service: "calendar",
    });
    expect(result).to.eql({ result: {} });
  });
});
