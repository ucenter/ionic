angular.module('starter.controllers')
.controller('indexCtrl', function($scope,$ionicSlideBoxDelegate,getData,initUser) {
	//首页

	// $scope.options = {
	// 	loop: false,
	// 	effect: 'fade',
	// 	speed: 500
	// }

	console.log('首页',initUser)
	// $scope.data = [];
	// $scope.list = [];
	getData.homeData().success(function(res){
		console.log('首页数据',res)
		
		if (res.status.succeed) {
			$scope.data = res.data;

			getData.homeCategory().success(function(res){
				console.log('首页分类',res)
				if (res.status.succeed) {
					$scope.list = res.data;
					$ionicSlideBoxDelegate.update()
				}
			})    
		}
	});
	$scope.focus = function(e){
		console.log('focus',e)
	}

})