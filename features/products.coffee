	class Commerce.Products

		constructor: (@m) ->

		list: (callback, error) ->
			return @m.Request 'products', 'GET', null, callback, error

		retrieve: (permalink, callback, error) ->
			return @m.Request 'products/' + permalink, 'GET', null, callback, error

		# TODO: Search by ID or Permalink
