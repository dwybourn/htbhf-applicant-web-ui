const { pipe, map, filter, flatten, isNil } = require('ramda')
const { notIsNil } = require('../../../../common/predicates')

const combinePathWithRow = (path) => (row) => ({
  ...row,
  path
})

const getFlattenedRowData = (req) => pipe(map(getRowData(req)), filter(notIsNil), flatten)

const getRowData = (req) => (step) => {
  if (isNil(step.contentSummary)) {
    return null
  }
  const result = step.contentSummary(req)
  const applyPathToRow = combinePathWithRow(step.path)

  return Array.isArray(result) ? result.map(applyPathToRow) : applyPathToRow(result)
}

module.exports = {
  getRowData,
  getFlattenedRowData
}