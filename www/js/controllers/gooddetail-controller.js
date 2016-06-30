angular.module('starter.controllers')
.controller('goodDetailCtrl', function($scope,$ionicSlideBoxDelegate,$ionicHistory,$state,$stateParams,getData,cart,initUser,ionicToast){
	//商品详情页

	$scope.$on('$ionicView.enter',function(){
		$ionicLoading.hide();
		$ionicSlideBoxDelegate.update()
	})

	$scope.goodid = $stateParams.id;
	var arg = {'json':JSON.stringify({'goods_id':$stateParams.id,'session':{'uid':'','sid':''}})};
	getData.good(arg).success(function(res){
		console.log('商品信息',res)
		$scope.data = res.data;	
		
		getData.goodDesc({"goods_id":res.data.id}).success(function(resD){
			console.log('商品详情',resD)
			$scope.detail = resD.data.replace(/src="/g,'src="http://test.shizhencaiyuan.com/')
			$ionicSlideBoxDelegate.update();//激活幻灯
		})
	})
	$scope.goBack = function(){
		//$ionicHistory.goBack();
		//history.back();
		//$ionicHistory.viewHistory();
		console.log($state)
		$state.reload()
	}
	$scope.addCart = function(){
		cart.add(initUser,'224','2','').success(function(res){
			console.log(res)
			ionicToast.show('已加入购物车', 'middle', false, 2500);    
		})
	}
	$scope.$on('backbutton',function(){

	})

})