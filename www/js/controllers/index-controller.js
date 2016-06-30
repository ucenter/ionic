angular.module('starter.controllers')
.controller('indexCtrl', function($scope,$rootScope,$state,$ionicSlideBoxDelegate,$ionicLoading,$cordovaGeolocation,$cordovaToast,ionicToast,getData,initUser) {
	//首页

	$scope.options = {
		loop: true,
		effect: 'fade',
		speed: 500
	}
	// $scope.$on('$ionicView.beforeEnter',function(){
	// 	$ionicLoading.show({
	// 		template: '加载中...'
	// 	}).then(function(){
	// 		console.log("The loading indicator is now displayed",initUser);
	// 	});
	// })	
	$scope.$on('$ionicView.enter',function(){
		$ionicLoading.hide();
		$ionicSlideBoxDelegate.update()
	})
	$scope.doRefresh = function(){
		$state.reload();
	}

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

	//异步服务
	// var homeData = index.homeData();
	// var homeCategory = index.homeCategory();
	// homeData.then(function(res){
	// 	console.log(res)
	// 	$scope.data = res.data
	// 	return homeCategory
	// }).then(function(res2){
	// 	$scope.list = res2.data;
	// 	$ionicSlideBoxDelegate.update()
	// })
	

	$scope.focus = function(e){
		console.log('focus',e)
	}

	var posOptions = {timeout: 10000, enableHighAccuracy: false};
	$cordovaGeolocation.getCurrentPosition(posOptions)
	.then(function (position) {
		var lat  = position.coords.latitude;
		var long = position.coords.longitude;
		if(window.cordova && window.plugins){
			$cordovaToast.show('lat:'+lat+' long:'+long, 'long', 'center')			
		}else{
			ionicToast.show('lat:'+lat+' long:'+long, 'middle', false, 2500)
		}
	}, function(err) {
		$cordovaToast.show('get:'+JSON.stringify(err), 'long', 'center')
	});

	var watchOptions = {
		timeout : 3000,
		enableHighAccuracy: false // may cause errors if true
	};

	var watch = $cordovaGeolocation.watchPosition(watchOptions);
	watch.then(
		null,function(err) {
		// error
		$cordovaToast.show('watch:'+JSON.stringify(err), 'long', 'center')
	},function(position) {
		var lat  = position.coords.latitude
		var long = position.coords.longitude
		if (window.cordova && window.plugins) {
			$cordovaToast.show('lat:'+lat+' long:'+long, 'long', 'center')
		}else{
			ionicToast.show('lat:'+lat+' long:'+long, 'middle', false, 2500)
		}
	});
	$scope.$on('$destroy',function(){
		watch.clearWatch();		
	})


})