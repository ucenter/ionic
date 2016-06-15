angular.module('starter.controllers')
.controller('DashCtrl', function($scope,$http,getData,initUser) {
	//首页
	console.log('首页',initUser)
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