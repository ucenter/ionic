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

.controller('goodDetailCtrl', function($scope,$stateParams,$http,getData,ionicToast){
  //商品详情页
  $scope.goodid = $stateParams.id;
  var arg = {'json':JSON.stringify({'goods_id':$stateParams.id,'session':{'uid':'','sid':''}})};
  getData.good(arg).success(function(res){
    console.log('商品信息',res)
    $scope.data = res.data;
    getData.goodDesc({"goods_id":res.data.id}).success(function(resD){
      console.log('商品详情',resD)
      $scope.detail = resD.data.replace(/src="/g,'src="http://test.shizhencaiyuan.com/')
    })
  })

  $scope.addCart = function(){
    ionicToast.show('已加入购物车', 'middle', false, 2500);    
  }

})


.controller('menuIndexCtrl', function($scope){
  
})


