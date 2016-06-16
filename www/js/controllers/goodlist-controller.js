angular.module('starter.controllers')
.controller('goodListCtrl', function($scope,$http,$stateParams,$ionicNavBarDelegate, getData){
	//商品列表页
	$scope.$on('$ionicView.enter', function(e) { 
		console.log(e) 
		console.log($ionicNavBarDelegate)
	});  

	$scope.listid = $stateParams.id;
	$scope.data = [];
	$scope.page = 0;
	$scope.pageTotal = '';
	$scope.more = '';
	
	var data = {"json":JSON.stringify({
		"filter":{
			"keyword": "","category_id": $stateParams.id,"price_range":"","brand_id":"","sort_by":"id_desc"
		},
		"pagination":{"page":"1","count":"100"}
	})};

	$scope.loadMore = function() {

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
	$scope.goBack = function(){
		history.back();
	}


})