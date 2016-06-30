angular.module('starter.controllers')

.controller('orderlistCtrl', function($scope,$rootScope,$state,$ionicLoading,$ionicPopup,$timeout,$cordovaInAppBrowser,ionicToast,initUser){
	// $scope.$on('$ionicView.beforeEnter',function(){
	// 	判断是否登陆
	// 	if(!initUser.isLogin){
	// 		$state.go('login')
	// 	}
	// })
	// $scope.$on('$ionicView.beforeEnter',function(){
	// 	$ionicLoading.show({
	// 		template: '加载中...'
	// 	}).then(function(){
	// 		console.log("The loading indicator is now displayed",initUser);
	// 	});
	// })
	// $scope.$on('$ionicView.enter',function(){
	// 	$ionicLoading.hide();
	// })
	$ionicLoading.show({template: '加载中...'});
	initUser.order.list(initUser).success(function(res){
		//ionicToast.show('订单请求成功', 'middle', false, 2500); 
		$ionicLoading.hide();
		console.log('list',res)		
		if (res.status.succeed) {
			$scope.lists = res.data;			
		}else{
			alert(res.status.error_desc)
		}
	},function(res){
		$ionicLoading.hide();
		//alert('网络错误')
		ionicToast.show('网络错误', 'middle', false, 2500); 
	})
	$scope.cancel = function(id){
		initUser.order.cancel(id).then(function(res){
			console.log('cancel',res)
		})
	}
	$scope.pay = function(id){
		initUser.order.pay(initUser, id).then(function(res){
			console.log(res)
			var link = res.data.data.pay_online;
			$scope.showPopup(link)
		},function(error){
			alert(error)
		})
	}

	$scope.showPopup = function(link) {
	  	$scope.data = {};

		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			template: link,
			title: '去支付',
			//subTitle: 'Please use normal things',
			scope: $scope,
			buttons:[{text: 'cancel'}]
			// buttons: [
			//   { text: 'Cancel' },
			//   {
			//     text: '<b>Save</b>',
			//     type: 'button-positive',
			//     onTap: function(e) {
			//       if (!$scope.data.wifi) {
			//         //don't allow the user to close unless he enters wifi password
			//         e.preventDefault();
			//       } else {
			//         return $scope.data.wifi;
			//       }
			//     }
			//   }
			// ]
		});

		myPopup.then(function(res) {
			console.log('Tapped!', res);
		});
		// $timeout(function() {
		// 	myPopup.close(); //close the popup after 3 seconds for some reason
		// }, 10000);
	};

	$scope.openBrowser = function(){
		$cordovaInAppBrowser.open('https://www.alipay.com/cooperate/gateway.do?_input_charset=utf-8&agent=C4335319945672464113&logistics_fee=0&logistics_payment=BUYER_PAY_AFTER_RECEIVE&logistics_type=EXPRESS&notify_url=http%3A%2F%2Ftest.shizhencaiyuan.com%2FPHP%2Frespond.php%3Fcode%3Dalipay&out_trade_no=20160628189491522&partner=2088911996618534&payment_type=1&price=48.00&quantity=1&return_url=http%3A%2F%2Ftest.shizhencaiyuan.com%2FPHP%2Frespond.php%3Fcode%3Dalipay&seller_email=admin%40simovision.cn&service=create_direct_pay_by_user&subject=2016062818949&sign=cebe270ea34689b722e10da5d22f5945&sign_type=MD5', 
			'_blank', {
			location: 'no',
      		clearcache: 'yes',
      		toolbar: 'yes'
		}).then(function(event) {
				// success
				//ionicToast.show(JSON.stringify(event), 'middle', false, 2500);
				alert(JSON.stringify(event)) 
		}).catch(function(event) {
				// error
				ionicToast.show(JSON.stringify(event), 'middle', false, 2500); 
		});

		//$cordovaInAppBrowser.close();		
		$scope.$on('$cordovaInAppBrowser:loaderror',function(e,event){
			alert(JSON.stringify(event))
		})	
		$scope.$on('$cordovaInAppBrowser:exit',function(e,event){
			alert(JSON.stringify(event))
		})
		$scope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
			$timeout(function(){
				$cordovaInAppBrowser.insertCSS({
					code: 'body {background-color:blue;}'
				});			
			},2000)
		})			
	}
	// document.addEventListener(function () {
	// 	$cordovaInAppBrowser.open('https://www.alipay.com/cooperate/gateway.do?_input_charset=utf-8&agent=C4335319945672464113&logistics_fee=0&logistics_payment=BUYER_PAY_AFTER_RECEIVE&logistics_type=EXPRESS&notify_url=http%3A%2F%2Ftest.shizhencaiyuan.com%2FPHP%2Frespond.php%3Fcode%3Dalipay&out_trade_no=20160628189491522&partner=2088911996618534&payment_type=1&price=48.00&quantity=1&return_url=http%3A%2F%2Ftest.shizhencaiyuan.com%2FPHP%2Frespond.php%3Fcode%3Dalipay&seller_email=admin%40simovision.cn&service=create_direct_pay_by_user&subject=2016062818949&sign=cebe270ea34689b722e10da5d22f5945&sign_type=MD5', '_blank', options)
	// 		.then(function(event) {
	// 			// success
	// 		})
	// 		.catch(function(event) {
	// 			// error
	// 		});

	// 	$cordovaInAppBrowser.close();
	// }, false);

	// $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
	// 	// insert CSS via code / file
	// 	$cordovaInAppBrowser.insertCSS({
	// 		code: 'body {background-color:blue;}'
	// 	});

	// 	// insert Javascript via code / file
	// 	$cordovaInAppBrowser.executeScript({
	// 		//file: 'script.js'
	// 	});
	// });	
	// $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){alert(e)  });
 //  	$rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){alert(e)  });

})