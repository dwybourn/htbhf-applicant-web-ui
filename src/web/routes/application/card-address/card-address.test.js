const test = require('tape')
const { assocPath } = require('ramda')
const { contentSummary } = require('./card-address')

const req = {
  t: string => string,
  session: {
    claim: {
      addressLine1: 'Flat b',
      addressLine2: '221 Baker street',
      townOrCity: 'London',
      postcode: 'aa1 1ab'
    }
  }
}

test('Card address contentSummary() should return content summary in correct format', (t) => {
  const result = contentSummary(req)
  const expected = {
    key: 'cardAddress.summaryKey',
    value: 'Flat b\n221 Baker street\nLondon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

test('Card address contentSummary() should return content summary in correct format without address line 2', (t) => {
  const testReq = assocPath(['session', 'claim', 'addressLine2'], '', req)
  const result = contentSummary(testReq)
  const expected = {
    key: 'cardAddress.summaryKey',
    value: 'Flat b\nLondon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format without address line 2')
  t.end()
})
