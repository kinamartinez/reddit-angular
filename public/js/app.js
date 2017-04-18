const app = angular.module('rereddit', ['ui.router']);

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/templates/home.html',
            controller: 'PostController',
            resolve: {
                posts: function ($http) { // posts es lo que vamos a usar en el postController para acceder a la data
                    return $http.get('/post'); // post es la ruta que le dimos en el server.js
                }
            }
        })

        .state('comment', {
            url: '/posts/:id',
            templateUrl: '/templates/comments.html',
            controller: 'CommentController',
            resolve: {
                relevantPost: ["postFactory", "$stateParams", "$http", function (postFactory, $stateParams, $http) {
                    var postId = $stateParams.id;
                    return $http.get("/post/" + postId).then(function (theWholePost) {
                        // console.log("the next obj comes from app.js");
                        // console.log(theWholePost.data);
                        return theWholePost.data;
                    })
                }]
            }
        })

        .state('login', {
            url: '/login',
            templateUrl: '/templates/login.html',
            controller: 'AuthController'
        })
        .state('register', {
            url: '/register',
            templateUrl: '/templates/register.html',
            controller: 'AuthController'
        });

    $urlRouterProvider.otherwise('home');

}]);
