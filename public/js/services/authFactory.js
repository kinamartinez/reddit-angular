app.factory('authFactory', function ($http) {
    const auth = {};


    auth.register = function (user) {
        return $http.post('/auth/register', user)
            .then(function (response) {
                return response.data;
                // auth.currentUser.username = angular.copy(response.data)
            });
    };

    auth.login = function (user) {
        return $http.post('/auth/login', user)
            .then(function (response) {
                return response.data;
                // auth.currentUser.username = angular.copy(response.data);

            });
    };

    auth.getCurrentUser = function () {
        return $http.get('/auth/currentUser')
            .then(function (response) {
                return response.data;
                // auth.currentUser.username = angular.copy(response.data)
            });
    };

    auth.logout = function (user) {
        return $http.get('/auth/logout')
            .then(function (response) {
                return response;
                // auth.currentUser.username = null;
            });
    };


    return auth;
});