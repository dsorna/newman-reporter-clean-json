const _ = require('lodash')

/**
 * Reporter that simply dumps the summary object to file (default: newman-run-report.json).
 * BUT: omits response.stream & request.body.raw
 *
 * @param {Object} newman - The collection run object, with event hooks for reporting run details.
 * @param {Object} options - A set of collection run options.
 * @param {String} options.export - The path to which the summary object must be written.
 * @returns {*}
 */
module.exports = function (newman, options) {
  newman.on('beforeDone', function (err, o) {
    if (err) { return }
    const smallerSummary = _.omit(o.summary, 'exports')
    const cleanExec = []
    smallerSummary.run.executions.forEach(exec => {
      const tmpExec = _.omit(exec, 'response.stream')
      cleanExec.push(_.omit(tmpExec, 'request.body.raw'))
    })

    smallerSummary.run.executions = cleanExec

    newman.exports.push({
      name: 'clean-json-reporter',
      default: 'newman-run-report.json',
      path: options.export,
      content: JSON.stringify(smallerSummary, 0, 2)
    })
  })
}
