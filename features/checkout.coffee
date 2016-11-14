	class Commerce.Checkout

		constructor: (@c) ->

		protect: (token) ->
			@c.Request 'checkouts/'+token+'/protect',
								 'GET',
								 null,
								 (data) ->
									 eval data.sift_js;

		generateToken: (identifier, identifier_type, callback, error) ->
			if typeof identifier_type == 'function'
				return @c.Request 'checkouts/'+identifier, 'GET', null, identifier_type, callback
			else
				return @c.Request 'checkouts/'+identifier, 'GET', {'type':identifier_type}, callback, error

		capture: (token, data, callback, error) ->
		  return @c.Request 'checkouts/'+token, 'POST', data, callback, error

	  checkPaypalStatus: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/paypal/payment', 'GET', {}, callback, error

	  checkPaypalOrderCaptured: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/paypal/captured', 'GET', {}, callback, error

	  receipt: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/receipt', 'GET', {}, callback, error

	  checkPayWhatYouWant: (token, customer_set_price, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/pay_what_you_want', 'GET', { 'customer_set_price': customer_set_price }, callback, error

	  fields: (identifier, callback, error) ->
	    @c.Request 'checkouts/' + identifier + '/fields', 'GET', null, callback, error

	  setTaxZone: (identifier, location, callback, error) ->
	    country = undefined
	    ip_address = undefined
	    postal_zip_code = undefined
	    region = undefined
	    ip_address = if typeof location.ip_address != 'undefined' then location.ip_address else ''
	    country = if typeof location.country != 'undefined' then location.country else ''
	    region = if typeof location.region != 'undefined' then location.region else ''
	    postal_zip_code = if typeof location.postal_zip_code != 'undefined' then location.postal_zip_code else ''
	    @c.Request 'checkouts/' + identifier + '/helper/set_tax_zone', 'GET', {
	      'ip_address': ip_address
	      'country': country
	      'region': region
	      'postal_zip_code': postal_zip_code
	    }, callback, error

	  getLocationFromIP: (token, ip_address, callback, error) ->
	    if ip_address == null
	      ip_address = ''
	    if typeof ip_address == 'function'
	      @c.Request 'checkouts/' + token + '/helper/location_from_ip', 'GET', null, ip_address, error
	    else
	      @c.Request 'checkouts/' + token + '/helper/location_from_ip', 'GET', { 'ip_address': ip_address }, callback, error

	  isFree: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/is_free', 'GET', null, callback, error

	  checkVariant: (token, line_item_id, variant_id, option_id, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/' + line_item_id + '/variant', 'GET', {
	      'variant_id': variant_id
	      'option_id': option_id
	    }, callback, error

	  checkDiscount: (token, code, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/discount', 'GET', { 'code': code }, callback, error

	  checkShippingOption: (token, shipping_country, id, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/shipping', 'GET', {
	      'country': shipping_country
	      'id': id
	    }, callback, error

		getShippingOptions: (token, shipping_country, callback, error) ->
	    @c.Request 'checkouts/' + token + '/helper/shipping_options', 'GET', {
	      'country': shipping_country
	    }, callback, error

	  checkQuantity: (token, line_item, amount, callback, error) ->
	    @c.Request 'checkouts/' + token + '/check/' + line_item + '/quantity', 'GET', { 'amount': amount }, callback, error

	  helperValidation: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/helper/validation', 'GET', null, callback, error

	  getLive: (token, callback, error) ->
	    @c.Request 'checkouts/' + token + '/live', 'GET', null, callback, error
