const { compose, not } = require('ramda')
const { getIndexFromKey } = require('./decrement-keys')

const CHID_DOB_PREFIX = 'childDob'

const isChildEntry = (val, key) => key.startsWith(CHID_DOB_PREFIX)

const isNotChildEntry = compose(not, isChildEntry)

const keyDoesNotContainIndex = (index) => (val, key) => getIndexFromKey(key) !== index

module.exports = {
  keyDoesNotContainIndex,
  isNotChildEntry,
  isChildEntry
}
