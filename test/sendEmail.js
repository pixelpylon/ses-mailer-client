const {Mailer} = require("../dist");

const test = async (mailerUrl) => {
  const mailer = new Mailer(mailerUrl);

  const result = await mailer.send({
    subject: 'Test',
    text: 'test',
    from: 'team@citytour.dev',
    to: 'polzuka@gmail.com',
    bcc: 'imyrec@gmail.com',
  })

  console.log(result);
}

if (!process.env.MAILER_URL) {
  console.log(`MAILER_URL environment variable must be passed`);
  process.exit(-1);
}

test(process.env.MAILER_URL).catch(console.error);
