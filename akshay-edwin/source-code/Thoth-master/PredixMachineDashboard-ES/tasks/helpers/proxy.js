var auth = require('./auth');
var httpProxy = require('http-proxy-middleware');

var serviceProxy = {
  init: function (proxyConfig) {
    return this.getMiddlewareRoutes(proxyConfig);
  },
  getMiddlewareRoutes : function(proxyConfig){
    var middlewares = [];
    var routes = Object.keys(proxyConfig);
    //get access token here
    middlewares.unshift(function (req, res, next) {
      var urlFound = false;
      var i = 0;
      if (req.url.match('/api')) {
        urlFound = false;
        i = 0;
        while (!urlFound) {
          if (req.url.match(routes[i])) {
            if(proxyConfig[routes[i]].instanceId == '92f8b9c6-153c-47e0-9cf8-530c9d661c48'){
              req.headers['authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI0NTNmYzQ1MTgwYWM0NmVjYWE2Njc2NjE2YjdlNzA4ZiIsInN1YiI6ImFwcF9jbGllbnRfaWQiLCJzY29wZSI6WyJ1YWEucmVzb3VyY2UiLCJvcGVuaWQiLCJ1YWEubm9uZSIsInRpbWVzZXJpZXMuem9uZXMuOTJmOGI5YzYtMTUzYy00N2UwLTljZjgtNTMwYzlkNjYxYzQ4LnVzZXIiLCJ0aW1lc2VyaWVzLnpvbmVzLjkyZjhiOWM2LTE1M2MtNDdlMC05Y2Y4LTUzMGM5ZDY2MWM0OC5xdWVyeSIsInByZWRpeC1hc3NldC56b25lcy40NzYyNzQ4OC01NDUwLTQ4MWQtYTYwYS1hNDZkOTNhNzAyZmMudXNlciIsInRpbWVzZXJpZXMuem9uZXMuOTJmOGI5YzYtMTUzYy00N2UwLTljZjgtNTMwYzlkNjYxYzQ4LmluZ2VzdCJdLCJjbGllbnRfaWQiOiJhcHBfY2xpZW50X2lkIiwiY2lkIjoiYXBwX2NsaWVudF9pZCIsImF6cCI6ImFwcF9jbGllbnRfaWQiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6Ijg1YzBmNTJkIiwiaWF0IjoxNDc5NDUzOTE3LCJleHAiOjE0Nzk0OTcxMTcsImlzcyI6Imh0dHBzOi8vZjVlYmE1OGUtNDc5OS00NTBhLThiN2UtM2RjNTg5N2EzMGQ4LnByZWRpeC11YWEucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiZjVlYmE1OGUtNDc5OS00NTBhLThiN2UtM2RjNTg5N2EzMGQ4IiwiYXVkIjpbInRpbWVzZXJpZXMuem9uZXMuOTJmOGI5YzYtMTUzYy00N2UwLTljZjgtNTMwYzlkNjYxYzQ4IiwidWFhIiwicHJlZGl4LWFzc2V0LnpvbmVzLjQ3NjI3NDg4LTU0NTAtNDgxZC1hNjBhLWE0NmQ5M2E3MDJmYyIsIm9wZW5pZCIsImFwcF9jbGllbnRfaWQiXX0.YzHRZEzQ3q5mBXlprELi8HXK7xQn6LSagqcdEy2n6GxiMa6csYIeFmG-8aH7Mud51Qn0lmOCOYxZXub70ga5UdFZxlEDX1ThrIx1aJ_toBi3kYttM-YJ8u7nT6EQVN3vIl_vsCdLnI7vjRzFqslVrWe93aT7bW-LcxLZuEixbbOJLK7SyP7fe0e4LCXQkYaP5P_sNqay0wxl44fzVbfGrC9zO0gYmaKjfwK2mrap2eEmQtbT8h32x_4yLrjltNP8OltlxPj2rcEBN0VO9wjW-NuXqP2CL22eEoVF1EoYkmT9ZBKtu8Rgx11rW8s9Ep_VvfN57lPQDoBBvhOXEaotLA';
            }else{
              req.headers['authorization'] = auth.accessToken;
            }
            req.headers['predix-zone-id'] = proxyConfig[routes[i]].instanceId;
            console.log('proxy url', req.url);
            console.log('proxy headers', req.headers);
            urlFound = true;
          }
          i++;
          if (i >= routes.length) {
            urlFound = true;
          }
        }
        next();
      } else {
        next();
      }
    });

    var agent,
        corporateProxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
    if (corporateProxyServer) {
        agent = require('https-proxy-agent');
    }
    routes.forEach(function(r) {
        var proxyOptions = {
            target: proxyConfig[r].url,
            changeOrigin: true,
            logLevel: 'debug'
        };
        if (proxyConfig[r].pathRewrite) {
            proxyOptions.pathRewrite = proxyConfig[r].pathRewrite;
        }
        if (corporateProxyServer) {
            proxyOptions.agent = agent(corporateProxyServer);
        }

        middlewares.push(httpProxy(r, proxyOptions));
    });

    return middlewares;
  }
};

module.exports = serviceProxy;
