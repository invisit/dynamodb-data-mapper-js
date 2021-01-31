/**
 * Copyright 2018-present Facebook.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @format
 */
const defaultConsoleError = console.error
const AWS = require("aws-sdk")
const _ = require("lodash")
const awsTestDDBLocalPort = process.env.DDB_LOCAL_PORT
const awsTestConfig = {
    region: (global.awsRegion = process.env.AWS_DEFAULT_REGION = "us-east-1")
  }


AWS.config.update(
  awsTestConfig
)

if (!_.isEmpty(awsTestDDBLocalPort)) {
  AWS.config.dynamodb = {
    endpoint: `http://localhost:${awsTestDDBLocalPort}`
  }
}
console.error = function (_message) {
  defaultConsoleError("console.error used in a test. This will be an error in the near future.")
  defaultConsoleError.apply(console, arguments)
}

Object.assign(global, {
  //fetch: require("jest-fetch-mock"),
  targetPlatform: "node",
  isNode: true,
  isDev: true,
  __non_webpack_require__: require
})
