angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http) {
  $scope.data = [];
  $scope.list = [];
  var url = 'http://test.shizhencaiyuan.com/PHP/?url=';
  $http.post(url+'home/data').success(function(res){
    console.log('homeData',res)
    if (res.status.succeed) {
      $scope.data = res.data;
      $http.post(url+'home/category').success(function(res){
        console.log('homeCategory',res)
        if (res.status.succeed) {
          $scope.list = res.data;
        }
      })       
    }
  });

})

.controller('ChatsCtrl', function($scope,category, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    
  });
  $scope.cates = category.all().data;

})

.controller('goodListCtrl', function($scope,$http,$stateParams,$ionicHistory, search){
    $scope.$on('$ionicView.enter', function(e) { console.log(e) });
    $scope.goBack = function() {
      $ionicHistory.goBack();
    };
    $scope.listid = $stateParams.id;
    var data = {"filter":{
      "keyword": "","category_id": "","price_range":"","brand_id":"","sort_by":"id_desc",
      "pagination":{"page":"1","count":"100"}
    }};
    $http({method:'POST',url:'http://test.shizhencaiyuan.com/PHP/?url=/search',data:{"filter":{
      "keyword": "","category_id": "","price_range":"","brand_id":"","sort_by":"id_desc",
      "pagination":{"page":"1","count":"100"}
    }}})
    .success(function(res){
        console.log(res)
        $scope.data = res.data;
    })
    
    
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);

})

.controller('cartCtrl', function($scope){
  //购物车

})

.controller('goodDetailCtrl', function($scope,$stateParams){
  $scope.good = $stateParams.id;


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  
});
