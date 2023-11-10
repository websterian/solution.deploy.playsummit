const slsHttp = require('serverless-http');
const { ServerResponse } = require('http');
const nextHandler = require('./___next_launcher.cjs');

const getErrMessage = (e) => ({ message: 'Server failed to respond.', details: e });

const server = slsHttp(async (req, res) => {
  try {
    await nextHandler(req, res);
  } catch (e) {
    // Log into Cloudwatch for easier debugging.
    console.error('NextJS request failed due to:');
    console.error(e);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(getErrMessage(e), null, 3));
  }
}, {
  // We have a separate function for handling images. Assets are handled by S3.
  binary: true,
  provider: 'aws',
  basePath: process.env.NEXTJS_LAMBDA_BASE_PATH,
  request: (request) => {
    /*
      See following for more details:
      https://github.com/jetbridge/cdk-nextjs/pull/33/files
      https://github.com/dougmoscrop/serverless-http/issues/227
    */
    delete request.body;
  },
});

exports.handler = server;

