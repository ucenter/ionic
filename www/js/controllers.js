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

.controller('goodListCtrl', function($scope,$http,$stateParams,$ionicHistory,$ionicNavBarDelegate, search){
    $scope.$on('$ionicView.enter', function(e) { 
      console.log(e) 
      console.log($ionicNavBarDelegate)
    });  
    $scope.goBack = function() {
      //$ionicHistory.goBack();
      window.history.back();
    };

    $scope.listid = $stateParams.id;
    $scope.data = [];

    $scope.loadMore = function() {
      $http.post('/more-items').success(function(items) {
        useItems(items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.$on('$stateChangeSuccess', function() {
      $scope.loadMore();
    });

    var data = {
        "filter":{
            "keyword": "蔬菜","category_id": $stateParams.id,"price_range":"","brand_id":"","sort_by":"id_desc"
        },
        "pagination":{"page":"1","count":"100"}
    };

    $http({
      url:'http://test.shizhencaiyuan.com/PHP/?url=/search',
      method:"POST",
      dataType:'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    })
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

.controller('goodDetailCtrl', function($scope,$stateParams,$http,getData){
  $scope.goodid = $stateParams.id;
  var arg = {'json':JSON.stringify({'goods_id':$stateParams.id,'session':{'uid':'','sid':''}})};
  getData.good(arg).success(function(res){
    console.log(res)
    $scope.data = res.data;
  })
  // $http({
  //   method:'POST',
  //   url:'http://test.shizhencaiyuan.com/PHP/?url=/goods',
  //   headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
  //   data: arg
  // }).success(function(res){
  //   console.log(res)
  // })

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  
});
