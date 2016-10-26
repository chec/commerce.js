class Commerce.Cart

    constructor: (@c) ->
       @init()

    init: (id = false) ->
      cjs = @c
      if not id and @c.Storage.get('commercejs_cart_id') != null
        return @c.Request 'cart/'+@c.Storage.get('commercejs_cart_id'), 'GET', null,
        (data) ->
          cjs.Cart.cart_id = data.id
          cjs.Event 'Cart.Ready',
        ,(error) -> cjs.Cart.refresh()
      else
        if id
          return @c.Request 'cart/'+id, 'GET', null,
          (data) ->
            cjs.Storage.set('commercejs_cart_id', data.id, 30)
            cjs.Cart.cart_id = data.id
            cjs.Event 'Cart.Ready'
          ,(error) -> cjs.Cart.refresh()
        else
          @refresh()

    refresh: (callback, error) ->
      cjs = @c
      return @c.Request 'cart', 'GET', null, (data) ->
        cjs.Storage.set('commercejs_cart_id', data.id, 30)
        cjs.Cart.cart_id = data.id
        cjs.Event 'Cart.Ready'

    id: () ->
      return @cart_id

    add: (data, callback, error) ->
        return @c.Request 'cart/' + @cart_id, 'POST', data, callback, error

    retrieve: (callback, error) ->
        return @c.Request 'cart/' + @cart_id, 'GET', null, callback, error

    remove: (line_id, callback, error) ->
        return @c.Request 'cart/' + @cart_id + '/item/' + line_id, 'DELETE', null, callback, error

    delete: (callback, error) ->
        return @c.Request 'cart/' + @cart_id, 'DELETE', null, callback, error

    update: (line_id, data, callback, error) ->
        return @c.Request 'cart/' + @cart_id + '/item/' + line_id, 'PUT', data, callback, error
