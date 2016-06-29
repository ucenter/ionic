// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionicLazyLoad', 'starter.controllers', 'starter.services', 'ionic-toast','ionic-datepicker','ngCordova'])

.value('common',{
  back:function(){
    return window.history.back();
  }
})

.run(function($ionicPlatform,$rootScope,$ionicHistory,$state,$ionicLoading,$cordovaToast,ionicToast) {


    // var needLoginView = ["tab.cart"];//需要登录的页面state
    // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, options){ 
    //     if(needLoginView.indexOf(toState.name)>=0&&!$rootScope.isLogin){//判断当前是否登录
    //         $state.go("login");//跳转到登录页
    //         event.preventDefault(); //阻止默认事件，即原本页面的加载
    //     }
    // });

  $rootScope.$on('$stateChangeStart',function(){
      $ionicLoading.show({
        template: '加载中...'
      })
  });
  $rootScope.$on('$stateChangeSuccess',function(){
    $ionicLoading.hide();
  }); 

        var initiateUI = function() {
            try {
                window.plugins.jPushPlugin.init();
                getRegistrationID();
                if (device.platform != "Android") {
                    window.plugins.jPushPlugin.setDebugModeFromIos();
                    window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                } else {
                    $cordovaToast.show('initiateUI', 'long', 'bottom')
                    window.plugins.jPushPlugin.setDebugMode(true);
                    window.plugins.jPushPlugin.setStatisticsOpen(true);
                }
            } catch (exception) {
                console.log(exception);
            }
        };
        var getRegistrationID = function() {
          window.plugins.jPushPlugin.getRegistrationID(onGetRegistrationID);
        };
        var onTagsWithAlias = function(event) {
            try {
                console.log("onTagsWithAlias");
                var result = "result code:" + event.resultCode + " ";
                result += "tags:" + event.tags + " ";
                result += "alias:" + event.alias + " ";
                //$("#tagAliasResult").html(result);
                $cordovaToast.show(result, 'long', 'bottom')
            } catch (exception) {
                console.log(exception)
            }
        };        
        var onGetRegistrationID = function(data) {            
            try {
                console.log("JPushPlugin:registrationID is " + data);

                if (data.length == 0) {
                    var t1 = window.setTimeout(getRegistrationID, 1000);
                }
                //$("#registrationId").html(data);
                $cordovaToast.show(data, 'long', 'bottom')
            } catch (exception) {
                console.log(exception);
            }
        };  
        var onOpenNotification = function(event) {
            try {
                var alertContent;
                if (device.platform == "Android") {
                    alertContent = window.plugins.jPushPlugin.openNotification.alert;
                } else {
                    alertContent = event.aps.alert;
                }
                //alert("open Notification:" + alertContent);
                $state.go("message");
                $cordovaToast.show('onOpenNotification', 'long', 'center')
            } catch (exception) {
                console.log("JPushPlugin:onOpenNotification" + exception);
            }
        };  
        var onReceiveNotification = function(event) {
            try {
                var alertContent;
                if (device.platform == "Android") {
                    alertContent = window.plugins.jPushPlugin.receiveNotification.alert;
                } else {
                    alertContent = event.aps.alert;
                }
                //$("#notificationResult").html(alertContent);
                alert(alertContent)
                $cordovaToast.show('onReceiveNotification', 'long', 'bottom')
            } catch (exception) {
                console.log(exception)
            }
        };
        var onReceiveMessage = function(event) {
            try {
                var message;
                if (device.platform == "Android") {
                    message = window.plugins.jPushPlugin.receiveMessage.message;
                } else {
                    message = event.content;
                }
                //$("#messageResult").html(message);
                alert(message)
                $cordovaToast.show('onReceiveMessage', 'long', 'bottom')
            } catch (exception) {
                console.log("JPushPlugin:onReceiveMessage-->" + exception);
            }
        };   


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      (function(document){
        //极光推送
        document.addEventListener("deviceready", function(){    
          $cordovaToast.show('deviceready 加载', 'long', 'bottom')
          initiateUI();
        }, false);
        document.addEventListener("jpush.setTagsWithAlias", onTagsWithAlias, false);
        document.addEventListener("jpush.openNotification", onOpenNotification, false);
        document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
        document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);     

        
      })(document);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }


  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider,$cordovaInAppBrowserProvider) {

    // document.addEventListener(function () {
    //   $cordovaInAppBrowserProvider.setDefaultOptions({
    //     location: 'no',
    //     clearcache: 'no'
    //   })
    // }, false);

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

      //双击退出
      if (window.cordova && window.plugins && window.cordova.plugins.Toast){
          $ionicPlatform.registerBackButtonAction(function (e) {
              //判断处于哪个页面时双击退出
              if ($location.path() == '/tab/home') {
                  if ($rootScope.backButtonPressedOnceToExit) {
                      ionic.Platform.exitApp();
                  } else {
                      $rootScope.backButtonPressedOnceToExit = true;
                      cordova.plugins.Toast.showShortTop('再按一次退出系统');
                      setTimeout(function () {
                          $rootScope.backButtonPressedOnceToExit = false;
                      }, 2000);
                  }
              }
              else if ($ionicHistory.backView()) {
                  $ionicHistory.goBack();
              } else {
                  $rootScope.backButtonPressedOnceToExit = true;
                  cordova.plugins.Toast.showShortTop('再按一次退出系统');
                  setTimeout(function () {
                      $rootScope.backButtonPressedOnceToExit = false;
                  }, 2000);
              }
              e.preventDefault();
              return false;
          }, 101);
      }

    $ionicConfigProvider.scrolling.jsScrolling(false);//原生滚动

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
  .state('goodList', {
    url: '/goodlist/:id',
    templateUrl: 'templates/good-list.html',
    controller: 'goodListCtrl'
  })    
  .state('good',{
      url:'/good/:id',
      controller:'goodDetailCtrl',
      templateUrl: 'templates/good-detail.html'
  })
    .state('login',{
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    .state('register',{
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'regCtrl'
    })           
  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'indexCtrl'
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
    .state('orderlist', {
      url: '/orderlist',
      templateUrl: 'templates/account/tab-orderlist.html',
      controller: 'orderlistCtrl'
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
    .state('address', {
      url: '/address',
      templateUrl: 'templates/account/tab-address.html',
      controller: 'addressCtrl'
    })
    .state('message',{
      url:'/message',
      templateUrl: 'templates/message.html',
      controller: 'messageCtrl'
    })
  .state('tab.menuindex',{
      url:'/menuindex',
      cache: true,
      views:{
        'tab-menu': {
          templateUrl: 'templates/menu-index.html',
          controller: 'menuIndexCtrl'   
        }
    }
  })
  .state('menulist',{
      url:'/menulist/:id',
      cache:true,
      templateUrl: 'templates/menu-list.html',
      controller: 'menuListCtrl'   
  })
  .state('menudetail',{
      url:'/menudetail/:id',
      templateUrl: 'templates/menu-detail.html',
      controller: 'menuDetailCtrl'   
  })
  .state('demo',{
    url:'/demo',
    templateUrl: 'templates/demo.html',
    controller:'DemoCtrl'
  })             

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});


