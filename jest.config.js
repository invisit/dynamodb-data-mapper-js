const Fs = require("fs")
const Path = require("path")
const _ = global._ = require("lodash")
const {negate,flatten,isEmpty} = _
const F = require("lodash/fp")
const {ls,test} = require("shelljs")
const Prelude = global.Prelude = require("@3fv/prelude-ts")
const Guard = global.Guard = require("@3fv/guard")
const {isString} = Guard

Object.assign(global, {
  ...Prelude
})

// noinspection UnnecessaryLocalVariableJS
const
  doesntStartWith = (test) =>  F.negate(F.startsWith(test)),
  whitelistPackages = [],
  rootDir = Path.resolve(__dirname),
  packagesDir = Path.join(rootDir,'packages'),
  scriptsDir = Path.join(rootDir, "scripts"),
  isNotEmpty = negate(isEmpty),
  testRoots = [
    scriptsDir,
    ...ls(packagesDir)
    .filter(doesntStartWith("."))// && whitelistPackages.includes(file)
    .map(file => Path.join(packagesDir, file))//,"src","__tests__"
    .filter(file => test("-d", file) && isNotEmpty(file) && isString(file))
  ],
  log = console

log.info("Modules to test: ", testRoots.map(dir => Path.basename(dir.toString())))

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  projects: flatten(testRoots.map(dir => {

    const config = {
      preset: 'ts-jest',

      rootDir: dir,
      testMatch: [
        "<rootDir>/src/**/*.(spec|integ).ts",
        "<rootDir>/src/**/*(spec|integ).ts",
        "<rootDir>/tests/**/*(spec|integ).ts",
        "<rootDir>/__tests__/**/*(spec|integ).ts"
      ],
      setupFilesAfterEnv: [
        Path.join(scriptsDir,"testing","hook-after-env.js"),
      ],
      // transform: {
      //   ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform"
      // },
      moduleNameMapper: {
        "^\\@invisit\\/([a-zA-Z0-9_-])(\\/.*)?$": "<rootDir>/../$1/src/$2"
      },
      globals: {
        "ts-jest": {
          tsconfig: "<rootDir>/../../tsconfig.json",

        }
      }


    }


    return [{
      ...config,
      displayName: `${dir} >>> node`,

      //runner: '@jest-runner/electron/main',
      testEnvironment: 'node',
    }
    // ,{
    //   ...config,
    //   displayName: `${dir} >>> electron`,
    //   testMatch: ["**/src/**/__tests__/**/*.(electron).ts"],
    //   runner: '@jest-runner/electron',
    //   testEnvironment: '@jest-runner/electron/environment',
    //   testRunner: require.resolve('jest-circus/runner')
    //
    // }
    ]
  })),


}
