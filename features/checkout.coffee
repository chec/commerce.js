	class Commerce.Checkout

		constructor: (@m) ->

		protect: (token) ->
			@m.Request 'checkout/'+token+'/protect',
								 'GET',
								 null,
								 (data) ->
									 eval data.sift_js;

		generateToken: (identifier, callback, error) ->
			return @m.Request 'checkout/'+identifier, 'GET', null, callback, error

		capture: (token, data, callback, error) ->
		  return @m.Request 'checkout/'+token, 'POST', data, callback, error

	  checkPaypalStatus: (token, callback, error) ->
	    @m.Request 'checkout/' + token + '/check/paypal/payment', 'GET', {}, callback, error

	  checkPaypalOrderCaptured: (token, callback, error) ->
	    @m.Request 'checkout/' + token + '/check/paypal/captured', 'GET', {}, callback, error

	  receipt: (token, callback, error) ->
	    @m.Request 'checkout/' + token + '/receipt', 'GET', {}, callback, error

	  checkPayWhatYouWant: (token, amount, callback, error) ->
	    @m.Request 'checkout/' + token + '/check/pay_what_you_want', 'GET', { amount: amount }, callback, error

	  fields: (identifier, callback, error) ->
	    @m.Request 'checkout/' + identifier + '/fields', 'GET', null, callback, error

	  setTaxZone: (identifier, location, callback, error) ->
	    country = undefined
	    ip_address = undefined
	    postal_zip_code = undefined
	    region = undefined
	    ip_address = if typeof location.ip_address != 'undefined' then location.ip_address else ''
	    country = if typeof location.country != 'undefined' then location.country else ''
	    region = if typeof location.region != 'undefined' then location.region else ''
	    postal_zip_code = if typeof location.postal_zip_code != 'undefined' then location.postal_zip_code else ''
	    @m.Request 'checkout/' + identifier + '/helper/set_tax_zone', 'GET', {
	      'ip_address': ip_address
	      'country': country
	      'region': region
	      'postal_zip_code': postal_zip_code
	    }, callback, error

	  getLocationFromIP: (token, ip_address, callback, error) ->
	    if ip_address == null
	      ip_address = ''
	    if typeof ip_address == 'function'
	      @m.Request 'checkout/' + token + '/helper/location_from_ip', 'GET', null, ip_address, error
	    else
	      @m.Request 'checkout/' + token + '/helper/location_from_ip', 'GET', { ip: ip_address }, callback, error

	  isFree: (token, callback, error) ->
	    @m.Request 'checkout/' + token + '/check/is_free', 'GET', null, callback, error

	  checkVariant: (token, line_item_id, variant_id, option_id, callback, error) ->
	    @m.Request 'checkout/' + token + '/check/' + line_item_id + '/variant', 'GET', {
	      'variant_id': variant_id
	      'option_id': option_id
	    }, callback, error

	  checkDiscount: (token, code, callback, error) ->
	    @m.Request 'checkout/' + token + '/check/discount', 'GET', { 'code': code }, callback, error

	  checkShippingOption: (token, shipping_country, id, callback, error) ->
	    @m.Request 'checkout/' + token + '/check/shipping', 'GET', {
	      'country': shipping_country
	      'id': id
	    }, callback, error

	  checkQuantity: (token, line_item, amount, callback, error) ->
	    @m.Request 'checkout/' + token + '/check/' + line_item + '/quantity', 'GET', { 'amount': amount }, callback, error

	  helperValidation: (token, callback, error) ->
	    @m.Request 'checkout/' + token + '/helper/validation', 'GET', null, callback, error

	  getLive: (token, callback, error) ->
	    @m.Request 'checkout/' + token + '/live', 'GET', null, callback, error
