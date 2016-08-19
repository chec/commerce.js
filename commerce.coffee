class Commerce

  "use strict"

  options:
    publicKey: ''
    auth: {}
    version: 'v1'
    methods: ['GET', 'POST', 'PUT', 'DELETE']
    debug: false

  constructor: (publicKey, debug = false) ->

    if debug
      ascii = "\r\n \r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ Che\ \ \ \ \ \ \ \ \ EcC\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c....c2\ \ \ \ 2c....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c........c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c............c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c....................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ c........................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ c............................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ \ \ c.......:E2\ \ 2c..................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ \ \ c........h\ \ $$\ \ \ 2c..................c2\ \ \ 2c.....:C\r\n \ \ \ \ \ \ c.........:C\ \ $cc$\ \ E....................c2\ \ \ 2c.....:C\r\n \ \ \ \ c............h\ \ \ \ $$\ \ c......................c2\ \ \ 2c.....:C\r\n \ \ c...............:E\ \ \ \ E:.........................c2\ \ \ 2c.....:C\r\n \ \ E............................:C\ c..................h2\ \ \ 2c...:C\r\n \ \ \ \ E........................:C\ \ \ \ \ \c..................h2\ \ \ 2hC\r\n \ \ \ \ \ \ E....................:C\ \ \ \ \ \ \ \ \ c..................h2\r\n \ \ \ \ \ \ \ \ E................:C\ \ \ \ \ \ \ \ \ \ \ \ \ c................:C\r\n \ \ \ \ \ \ \ \ \ \ E............:C\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c............:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ E........:C\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c........:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ E....:C\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ c....:C\r\n \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ EcC\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ EcC\r\n \r\n\ \r\n \r\n"
      console.log("%c#{ascii}", "font-family: 'Courier New', Courier, monospace; color: #788ba4; font-weight:bold; font-size: 11px;");
      console.log("%cCommerce.js console debugger is on! \ 🎉", "text-align:center; display:block; font-family: 'Open Sans', Helvetica, Sans-serif; color: #488f5a; line-height:28px; font-size: 14px");
      console.log("%c💬 \ \ Need some help? Join our Slack channel - https://chec-commercejs-community.herokuapp.com \r\n", "text-align:center; display:block; font-family: 'Open Sans', Helvetica, Sans-serif; color: #515D6D; line-height:20px; font-size: 12px");
    @options = @Merge @options, { publicKey: publicKey, debug: debug }
    @Storage = new Commerce.Storage

    switch window.location.hostname
        when 'checkout.chec.dev' then @options.url = 'api.chec.dev'
        when 'spaces.chec.dev' then @options.url = 'api.chec.dev'
        when 'stage.checkout.chec.io' then @options.url = 'stage.api.chec.io'
        when 'checkout.chec.io' then @options.url = 'api.chec.io'
        else @options.url = 'api.chec.io'

    @Cart = new Commerce.Cart @
    @Checkout = new Commerce.Checkout @
    @Products = new Commerce.Products @
    @Services = new Commerce.Services @

  Merge: (o1, o2) ->

    o3 = {}
    o3[k] = v for k, v of o1
    o3[k] = v for k, v of o2
    return o3

  InArray: (key, arr) ->

    return false if not arr or key not in arr
    return true

  Serialize: (obj, prefix = null) ->

    str = []

    for k,v of obj
      k = if prefix != null then prefix+'['+k+']' else k
      str.push if typeof v == 'object' then @Serialize v, k else encodeURIComponent(k)+'='+encodeURIComponent(v)

    return str.join '&'

  Error: (response) ->
    type = "[#{response.status_code}] Type: #{response.error.type}"
    msg = "#{response.error.message}"
    return ChecConsoleHelper('error', type, msg, response);

  Ajax: (options) ->
    args =
      method:   'GET'
      async:    true
      data:     null
      timeout:  60000
      headers:  {}
      host:     @options.url
      port:     if @options.url is "api.chec.io" then 443 else 80
      path:     '/'
      success:  (response, status, request) ->
      error:    (response, status, request) ->

    args = @Merge args, options
    args.method = args.method.toUpperCase()

    try
      request = new XMLHttpRequest()
    catch e
      try
        request = new ActiveXObject("Msxml2.XMLHTTP")
      catch e
        return false;

    args.url = ( if args.port == 443 then 'https://' else 'http://' ) + args.host +
           ( if args.path.substr(0, 1) != '/' then '/' + @options.version + '/' + args.path else args.path )

    if args.method == 'GET'
      args.url += '?' + @Serialize args.data
      args.data = null
    else
      args.data = @Serialize args.data

    request.open args.method, args.url, args.async

    timeout = setTimeout =>
      request.abort()
      args.error request, 408, 'Your request timed out'
    , args.timeout

    request.setRequestHeader k, v for k,v of args.headers

    request.onreadystatechange = ->

      if request.readyState != 4
        return null;

      clearTimeout timeout

      response = JSON.parse request.responseText

      if request.status.toString().charAt(0) != '2'
        args.error response, request.status, request
      else
        args.success response, request.status, request

    request.send args.data

  Request: (uri, method = 'GET', data = null, callback, error) ->

    _data    = {}
    _headers =
      'Content-Type': 'application/x-www-form-urlencoded'
      'Accept': 'application/json'
      'X-Authorization': @options.publicKey
      'X-Chec-Agent': 'commerce.js/v1'

    if @options.publicKey == null
        alert 'Please enter your public api key'

    if not @InArray method, @options.methods
      if typeof error == 'function'
        error 'error', 'Invalid request method ('+method+')', 400

    @Ajax
      method: method
      path: uri
      data: data
      async: true
      headers: _headers
      success: (r, c, e) =>
        if @options.debug is true and typeof r._console == 'object'
            ChecConsoleHelper r._console[0], r._console[1], r._console[2]
        if typeof callback == 'function'
            callback r, if typeof r.pagination != 'undefined' then r.pagination else null
        else
          return r
      error: (r, c, e) =>
        if typeof error == 'function'
          error r
        else
          if @options.debug is true
              @Error r
          if typeof callback == 'function'
              callback r, if typeof r.pagination != 'undefined' then r.pagination else null
          else
            return r
        _data = r;

    if typeof callback == 'undefined'
      return _data.r
