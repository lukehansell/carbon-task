const severityPriorityOrder = ['info', 'low', 'moderate', 'high', 'critical']

const reduceVulnerabilitiesBySeverity = (vulnerabilities, { hideFixAvailable }) => ((acc, key) => {
  const vulnerability = vulnerabilities[key]
  vulnerabilitySeverity = severityPriorityOrder.indexOf(vulnerability.severity)

  if (hideFixAvailable && vulnerability.fixAvailable === true) return acc

  if (Object.keys(acc).length == 0) {
    return {
      [key]: vulnerability
    }
  }

  const currentFirstVulnerability = acc[Object.keys(acc)[0]]
  const currentHighestSeverity = severityPriorityOrder.indexOf(currentFirstVulnerability.severity)

  // if the current vulnerability is the same priority as the existing list of vulnerabilities
  // then add the vulnerability to the output
  if (vulnerabilitySeverity === currentHighestSeverity) {
    return {
      ...acc,
      [key]: vulnerability
    }
  }

  // if the current vulnerability is higher priority than the existing list of vulnerabilites
  // then replace the result
  if (vulnerabilitySeverity > currentHighestSeverity) {
    return {
      [key]: vulnerability
    }
  }

  return acc
})

const getHighestPriorities = (vulnerabilities, {
  hideFixAvailable = false
} = {}) => {
  vulnerabilityNames = Object.keys(vulnerabilities)

  return vulnerabilityNames.reduce(reduceVulnerabilitiesBySeverity(vulnerabilities, { hideFixAvailable }), {})
}

module.exports = {
  getHighestPriorities
}
