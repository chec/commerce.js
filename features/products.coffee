	class Commerce.Products

		constructor: (@m) ->

		list: (callback, error) ->
			return @m.Request 'products', 'GET', null, callback, error

		retrieve: (permalink, identifier_type, callback, error) ->
			return @m.Request 'products/' + permalink, 'GET', {'type': identifier_type}, callback, error

		# TODO: Search by ID or Permalink
