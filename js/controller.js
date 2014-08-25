var app = angular.module('promari', []);

app.controller('MainController', function ($scope,$http) {
  $http.get('periodos.json').success(function(data) {
    $scope.periodos = data;
  });
});