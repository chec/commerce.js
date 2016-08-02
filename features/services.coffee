class Commerce.Services

    constructor: (@m) ->

    localeListCountries: (return_as_options, callback, error) ->
        if return_as_options == null
              return_as_options = false
        @m.Request 'services/locale/countries', 'GET', null, callback, error

    localeListSubdivisions: (country_code, callback, error) ->
        @m.Request 'services/locale/' + country_code + '/subdivisions', 'GET', {}, callback, error
