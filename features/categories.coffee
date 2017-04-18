	class Commerce.Categories

		constructor: (@c) ->

		list: (params, callback, error) ->
			if typeof params == 'function'
				return @c.Request 'categories', 'GET', null, params, callback
			else
				return @c.Request 'categories', 'GET', params, callback, error

		retrieve: (slug, data, callback, error) ->
			return @c.Request 'categories/' + slug, 'GET', data, callback, error
