app.controller('NavCtrl', ['$rootScope','$scope', 'authFactory', function ($rootScope, $scope, authFactory) {



    const errorHandler = function (err) {
        console.log(err)
    };
    authFactory.getCurrentUser()
        .then(function (user) {
            $rootScope.currentUser = user
        })
        .catch(errorHandler)
    ;


    $scope.logout = function () {
        authFactory.logout().then(function (response) {
            console.log(response);
            $rootScope.currentUser = null;
        })
    };
}]);