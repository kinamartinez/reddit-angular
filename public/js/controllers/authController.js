app.controller('AuthController', ['$rootScope', '$scope','authFactory','$state', function($rootScope, $scope, authFactory, $state) {
    $scope.register = function() {
        authFactory.register($scope.user)
            .then(function(user) {
                $rootScope.currentUser = user;
                $state.go('home');
            }, function(err) {
                alert(err.data.message);
            });
    };
    $scope.login = function() {
        authFactory.login($scope.user)
            .then(function(user) {
                $rootScope.currentUser = user;
                $state.go('home');
            }, function(err) {
                alert(err.data);
            });
    }
}]);