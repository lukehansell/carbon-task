const fs = require('fs')

const { getHighestPriorities } = require('./lib/processVulnerabilities')

const getFileJSON = (filePath) => {
  if (!filePath) {
    throw new Error('No file provided.')
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Provided file does not exist: ${filePath}`)
  }

  try {
    file = fs.readFileSync(filePath)
    return JSON.parse(file)
  } catch (err) {
    throw new Error('Error reading from file.')
  }
}

const app = async (filePath) => {
  let content
  try {
    content = getFileJSON(filePath)
  } catch (err) {
    console.log(err.message)
    return
  }

  if (typeof content.vulnerabilities === 'undefined') {
    console.log('No vulnerabilities data found in the file.')
    return
  }

  result = {
    ...content,
    vulnerabilities: getHighestPriorities(content.vulnerabilities)
  }

  fs.writeFileSync('output.json', JSON.stringify(result, null, 2))
  console.log('Output written to output.json')
}



module.exports = app
