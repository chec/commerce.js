class Commerce.Cart

    constructor: (@c) ->
       @init()

    init: (id = false) ->
      cjs = @c
      if not id and @c.Storage.get('commercejs_cart_id') != null
        return @c.Request 'carts/'+@c.Storage.get('commercejs_cart_id'), 'GET', null,
        (data) ->
          cjs.Cart.cart_id = data.id
          cjs.Event 'Cart.Ready',
        ,(error) -> cjs.Cart.refresh()
      else
        if id
          return @c.Request 'carts/'+id, 'GET', null,
          (data) ->
            cjs.Storage.set('commercejs_cart_id', data.id, 30)
            cjs.Cart.cart_id = data.id
            cjs.Event 'Cart.Ready'
          ,(error) -> cjs.Cart.refresh()
        else
          @refresh()

    refresh: () ->
      cjs = @c
      return @c.Request 'carts', 'GET', null, (data) ->
        cjs.Storage.set('commercejs_cart_id', data.id, 30)
        cjs.Cart.cart_id = data.id
        cjs.Event 'Cart.Ready'

    id: () ->
      return @cart_id

    add: (data, callback, error) ->
      @c.Request 'carts/' + @cart_id, 'POST', data, callback, error

    retrieve: (callback, error) ->
      @c.Request 'carts/' + @cart_id, 'GET', null, callback, error

    remove: (line_id, callback, error) ->
      @c.Request 'carts/' + @cart_id + '/items/' + line_id, 'DELETE', null, callback, error

    delete: (callback, error) ->
      @c.Request 'carts/' + @cart_id, 'DELETE', null, callback, error

    update: (line_id, data, callback, error) ->
      @c.Request 'carts/' + @cart_id + '/items/' + line_id, 'PUT', data, callback, error

    contents: (callback, error) ->
      @c.Request 'carts/' + @cart_id + '/items', 'GET', null, callback, error

    empty:  (callback, error) ->
      @c.Request 'carts/' + @cart_id + '/items', 'DELETE', null, callback, error
