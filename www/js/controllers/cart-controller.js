angular.module('starter.controllers')

.controller('cartCtrl', function($scope,initUser,getData,cart){
	//购物车
 	$scope.shouldShowDelete = false;
 	$scope.shouldShowReorder = false;
 	$scope.listCanSwipe = false;
 	$scope.isChecked = false;
 	$scope.allCheck = false;
	$scope.items = [{}];
	$scope.total = 1;
	$scope.totalNum = 1;
	cart.list({
		'session':{
			'uid':initUser.session.uid,
			'sid':initUser.session.sid
		}
	}).success(function(res){
		console.log(res)
		if (res.status.succeed) {
			$scope.items = res.data;				
		}else{
			//console.log($scope.items[0].length == )
		}
	})

})