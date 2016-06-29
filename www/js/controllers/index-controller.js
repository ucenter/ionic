angular.module('starter.controllers')
.controller('indexCtrl', function($scope,$ionicSlideBoxDelegate,$rootScope,$ionicLoading,getData,initUser) {
	//首页

	// $scope.options = {
	// 	loop: false,
	// 	effect: 'fade',
	// 	speed: 500
	// }
	// $scope.$on('$ionicView.beforeEnter',function(){
	// 	$ionicLoading.show({
	// 		template: '加载中...'
	// 	}).then(function(){
	// 		console.log("The loading indicator is now displayed",initUser);
	// 	});
	// })	
	$scope.$on('$ionicView.enter',function(){
		$ionicLoading.hide();
	})

	console.log('首页',initUser)

	getData.homeData().success(function(res){
		console.log('首页数据',res)
		
		getData.homeCategory().success(function(res2){
			console.log('首页分类',res2)
			$scope.data = res.data;
			$scope.list = res2.data;
			$ionicSlideBoxDelegate.update()
		})    

	});
	$ionicSlideBoxDelegate.update()

	$scope.focus = function(e){
		console.log('focus',e)
	}

})