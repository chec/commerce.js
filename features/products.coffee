	class Commerce.Products

		constructor: (@c) ->

		list: (params, callback, error) ->
			if typeof params == 'function'
				return @c.Request 'products', 'GET', null, params, callback
			else
				return @c.Request 'products', 'GET', params, callback, error
				
		retrieve: (permalink, data, callback, error) ->
			return @c.Request 'products/' + permalink, 'GET', data, callback, error

		# TODO: Search by ID or Permalink
