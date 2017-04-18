	class Commerce.Merchants

		constructor: (@c) ->

		about: (callback, error) ->
				return @c.Request 'merchants', 'GET', null, callback, error
