angular.module('starter.controllers')
.controller('goodDetailCtrl', function($scope,$ionicHistory,$state,$stateParams,getData,ionicToast){
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
	$scope.goBack = function(){
		$ionicHistory.goBack();
	}
	$scope.addCart = function(){
		ionicToast.show('已加入购物车', 'middle', false, 2500);    
	}

})