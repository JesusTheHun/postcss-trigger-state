const pseudoClassRegexes = {}

const getRegex = pseudoClass => {
    if (!pseudoClassRegexes.hasOwnProperty(pseudoClass)) {
        pseudoClassRegexes[pseudoClass] = new RegExp(`(?<!\\\\):${pseudoClass}(?=\\W|$)`, 'gi')
    }

    return pseudoClassRegexes[pseudoClass]
}

const hasPseudoClass = pseudoClass => selector => getRegex(pseudoClass).test(selector)
const getSelectorWithoutPseudoClass = pseudoClass => selector => selector.replace(getRegex(pseudoClass), '')

const getTriggerSelectorBuilder = triggerClassName => pseudoClass =>
    selector => `.${triggerClassName}\\:${pseudoClass} ${getSelectorWithoutPseudoClass(pseudoClass)(selector)}`


const getTriggerSelectors = (pseudoClass, triggerSelector) => selectors =>
        selectors
            .filter(hasPseudoClass(pseudoClass))
            .map(triggerSelector(pseudoClass))

module.exports = {
    hasPseudoClass,
    getSelectorWithoutPseudoClass,
    getTriggerSelectorBuilder,
    getTriggerSelectors
}
