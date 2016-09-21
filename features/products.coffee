	class Commerce.Products

		constructor: (@c) ->

		list: (callback, error) ->
			return @c.Request 'products', 'GET', null, callback, error

		retrieve: (permalink, identifier_type, callback, error) ->
			return @c.Request 'products/' + permalink, 'GET', {'type': identifier_type}, callback, error

		# TODO: Search by ID or Permalink
