// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-toast'])

.run(function($ionicPlatform,$rootScope,$ionicHistory,$state) {

/*
    var needLoginView = ["tab.cart"];//需要登录的页面state
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, options){ 
        if(needLoginView.indexOf(toState.name)>=0&&!$rootScope.isLogin){//判断当前是否登录
            $state.go("login");//跳转到登录页
            event.preventDefault(); //阻止默认事件，即原本页面的加载
        }
    });
*/
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }


  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {


    //修正 $http post请求
    $httpProvider.defaults.transformRequest = function(obj){
      var str = [];
      for(var p in obj){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
      }
      return str.join("&");
    }
    $httpProvider.defaults.headers.post = {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    }

    $ionicConfigProvider.platform.ios.tabs.style('standard'); 
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

    $ionicConfigProvider.platform.ios.views.transition('ios'); 
    $ionicConfigProvider.platform.android.views.transition('android');


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('good',{
      url:'/good/:id',
      controller:'goodDetailCtrl',
      templateUrl: 'templates/good-detail.html'
  })
  .state('goodList', {
    url: '/goodlist/:id',
    templateUrl: 'templates/good-list.html',
    controller: 'goodListCtrl'
  })
  .state('tab.menu',{
      url:'/menu/index',
      views:{
        'tab-menu': {
          templateUrl: 'templates/menu-index.html',
          controller: 'menuIndexCtrl'   
        }
    }
  }) 
    .state('login',{
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })       
  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })   
    .state('tab.cart', {
      url: '/cart',
      views: {
        'tab-cart': {
          templateUrl: 'templates/tab-cart.html',
          controller: 'cartCtrl'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      cache: false,
      views: {
        'tab-account': {
          templateUrl: 'templates/account/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('tab.orderlist', {
      url: '/orderlist',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/tab-orderlist.html',
          controller: 'orderlistCtrl'
        }
      }
    })
    .state('tab.collect', {
      url: '/collect',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/tab-collect.html',
          controller: 'collectCtrl'
        }
      }
    })
    .state('tab.address', {
      url: '/address',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/tab-address.html',
          controller: 'addressCtrl'
        }
      }
    })
         

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});


