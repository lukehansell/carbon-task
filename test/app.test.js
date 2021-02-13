const fs = require('fs')
const path = require('path')

const app = require('../app')

const expectedOutput = require('./fixtures/expectedOutput.json')

const sandbox = sinon.createSandbox()

beforeEach(() => {
  sandbox.stub(console, 'log')
  sandbox.stub(fs, 'writeFileSync')
})

afterEach(() => {
  sandbox.restore()
})

describe('run', () => {
  context('without a file', () => {
    it('logs to the console', () => {
      app()
      expect(console.log).to.have.been.calledWith('No file provided.')
    })

    it('does not error', () => {
      expect(() => {
        app()
      }).not.to.throw()
    })
  })

  context('with a file which does not exist', () => {
    it('logs a warning to update the user that the file does not exist', () => {
      app('../foo.json')
      expect(console.log).to.have.been.calledWith('Provided file does not exist: ../foo.json')
    })
  })

  context('when the file exists', () => {
    context('when it fails to process the file', () => {

      it('logs a warning to the user that the file is not valid', () => {
        app(path.join(__dirname, 'fixtures/invalid.json'))
        expect(console.log).to.have.been.calledWith('Error reading from file.')
      })
    })

    context('when the file does not contain a list of vulnerabilities', () => {
      it('logs the warning to the user that the file does not contain vulnerabilities', () => {
        app(path.join(__dirname, 'fixtures/noVulnerabilities.json'))
        expect(console.log).to.have.been.calledWith('No vulnerabilities data found in the file.')
      })
    })

    context('when the file is valid', () => {
      beforeEach(() => {
        app(path.join(__dirname, 'fixtures/inputFile.json'))
      })

      it('parses the file and writes the output to output.json', () => {
        expect(fs.writeFileSync).to.have.been.calledWith('output.json')
      })

      it('sends the correct information to the file', () => {
        expect(JSON.parse(fs.writeFileSync.getCall(0).args[1])).to.deep.equal(expectedOutput)
      })

      it('write a message to the user explaining where the file is', () => {
        expect(console.log).to.have.been.calledWith('Output written to output.json')
      })
    })
  })
})