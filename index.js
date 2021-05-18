const {getSelectorParser} = require('./utils');
const processed = Symbol('processed')

module.exports = (opts = {
  triggerBaseClassName: 'trigger',
  states: ['hover']
}) => {

  return {
    postcssPlugin: 'postcss-trigger-state',
    Once (root) {
      root.walkRules(rule => {
        if (!rule[processed]) {
          opts.states.forEach(pseudoClass => {

            const newSelectors = getSelectorParser(opts.triggerBaseClassName, pseudoClass)(rule.selectors);

            if (newSelectors.length > 0) {
              const newNode = rule.cloneBefore({
                selectors: newSelectors
              })

              newNode[processed] = true
            }
          })
        }
      })
    }
  }
}
module.exports.postcss = true
