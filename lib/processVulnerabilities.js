const severityPriorityOrder = ['info', 'low', 'moderate', 'high', 'critical']

const getHighestPriorities = (vulnerabilities) => {
  vulnerabilityNames = Object.keys(vulnerabilities)
  if (vulnerabilityNames.length <= 1) return vulnerabilities

  return vulnerabilityNames.reduce((acc, key) => {
    const vulnerability = vulnerabilities[key]
    vulnerabilityPriority = severityPriorityOrder.indexOf(vulnerability.severity)

    if (vulnerabilityPriority === acc.currentHighestPriority) {
      return {
        ...acc,
        result: {
          ...acc.result,
          [key]: vulnerability
        }
      }
    }

    if (vulnerabilityPriority > acc.currentHighestPriority ) {
      return {
        currentHighestPriority: vulnerabilityPriority,
        result: {
          [key]: vulnerability
        }
      }
    }

    return acc
  }, {
    currentHighestPriority: -1,
    result: {}
  }).result
}

module.exports = {
  getHighestPriorities
}
