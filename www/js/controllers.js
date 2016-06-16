angular.module('starter.controllers', ['ngAnimate'])



.controller('ChatsCtrl', function($scope,getData) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    
  });
  getData.category().success(function(res){
    console.log('分类',res)
    $scope.cates = res.data;
  })


})

.controller('goodListCtrl', function($scope,$http,$stateParams,$ionicNavBarDelegate, getData){
    //商品列表页
    $scope.$on('$ionicView.enter', function(e) { 
      console.log(e) 
      console.log($ionicNavBarDelegate)
    });  

    $scope.listid = $stateParams.id;
    $scope.data = [];

    var data = {"json":JSON.stringify({
        "filter":{
            "keyword": "","category_id": $stateParams.id,"price_range":"","brand_id":"","sort_by":"id_desc"
        },
        "pagination":{"page":"1","count":"100"}
    })};

    $scope.loadMore = function() {
      // $http.post('/more-items').success(function(items) {
      //   useItems(items);
      //   $scope.$broadcast('scroll.infiniteScrollComplete');
      // });
      getData.search(data).success(function(res){
          console.log('商品查询列表',res)
          $scope.data = res.data;
      })
    };

    $scope.$on('$stateChangeSuccess', function() {
      $scope.loadMore();
    });

    $scope.doRefresh = function(){
      getData.search(data).success(function(res){
          console.log('商品查询列表',res)
          $scope.data = res.data;
      })     
      .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    }

    
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);

})

.controller('cartCtrl', function($scope){
  //购物车

})

.controller('menuIndexCtrl', function($scope,getData){
    getData.menuCate().success(function(res){
      console.log(res)
      $scope.data = res.result
    })
})

.controller('menuListCtrl',function($scope,$state,$stateParams,$ionicModal,getData){
    console.log($state,$stateParams)
    $scope.data = [];
    $scope.detail = [];
    getData.menuList().success(function(res){
      console.log(res)
      $scope.data = res.result.data;
    })

    $ionicModal.fromTemplateUrl('templates/menu-detail.html',{            
      scope: $scope,
      animation:'slide-in-up'
    }).then(function(modal){
      $scope.modal = modal;
    })

    $scope.goDetail = function(){
      $scope.modal.show();
    }
    $scope.$on('$ionicView.enter',function(){
      $scope.name = $state.current.name 
      console.log($scope.name)
    })
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });    
    
})




