class Commerce.Services

    constructor: (@m) ->

    localeListCountries: (return_as_options, callback) ->
        if return_as_options == null
              return_as_options = false
        @m.Request 'services/locale/countries', 'GET', null, callback

    localeListSubdivisions: (country_code, callback) ->
        @m.Request 'services/locale/' + country_code + '/subdivisions', 'GET', {}, callback
