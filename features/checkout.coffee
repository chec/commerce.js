	class Commerce.Checkout

		constructor: (@m) ->

		generateToken: (identifier, callback) ->
			return @m.Request 'checkout/'+identifier, 'GET', null, callback

		capture: (token, data, callback) ->
		  return @m.Request 'checkout/'+token, 'POST', data, callback

	  checkPaypalStatus: (token, callback) ->
	    @m.Request 'checkout/' + token + '/check/paypal/payment', 'GET', {}, callback

	  checkPaypalOrderCaptured: (token, callback) ->
	    @m.Request 'checkout/' + token + '/check/paypal/captured', 'GET', {}, callback

	  receipt: (token, callback) ->
	    @m.Request 'checkout/' + token + '/receipt', 'GET', {}, callback

	  checkPayWhatYouWant: (token, amount, callback) ->
	    @m.Request 'checkout/' + token + '/check/pay_what_you_want', 'GET', { amount: amount }, callback

	  fields: (identifier, callback) ->
	    @m.Request 'checkout/' + identifier + '/fields', 'GET', null, callback

	  setTaxZone: (identifier, location, callback) ->
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
	    }, callback

	  getLocationFromIP: (token, ip_address, callback) ->
	    if ip_address == null
	      ip_address = ''
	    if typeof ip_address == 'function'
	      @m.Request 'checkout/' + token + '/helper/location_from_ip', 'GET', null, ip_address
	    else
	      @m.Request 'checkout/' + token + '/helper/location_from_ip', 'GET', { ip: ip_address }, callback

	  isFree: (token, callback) ->
	    @m.Request 'checkout/' + token + '/check/is_free', 'GET', null, callback

	  checkVariant: (token, line_item_id, variant_id, option_id, callback) ->
	    @m.Request 'checkout/' + token + '/check/' + line_item_id + '/variant', 'GET', {
	      'variant_id': variant_id
	      'option_id': option_id
	    }, callback

	  checkDiscount: (token, code, callback) ->
	    @m.Request 'checkout/' + token + '/check/discount', 'GET', { 'code': code }, callback

	  checkShippingOption: (token, shipping_country, id, callback) ->
	    @m.Request 'checkout/' + token + '/check/shipping', 'GET', {
	      'country': shipping_country
	      'id': id
	    }, callback

	  checkQuantity: (token, line_item, amount, callback) ->
	    @m.Request 'checkout/' + token + '/check/' + line_item + '/quantity', 'GET', { 'amount': amount }, callback

	  helperValidation: (token, callback) ->
	    @m.Request 'checkout/' + token + '/helper/validation', 'GET', null, callback

	  getLive: (token, callback) ->
	    @m.Request 'checkout/' + token + '/live', 'GET', null, callback
