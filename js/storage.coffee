  class Commerce.Storage
    #maybe move to data store later
    constructor: (@c) ->

    set: (key, value, days) ->
      date = undefined
      expires = undefined
      expires = ''

      if typeof @c.options.config.cookie_path is 'undefined'
        path = '/'
      else
        path = @c.options.config.cookie_path

      if days
        date = new Date
        date.setTime date.getTime() + days * 24 * 60 * 60 * 1000
        expires = '; expires=' + date.toGMTString()
      document.cookie = key + '=' + value + expires + '; path=' + path

    get: (key) ->

      key = key + "="

      for c in document.cookie.split(';')
        c = c.substring(1, c.length) while c.charAt(0) is ' '
        return c.substring(key.length, c.length) if c.indexOf(key) == 0

      return null

    remove: (key) ->

      @set key, '', -1
