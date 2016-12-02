define(['angular', './sample-module', 'restangular'], function(angular, formsModule, restangular) {
    'use strict';
    return formsModule.controller('DashboardsESCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
      //$scope.tsReturn = px.dealer.httpRequest({ url: '/api/timeseries', method: 'POST', data: '{"start":"1h-ago", "tags":[{"name": "Light:Edison-gxg","limit":2000}]}', }).then(function(predixTimeSeriesData){
      var tsData1 = '';
      var tsData2 = '';
      var tsData3 = '';
      var tsData4 = '';

      function fetchData(startTime){
        px.dealer.httpRequest({
//          url: 'https://time-series-store-predix.run.aws-usw02-pr.ice.predix.io/v1/datapoints',
//          headers: {'predix-zone-id': '92f8b9c6-153c-47e0-9cf8-530c9d661c48', 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJmZjA5NWE2ZjRmNzg0YmJhYjMxY2QwNWM5YjhlMWNhZSIsInN1YiI6ImFwcF9jbGllbnRfaWQiLCJzY29wZSI6WyJ1YWEucmVzb3VyY2UiLCJvcGVuaWQiLCJ1YWEubm9uZSIsInRpbWVzZXJpZXMuem9uZXMuOTJmOGI5YzYtMTUzYy00N2UwLTljZjgtNTMwYzlkNjYxYzQ4LnVzZXIiLCJ0aW1lc2VyaWVzLnpvbmVzLjkyZjhiOWM2LTE1M2MtNDdlMC05Y2Y4LTUzMGM5ZDY2MWM0OC5xdWVyeSIsInByZWRpeC1hc3NldC56b25lcy40NzYyNzQ4OC01NDUwLTQ4MWQtYTYwYS1hNDZkOTNhNzAyZmMudXNlciIsInRpbWVzZXJpZXMuem9uZXMuOTJmOGI5YzYtMTUzYy00N2UwLTljZjgtNTMwYzlkNjYxYzQ4LmluZ2VzdCJdLCJjbGllbnRfaWQiOiJhcHBfY2xpZW50X2lkIiwiY2lkIjoiYXBwX2NsaWVudF9pZCIsImF6cCI6ImFwcF9jbGllbnRfaWQiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6Ijg1YzBmNTJkIiwiaWF0IjoxNDc5NzQxMzE4LCJleHAiOjE0Nzk3ODQ1MTgsImlzcyI6Imh0dHBzOi8vZjVlYmE1OGUtNDc5OS00NTBhLThiN2UtM2RjNTg5N2EzMGQ4LnByZWRpeC11YWEucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiZjVlYmE1OGUtNDc5OS00NTBhLThiN2UtM2RjNTg5N2EzMGQ4IiwiYXVkIjpbInRpbWVzZXJpZXMuem9uZXMuOTJmOGI5YzYtMTUzYy00N2UwLTljZjgtNTMwYzlkNjYxYzQ4IiwidWFhIiwicHJlZGl4LWFzc2V0LnpvbmVzLjQ3NjI3NDg4LTU0NTAtNDgxZC1hNjBhLWE0NmQ5M2E3MDJmYyIsIm9wZW5pZCIsImFwcF9jbGllbnRfaWQiXX0.E8Pn4PH5-mmDDxJDVNfQkF2k9_OQiEf2aEcAC1fuVQIWerdveD8slRu3bzMQR3dNW0SeNsMW1rChufS4TCXp8aEYDRfuz-TiueWmuauQf-hEqX8iBQG2uACKHPHKRXSsggMbJY8CQbe_K2cpphcC5rcA8Y7-jKo4c9XccLxi1bzanhKwcZ1KpJX-9lJUm6FosD9vV-ubN9STagheV6brTuQH6KQNRaJk4PvzBReJ5XZftCY_P8OBhm1P0eC7Rs8lzzhKRkO3f1aiDyyDeyKDk6CnSRlFhExrk5FpzHDx_fCKkFg3dZ8Z2eZ9cKZ6TlN0swMSKDfG-YCGbPXMihpYsg'},
          url: '/api/timeseries',
          method: 'POST',
          data: '{"start":"' + startTime + '", "tags":[{"name": "Light:TAE", "limit": 190000},{"name": "RotaryAngle:TAE", "limit": 190000},{"name": "Button:TAE", "limit": 190000}]}',
        }).then(function(predixTimeSeriesData){
          var arr1 = JSON.parse(JSON.stringify(predixTimeSeriesData.tags[0].results[0].values));
          var arr2 = JSON.parse(JSON.stringify(predixTimeSeriesData.tags[1].results[0].values));
          var arr3 = JSON.parse(JSON.stringify(predixTimeSeriesData.tags[2].results[0].values));
          //var arr4 = JSON.parse(JSON.stringify(predixTimeSeriesData.tags[3].results[0].values));

      //alert(arr5);//arr1.length
      if(arr1.length == 0){
        document.getElementById('nodata').style.display = "block";
      }else{
        for(let i=0; i< arr1.length; i++){
          tsData1 = tsData1 + '{' + '"x":' + arr1[i][0] + ',' + '"' + predixTimeSeriesData.tags[0].name + '":'+ arr1[i][1] + '}';
          tsData2 = tsData2 + '{' + '"x":' + arr2[i][0] + ',' + '"' + predixTimeSeriesData.tags[1].name + '":'+ arr2[i][1] + '}';
          tsData3 = tsData3 + '{' + '"x":' + arr3[i][0] + ',' + '"' + predixTimeSeriesData.tags[2].name + '":'+ arr3[i][1] + '}';
          //tsData4 = tsData4 + '{' + '"x":' + arr4[i][0] + ',' + '"' + predixTimeSeriesData.tags[3].name + '":'+ arr4[i][1] + '}';
          $scope.tsReturnLight = tsData1;
          $scope.tsReturnTemp = tsData2;
          $scope.tsReturnRotary = tsData3;
          //$scope.tsReturnButton = tsData4;
          if(i+1<arr1.length){
            tsData1 = tsData1 + ',';
            tsData2 = tsData2 + ',';
            tsData3 = tsData3 + ',';
            //tsData4 = tsData4 + ',';
          }
        }
      }
      });
      }

      $scope.changeStart = function(){
        //alert($scope.startTime);
        document.getElementById('select').style.display = "none";
        $scope.tsReturnTemp = fetchData($scope.startTime);
        $scope.tsReturnTemp = fetchData($scope.startTime);

      }
    }]);

});
