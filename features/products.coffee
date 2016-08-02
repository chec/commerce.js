	class Commerce.Products

		constructor: (@m) ->

		list: (callback) ->
			return @m.Request 'products', 'GET', null, callback

		retrieve: (permalink, callback) ->
			return @m.Request 'products/' + permalink, 'GET', null, callback

		# TODO: Search by ID or Permalink
