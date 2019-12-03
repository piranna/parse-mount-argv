// http://stackoverflow.com/a/1555146/586382


function setOption(arg)
{
  arg = arg.split('=')

  let key, value

  if(arg.length)
  {
    key   = arg.shift()
    value = arg.join('=')
  }
  else
  {
    key = arg
    value = true
  }

  this[key] = value
}

function processOptions(arg)
{
  arg.split(',').forEach(setOption, this)
}

function parse([dev, path, ...argv], options = {})
{
  const result = {dev, options, path}

  while(argv.length)
  {
    const token = argv.shift()
    switch(token)
    {
      case '-o': case '--options':
        processOptions.call(options, argv.shift())
      break

      default: throw 'Unknown argument '+token
    }
  }

  return result
}


module.exports = parse
