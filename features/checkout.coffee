	class Commerce.Checkout

		constructor: (@c) ->

		protect: (token) ->
			@c.Request 'checkouts/'+token+'/protect',
								 'GET',
								 null,
								 (data) ->
									 eval data.sift_js;

		generateToken: (identifier, data, callback, error) ->
			return @c.Request 'checkouts/'+identifier, 'GET', data, callback, error

		capture: (token, data, callback, error) ->
		  return @c.Request 'checkouts/'+token, 'POST', data, callback, error

	  checkPaypalStatus: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/paypal/payment', 'GET', null, callback, error

	  checkPaypalOrderCaptured: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/paypal/captured', 'GET', null, callback, error

	  receipt: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/receipt', 'GET', null, callback, error

	  checkPayWhatYouWant: (token, data, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/pay_what_you_want', 'GET', data, callback, error

	  fields: (identifier, callback, error) ->
	    @c.Request 'checkouts/' + identifier + '/fields', 'GET', null, callback, error

	  setTaxZone: (identifier, data, callback, error) ->
	    @c.Request 'checkouts/' + identifier + '/helper/set_tax_zone', 'GET', data, callback, error

	  getLocationFromIP: (token, ip_address, callback, error) ->
	    if ip_address == null
	      ip_address = ''
	    if typeof ip_address == 'function'
	      @c.Request 'checkouts/' + token + '/helper/location_from_ip', 'GET', null, ip_address, error
	    else
	      @c.Request 'checkouts/' + token + '/helper/location_from_ip', 'GET', { 'ip_address': ip_address }, callback, error

	  isFree: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/is_free', 'GET', null, callback, error

	  checkVariant: (token, line_item_id, data, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/' + line_item_id + '/variant', 'GET', data, callback, error

	  checkDiscount: (token, data, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/discount', 'GET', data, callback, error

	  checkShippingOption: (token, data, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/shipping', 'GET', data, callback, error

		getShippingOptions: (token, data, callback, error) ->
	    @c.Request 'checkouts/' + token + '/helper/shipping_options', 'GET', data, callback, error

	  checkQuantity: (token, line_item, data, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/' + line_item + '/quantity', 'GET', data, callback, error

	  helperValidation: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/helper/validation', 'GET', null, callback, error

	  getLive: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/live', 'GET', null, callback, error

	  getToken: (token, callback, error) ->
	    @c.Request 'checkouts/tokens/' + token, 'GET', null, callback, error
