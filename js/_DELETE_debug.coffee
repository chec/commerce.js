window.ChecConsoleHelper = (color, a, b, c) ->
  bgc = undefined
  emoji = undefined
  i = undefined
  is_error = undefined
  len = undefined
  messages = undefined
  results = undefined
  color = color or 'black'
  bgc = 'White'
  is_error = false
  switch color
    when 'success'
      color = '#488f5a'
      emoji = '✅ \ \ '
    when 'info'
      color = 'DodgerBlue'
      emoji = ''
    when 'error'
      if c.error.type == 'validation'
        color = 'rgba(244, 67, 54, 1)'
        emoji = '🚫 Validation/Missing Fields'
        a = ''
      else
        color = 'rgba(244, 67, 54, 1)'
        emoji = '❌ HTTP ERROR '
        bgc = 'rgba(244, 67, 54, 0.15)'
      is_error = true
    when 'warning'
      color = 'rgba(208, 154, 35, 1)'
      emoji = '⚠️ \ '
  if is_error == true
    console.log '%c' + emoji + a, 'color:' + color + ';display:block; width: 100%;padding:2px 2px 2px 0px;font-family: Open Sans, Helvetica, Sans-serif;font-weight:bold;background-color:' + bgc + ';'
    if typeof c.error.message == 'object'
      messages = c.error.message
      i = 0
      len = messages.length
      results = []
      while i < len
        console.log '%c' + messages[i].field + ' %c' + messages[i].error, 'color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:800;', 'color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;'
        results.push i++
      return results
    else
      return console.log('%c' + c.error.message, 'color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;')
  else
    if typeof color == 'object'
      console.log '%c' + a, 'color: PowderBlue;font-weight:bold;font-family: Open Sans, Helvetica, Sans-serif; background-color: RoyalBlue;'
      console.log color
    else
      console.log '%c' + emoji + a, 'color:' + color + ';display:block;font-family: Open Sans, Helvetica, Sans-serif;line-height:28px; width: 100%;padding:2px 2px 2px 0px;font-weight:bold;background-color:' + bgc + ';'
      if b
        console.log '%c' + b, 'color:#515D6D;line-height:22px;font-weight:400; font-family: Open Sans, Helvetica, Sans-serif;'
  return
