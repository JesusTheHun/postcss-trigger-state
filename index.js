const processed = Symbol('processed')

module.exports = (opts = { }) => {

  // Work with options here

  return {
    postcssPlugin: 'postcss-trigger-state',
    Once (root) {
      root.walkRules(rule => {
        if (!rule[processed]) {
          const newNode = rule.cloneBefore({
            selectors: rule.selectors.map(s => `.trigger\\:hover ${s.slice(0, -':hover'.length)}`)
          })

          newNode[processed] = true
        }
      })
    }
  }
}
module.exports.postcss = true
