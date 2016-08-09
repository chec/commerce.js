class Commerce.Services

    constructor: (@m) ->

    localeListCountries: (return_as_options, callback, error) ->
        if typeof return_as_options == 'function'  
              callback = return_as_options
        @m.Request 'services/locale/countries', 'GET', null, callback, error

    localeListSubdivisions: (country_code, callback, error) ->
        @m.Request 'services/locale/' + country_code + '/subdivisions', 'GET', {}, callback, error
