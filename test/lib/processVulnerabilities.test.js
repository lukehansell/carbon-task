const { getHighestPriorities } = require('../../lib/processVulnerabilities')

const buildVulnerability = (name, severity) => ({
  name,
  severity
})

const priorities = ['info', 'low', 'moderate', 'high', 'critical']

describe('getHighestPrioritiesVulnerabilities', () => {
  context('when passed an empty object', () => {
    it('returns an empty object', () => {
      expect(getHighestPriorities({})).to.deep.equal({})
    })
  })

  context('when passed a single keyed object', () => {
    const vulnerabilities = {
      foo: buildVulnerability('foo', 'high')
    }

    it('returns the object', () => {
      expect(getHighestPriorities(vulnerabilities)).to.deep.equal(vulnerabilities)
    })
  })

  describe('when passed two vulnerabilities', () => {
    let vulnerabilities = {}

    priorities.forEach((priority1, index1) => {
      context(`when priority1 is ${priority1}`, () => {
        beforeEach(() => {
          vulnerabilities = {
            foo: buildVulnerability('foo', priority1)
          }
        })

        priorities.forEach((priority2, index2) => {
          context(`when priorty2 is ${priority2}`, () => {
            beforeEach(() => {
              vulnerabilities = {
                ...vulnerabilities,
                bar: buildVulnerability('bar', priority2)
              }
            })

            if (index1 === index2) {
              it('returns both items', () => {
                expect(getHighestPriorities(vulnerabilities)).to.deep.equal(vulnerabilities)
              })
            }

            if (index1 > index2) {
              it('returns the first item', () => {
                expect(getHighestPriorities(vulnerabilities)).to.deep.equal({
                  foo: buildVulnerability('foo', priority1)
                })
              })
            }

            if (index2 > index1) {
              it('reutns the second item', () => {
                expect(getHighestPriorities(vulnerabilities)).to.deep.equal({
                  bar: buildVulnerability('bar', priority2)
                })
              })
            }
          })
        })
      })
    })
  })

  context('when passed more than two priorites', () => {
    context('when all are the same', () => {
      it('returns all the vulnerabilities', () => {
        const vulnerabilities = {
          foo: buildVulnerability('foo', 'high'),
          bar: buildVulnerability('bar', 'high'),
          baz: buildVulnerability('baz', 'high')
        }

        expect(getHighestPriorities(vulnerabilities)).to.deep.equal(vulnerabilities)
      })
    })

    context('when the first is lower', () => {
      it('returns the latter two', () => {
        const vulnerabilities = {
          foo: buildVulnerability('foo', 'low'),
          bar: buildVulnerability('bar', 'high'),
          baz: buildVulnerability('baz', 'high')
        }

        expect(getHighestPriorities(vulnerabilities)).to.deep.equal({
          bar: buildVulnerability('bar', 'high'),
          baz: buildVulnerability('baz', 'high')
        })
      })
    })

    context('when the last is lower', () => {
      it('returns the first two', () => {
        const vulnerabilities = {
          foo: buildVulnerability('foo', 'high'),
          bar: buildVulnerability('bar', 'high'),
          baz: buildVulnerability('baz', 'low')
        }

        expect(getHighestPriorities(vulnerabilities)).to.deep.equal({
          foo: buildVulnerability('foo', 'high'),
          bar: buildVulnerability('bar', 'high')
        })
      })
    })

    context('when the middel is lower', () => {
      it('returns the outer two', () => {
        const vulnerabilities = {
          foo: buildVulnerability('foo', 'high'),
          bar: buildVulnerability('bar', 'low'),
          baz: buildVulnerability('baz', 'high')
        }

        expect(getHighestPriorities(vulnerabilities)).to.deep.equal({
          foo: buildVulnerability('foo', 'high'),
          baz: buildVulnerability('baz', 'high')
        })
      })
    })
  })
})
