const pseudoClassRegexes = {}

const getRegex = pseudoClass => {
    if (!Object.prototype.hasOwnProperty.call(pseudoClassRegexes, pseudoClass)) {
        pseudoClassRegexes[pseudoClass] = new RegExp(`(?<!\\\\):${pseudoClass}(?=\\W|$)`, 'gi')
    }

    return pseudoClassRegexes[pseudoClass]
}

const selectorParsers = {}

const getSelectorParser = (triggerBaseClassName, pseudoClass) => {
    const key = triggerBaseClassName+pseudoClass

    if (!Object.prototype.hasOwnProperty.call(selectorParsers, key)) {
        const triggerSelector = getTriggerSelectorBuilder(triggerBaseClassName);
        selectorParsers[key] = getTriggerSelectorsBuilder(pseudoClass, triggerSelector)
    }

    return selectorParsers[key];
}

const hasPseudoClass = pseudoClass => selector => getRegex(pseudoClass).test(selector)
const getSelectorWithoutPseudoClass = pseudoClass => selector => selector.replace(getRegex(pseudoClass), '')

const getTriggerSelectorBuilder = triggerClassName => pseudoClass =>
    selector => `.${triggerClassName}\\:${pseudoClass} ${getSelectorWithoutPseudoClass(pseudoClass)(selector)}`


const getTriggerSelectorsBuilder = (pseudoClass, triggerSelector) => selectors =>
        selectors
            .filter(hasPseudoClass(pseudoClass))
            .map(triggerSelector(pseudoClass))

module.exports = {
    hasPseudoClass,
    getSelectorWithoutPseudoClass,
    getTriggerSelectorBuilder,
    getTriggerSelectorsBuilder,
    getSelectorParser
}
