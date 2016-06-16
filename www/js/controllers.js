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



.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);

	})

.controller('cartCtrl', function($scope){
	//购物车

})

.controller('menuIndexCtrl', function($scope,getData){
	getData.menuCate().success(function(res){
		console.log(res)
		$scope.data = res.result
	})
})

.controller('menuListCtrl',function($scope,$rootScope,$state,$stateParams,$ionicModal,getData){
	console.log($state,$stateParams)
	$scope.data = [];
	$scope.detail = [];
	getData.menuList().success(function(res){
		console.log(res)
		$scope.data = res.result.data;
	})

	$ionicModal.fromTemplateUrl('templates/menu-detail-modal.html',{            
		scope: $scope,
		animation:'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	})

	$scope.goDetail = function(id){
		$scope.detail = $scope.data[id]
		console.log($scope.detail)
		$scope.modal.show();
	}
	$scope.closeModal = function() {
		$scope.modal.hide();
	};	
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.hBack = function(){
		history.back()    
	} 
	// $scope.$on('$ionicView.enter',function(){
	// 	$scope.name = $state.current.name 
	// 	console.log($scope.name)
	// })

})
.controller('menuDetailCtrl', function($scope,$state,$stateParams,getData,common){
	$scope.detail = [];
  $scope.back = function(){
    common.back();    
  }
	getData.search().success(function(res){

	})
})
