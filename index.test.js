const {hasPseudoClass, getSelectorWithoutPseudoClass, getTriggerSelectorBuilder, getTriggerSelectors} = require('./utils');

const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

const defaultOptions = {
  triggerBaseClassName: 'trigger',
  states: ['hover', 'focus', 'active']
}

describe('internals', () => {
  it('test if the selector has the pseudo class', () => {
    expect(hasPseudoClass('hover')('h1:hover')).toBeTruthy()
    expect(hasPseudoClass('hover')('h1')).toBeFalsy()
    expect(hasPseudoClass('hover')('h1\\:hover')).toBeFalsy()
    expect(hasPseudoClass('hover')('h1:hoverandmore')).toBeFalsy()
    expect(hasPseudoClass('hover')('h1:hover, p')).toBeTruthy()
  })

  it('returns the selector without the pseudo class', () => {
    expect(getSelectorWithoutPseudoClass('hover')('h1:hover')).toEqual('h1')
    expect(getSelectorWithoutPseudoClass('hover')('h1:hover')).toEqual('h1')
    expect(getSelectorWithoutPseudoClass('hover')('section h1:hover')).toEqual('section h1')
    expect(getSelectorWithoutPseudoClass('hover')('.hoverinthename')).toEqual('.hoverinthename')
    expect(getSelectorWithoutPseudoClass('hover')('.escaped\\:hover')).toEqual('.escaped\\:hover')
    expect(getSelectorWithoutPseudoClass('hover')('.attheendhover')).toEqual('.attheendhover')
  })

  it('returns the trigger selectors from source selector string', () => {
    const getTriggerSelector = getTriggerSelectorBuilder('trigger')
    expect(getTriggerSelectors('hover', getTriggerSelector)(['h1:hover'])).toEqual(['.trigger\\:hover h1'])
    expect(getTriggerSelectors('hover', getTriggerSelector)(['h1:hover', 'a'])).toEqual(['.trigger\\:hover h1'])
  })
})

describe('userland', () => {
  it('create hover trigger rule for pseudo class', async () => {
    await run('a:hover { }', ".trigger\\:hover a { }\na:hover { }")
  })

  it('create hover trigger rule for rules with multiple selector', async () => {
    await run('a:hover, h1 { }', ".trigger\\:hover a { }\na:hover, h1 { }")
  })

  it('do not create hover trigger rule when no pseudo class', async () => {
    await run('h1 { }', "h1 { }")
  })
})
