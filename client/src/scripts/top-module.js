'use strict';

angular.module('top',[ ])
  .controller('TopController', function ($scope, $http) {
    $scope.title = 'Top';
    $http.get('/notes').success(function (data) {console.log(data), function () {console.log('error')}});
  });
