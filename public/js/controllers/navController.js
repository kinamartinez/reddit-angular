app.controller('NavCtrl', ['$scope','authFactory', function($scope, authFactory) {
    $scope.currentUser = authFactory.currentUser;
    authFactory.getCurrentUser();
    $scope.logout = authFactory.logout;

}]);