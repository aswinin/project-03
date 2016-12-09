var auth = require('../helpers/auth');
var proxy = require('../helpers/proxy');

var config = {
  /**
   * --------- ADD YOUR UAA CONFIGURATION HERE ---------
   *
   * This uaa helper object simulates NGINX uaa integration using Grunt allowing secure cloudfoundry service integration in local development without deploying your application to cloudfoundry.
   * Please update the following uaa configuration for your solution
   * You'll need to update clientId, serverUrl, and base64ClientCredential.
   */
  uaa: {
    clientId: 'app_client_id',
    serverUrl: 'https://f5eba58e-4799-450a-8b7e-3dc5897a30d8.predix-uaa.run.aws-usw02-pr.ice.predix.io',
    defaultClientRoute: '/about',
    base64ClientCredential: 'YXBwX2NsaWVudF9pZDpzZWNyZXQ='
  },
  /**
   * --------- ADD YOUR SECURE ROUTES HERE ------------
   *
   * Please update the following object add your secure routes
   *
   * Note: Keep the /api in front of your services here to tell the proxy to add authorization headers.
   * You'll need to update the url and instanceId.
   */
  proxy: {
    '/api/view-service': {
      url: 'https://predix-views.run.aws-usw02-pr.ice.predix.io/v1$1',
      instanceId: 'cc9ba4f7-fae2-4832-82cf-9146323957f1',
      pathRewrite: { '^/api/view-service': '/v1'}
    },
    '/api/timeseries': {
      url: 'https://time-series-store-predix.run.aws-usw02-pr.ice.predix.io/$1',
      instanceId: '92f8b9c6-153c-47e0-9cf8-530c9d661c48',
      pathRewrite: {'^/api/timeseries': '/v1/datapoints'}
    }
  }
};

module.exports = {
  server: {
    options: {
      port: 9000,
      base: 'public',
      open: true,
      hostname: 'localhost',
      middleware: function (connect, options) {
        var middlewares = [];

        //add predix services proxy middlewares
        middlewares = middlewares.concat(proxy.init(config.proxy));

        //add predix uaa authentication middlewaress
        middlewares = middlewares.concat(auth.init(config.uaa));

        if (!Array.isArray(options.base)) {
          options.base = [options.base];
        }

        var directory = options.directory || options.base[options.base.length - 1];
        options.base.forEach(function (base) {
          // Serve static files.
          middlewares.push(connect.static(base));
        });

        // Make directory browse-able.
        middlewares.push(connect.directory(directory));

        return middlewares;
      }
    }
  }
};
