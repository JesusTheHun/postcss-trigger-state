const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}


it('create hover trigger rule for pseudo class', async () => {
  await run('a:hover { }', ".trigger\\:hover a { }\na:hover { }", { })
})

it('do not create hover trigger rule when no pseudo class', async () => {
  await run('h1 { }', "h1 { }", { })
})
