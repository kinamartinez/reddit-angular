app.factory('authFactory', function($http) {
    let auth = {};

    auth.currentUser = {};


    auth.register = function(user) {
        return $http.post('/auth/register', user)
            .then(function(response) {
                auth.currentUser.username = angular.copy(response.data)
            });
    };

    auth.login = function(user) {
        return $http.post('/auth/login', user)
            .then(function(response) {
                auth.currentUser.username = angular.copy(response.data)
            });
    };

    auth.getCurrentUser = function() {
        // console.log("getuser");
        return $http.get('/auth/currentUser')
            .then(function(response) {
                // console.log("back with User");
                // console.log(response);
                auth.currentUser.username = angular.copy(response.data)
            });
    };

    auth.logout = function(user) {
        return $http.get('/auth/logout')
            .then(function(response) {
                auth.currentUser.username = null;
            });
    };
    // console.log("hello");
    // console.log(auth.currentUser);

    return auth;
});