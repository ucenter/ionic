angular.module('starter.controllers', ['ngAnimate'])

.controller('DashCtrl', function($scope,$http,getData) {
  //首页
  $scope.data = [];
  $scope.list = [];
  getData.homeData().success(function(res){
      console.log('首页数据',res)
      if (res.status.succeed) {
          $scope.data = res.data;
          getData.homeCategory().success(function(res){
              console.log('首页分类',res)
              if (res.status.succeed) {
                $scope.list = res.data;
              }
          })    
      }
  });

})

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

.controller('goodListCtrl', function($scope,$http,$stateParams,$ionicHistory,$ionicNavBarDelegate, getData){
    //商品列表页
    $scope.$on('$ionicView.enter', function(e) { 
      console.log(e) 
      console.log($ionicNavBarDelegate)
    });  
    $scope.goBack = function() {
      //$ionicHistory.goBack();
      if (window.history.length > 2) {
        window.history.back();        
      }else{

      }
    };

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

.controller('AccountCtrl', function($scope,getData,init,ionicToast) {
  //个人中心页
  if(init.user.session){
    $scope.isLogin = true
  }else{
    $scope.isLogin = false;    
  }
  $scope.settings = {
    enableFriends: true
  };
  getData.address.list().success(function(res){
    //console.log(res)
  })
  console.log(init.user)
  $scope.showToast = function(){
    ionicToast.show('init', 'middle', false, 2500);    
  }

})

.controller('orderlistCtrl', function($scope,getData,init){

})

.controller('addressCtrl', function($scope,getData,init){

})

.controller('loginCtrl', function($scope,$ionicHistory,getData,init,ionicToast){
    $scope.data = {};
    $scope.login = function(){
      if (!$scope.data.username && !$scope.data.password) {
        ionicToast.show('用户名密码不难为空', 'middle', false, 2500);    
      }else{
          getData.user.signin({
            'json':JSON.stringify({'name':$scope.data.username,'password':$scope.data.password})
          }).success(function(res){
            console.log(res)
            if (res.status.succeed === 0) {
              ionicToast.show(res.status.error_desc, 'middle', false, 2500);

            }else{
              ionicToast.show('登录成功', 'middle', false, 2500);
              res.data.session
              init.setlocal('session','sid:'+res.data.session.sid+',uid:'+res.data.session.uid+' ')
              if (history.length > 2) {
                history.back();                
              }else{
                state.go('tab.account')
              }
            }

          })     
        
      }
    }
})
.controller('menuIndexCtrl', function($scope){
  
})


