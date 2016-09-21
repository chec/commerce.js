  class Abstract

    constructor: (@c) ->

    Get: (id, callback, error) ->

      return @c.Request @endpoint+'/'+id, 'GET', null, callback, error

    Find: (terms, callback, error) ->

      return @c.Request @endpoint, 'GET', terms, callback, error

    List: (terms, callback, error) ->

      return @c.Request @endpoint, 'GET', terms, callback, error

    Fields: (id = 0, callback, error) ->

      uri  = @endpoint+'/'+ if id != 0 then id+'/fields' else 'fields'

      return @c.Request uri, 'GET', null, callback, error
