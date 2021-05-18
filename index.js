const {getTriggerSelectors, getTriggerSelectorBuilder} = require('./utils');
const processed = Symbol('processed')

module.exports = (opts = {
  triggerBaseClassName: 'trigger',
  states: ['hover', 'focus', 'active']
}) => {

  const getTriggerSelector = getTriggerSelectorBuilder(opts.triggerBaseClassName)

  return {
    postcssPlugin: 'postcss-trigger-state',
    Once (root) {
      root.walkRules(rule => {
        if (!rule[processed]) {
          const newSelectors = getTriggerSelectors('hover', getTriggerSelector)(rule.selectors);

          if (newSelectors.length > 0) {
            const newNode = rule.cloneBefore({
              selectors: newSelectors
            })

            newNode[processed] = true
          }
        }
      })
    }
  }
}
module.exports.postcss = true
