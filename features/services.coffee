class Commerce.Services

    constructor: (@c) ->

    localeListCountries: (callback, error) ->
        @c.Request 'services/locale/countries', 'GET', null, callback, error

    localeListShippingCountries: (token, callback, error) ->
        @c.Request 'services/locale/' + token + '/countries', 'GET', null, callback, error

    localeListShippingSubdivisions: (token, country_code, callback, error) ->
        @c.Request 'services/locale/' + token + '/countries/' + country_code + '/subdivisions', 'GET', null, callback, error

    localeListSubdivisions: (country_code, callback, error) ->
        @c.Request 'services/locale/' + country_code + '/subdivisions', 'GET', {}, callback, error
