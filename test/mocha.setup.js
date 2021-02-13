global.chai = require('chai')
global.sinon = require('sinon')

const sinonChai = require('sinon-chai')

global.expect = chai.expect

global.chai.use(sinonChai)
