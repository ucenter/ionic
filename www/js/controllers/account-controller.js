angular.module('starter.controllers')

.controller('AccountCtrl', function($scope,$rootScope,$ionicLoading,getData,ionicToast,initUser) {
	//个人中心页
	$scope.$on('$ionicView.beforeEnter',function(){
		$ionicLoading.show({
			template: '加载中...'
		}).then(function(){
			console.log("The loading indicator is now displayed",initUser);
		});
	})
	$scope.$on('$ionicView.enter',function(){
		$ionicLoading.hide();
	})

	$scope.initUser = initUser;
	if(initUser.session.sid){
		console.log('会员已经登陆',initUser)
		$scope.isLogin = true;					
	}else{
		$scope.isLogin = false;    
	};

	//监听全局用户
	$scope.$watch('initUser',function(newV,oldV){
		if (newV !== oldV) {
			//alert('changed')
			if (initUser.session.sid) {
				$scope.isLogin = true;
			}else{
				$scope.isLogin = false;
			}
		}
	},true)
	

	$scope.settings = {
		enableFriends: true
	};

	// getData.address.list().success(function(res){
	// 	//console.log(res)
	// });
	$scope.showToast = function(){
		ionicToast.show('init', 'middle', false, 2500);    
	}

	$scope.loginOut = function(){
		initUser.loginOut();
		ionicToast.show('退出', 'middle', false, 2500);
	}


	//日期控件
	var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
	var monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	var datePickerCallback = function (val) {
	    if (typeof(val) === 'undefined') {
	        console.log('No date selected');
	    } else {
	        console.log('Selected date is : ', val);
	        $scope.datepickerObject.inputDate = val;
	    }
	};
	$scope.datepickerObject = {
	    titleLabel: '日期选择',  //Optional
	    todayLabel: '今天',  //Optional
	    closeLabel: '取消',  //Optional
	    setLabel: '确定',  //Optional
	    setButtonType: 'button-calm',  //Optional
	    todayButtonType: 'button-calm',  //Optional
	    closeButtonType: 'button-calm',  //Optional
	    inputDate: new Date(),    //Optional
	    mondayFirst: false,    //Optional
	    //disabledDates: disabledDates, //Optional
	    weekDaysList: weekDaysList,   //Optional
	    monthList: monthList, //Optional
	    templateType: 'modal', //Optional
	    modalHeaderColor: 'bar-calm', //Optional
	    modalFooterColor: 'bar-calm', //Optional
	    from: new Date(),   //Optional
	    to: new Date(2018, 12, 31), //Optional
	    callback: function (val) {    //Mandatory
	        datePickerCallback(val);
	    }
	};	


	$scope.openBrowser = function(){
		ionicToast.show('openBrowser click', 'middle', false, 2500);   
		var ref = cordova.InAppBrowser.open('http://m.baidu.com', '_blank', 'location=yes');
		ref.show();
	}

	
})

.controller('orderlistCtrl', function($scope,$rootScope,$state,$ionicLoading,$ionicPopup,$timeout,$cordovaInAppBrowser,ionicToast,initUser){
	// $scope.$on('$ionicView.beforeEnter',function(){
	// 	判断是否登陆
	// 	if(!initUser.isLogin){
	// 		$state.go('login')
	// 	}
	// })
	$scope.$on('$ionicView.beforeEnter',function(){
		$ionicLoading.show({
			template: '加载中...'
		}).then(function(){
			console.log("The loading indicator is now displayed",initUser);
		});
	})
	// $scope.$on('$ionicView.enter',function(){
	// 	$ionicLoading.hide();
	// })

	initUser.order.list(initUser).then(function(res){
		ionicToast.show('订单请求成功', 'middle', false, 2500); 
		console.log('list',res)		
		if (res.data.status.succeed) {
			$scope.lists = res.data.data;			
		}else{
			alert(res.data.status.error_desc)
		}
	},function(res){
		alert('网络错误')
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

	document.addEventListener(function () {
		$cordovaInAppBrowser.open('https://www.alipay.com/cooperate/gateway.do?_input_charset=utf-8&agent=C4335319945672464113&logistics_fee=0&logistics_payment=BUYER_PAY_AFTER_RECEIVE&logistics_type=EXPRESS&notify_url=http%3A%2F%2Ftest.shizhencaiyuan.com%2FPHP%2Frespond.php%3Fcode%3Dalipay&out_trade_no=20160628189491522&partner=2088911996618534&payment_type=1&price=48.00&quantity=1&return_url=http%3A%2F%2Ftest.shizhencaiyuan.com%2FPHP%2Frespond.php%3Fcode%3Dalipay&seller_email=admin%40simovision.cn&service=create_direct_pay_by_user&subject=2016062818949&sign=cebe270ea34689b722e10da5d22f5945&sign_type=MD5', '_blank', options)
			.then(function(event) {
				// success
			})
			.catch(function(event) {
				// error
			});

		$cordovaInAppBrowser.close();
	}, false);

	$rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
		// insert CSS via code / file
		$cordovaInAppBrowser.insertCSS({
			code: 'body {background-color:blue;}'
		});

		// insert Javascript via code / file
		$cordovaInAppBrowser.executeScript({
			//file: 'script.js'
		});
	});	
	$rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){alert(e)  });
  	$rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){alert(e)  });

})

.controller('addressCtrl', function($scope,$ionicListDelegate,initUser){
	$scope.shouldShowDelete = true;
	//$scope.shouldShowReorder = false;
	$scope.listCanSwipe = true;
    $ionicListDelegate.showDelete(true);
	
	initUser.address.list().success(function(res){
		console.log('地址列表',res)
		if (res.status.succeed) {
			$scope.list = res.data;
		}
	})

})


.controller('regCtrl', ['$scope','initUser', function($scope,initUser){
	
}])