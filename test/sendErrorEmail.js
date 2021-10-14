const {MAILER_SERVICES} = require("../dist");
const {Mailer} = require("../dist");

const test = async (mailerUrl) => {
  const mailer = new Mailer(mailerUrl);

  const result = await mailer.sendError({
    subject: 'Error',
    payload: {payload: 'payload'},
    error: new Error('Error'),
    service: MAILER_SERVICES.CALENDAR,
  })

  console.log(result);
}

if (!process.env.MAILER_URL) {
  console.log(`MAILER_URL environment variable must be passed`);
  process.exit(-1);
}

test(process.env.MAILER_URL).catch(console.error);
