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

	$scope.$on('backbutton',function(){
		$state.go('tab/dash');
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
	//日期空间配置
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
		//ionicToast.show('openBrowser click', 'middle', false, 2500);   
		var ref = cordova.InAppBrowser.open('https://www.alipay.com/cooperate/gateway.do?_input_charset=utf-8&agent=C4335319945672464113&logistics_fee=0&logistics_payment=BUYER_PAY_AFTER_RECEIVE&logistics_type=EXPRESS&notify_url=http%3A%2F%2Ftest.shizhencaiyuan.com%2FPHP%2Frespond.php%3Fcode%3Dalipay&out_trade_no=20160628189491522&partner=2088911996618534&payment_type=1&price=48.00&quantity=1&return_url=http%3A%2F%2Ftest.shizhencaiyuan.com%2FPHP%2Frespond.php%3Fcode%3Dalipay&seller_email=admin%40simovision.cn&service=create_direct_pay_by_user&subject=2016062818949&sign=cebe270ea34689b722e10da5d22f5945&sign_type=MD5', '_blank', 'location=no');
		ref.show();
		var myCallback = function(event) { alert(JSON.stringify(event)); }
		ref.addEventListener('loadstart', myCallback);
		//ref.removeEventListener('loadstart', myCallback);		
		ref.addEventListener('loadstop', myCallback);
		ref.addEventListener('loaderror',myCallback);
		ref.addEventListener('exit',myCallback);		
	}

	
})


.controller('addressCtrl', function($scope,$rootScope,$state,$ionicModal,$ionicListDelegate,$ionicHistory,$cordovaToast,ionicToast,initUser){
	$scope.shouldShowDelete = true;
	//$scope.shouldShowReorder = false;
	$scope.listCanSwipe = true;
    $ionicListDelegate.showDelete(true);
	
	initUser.address.list().success(function(res){
		console.log('地址列表',res)
		if (res.status.succeed) {
			$scope.list = res.data;
		}else{
			ionicToast.show(res.status.error_desc, 'middle', false, 2500)
			//$cordovaToast.show(res.status.error_desc, 'short', 'center')
			//$state.go('login')
		}
	})

	$scope.$on('backbutton',function(){
		$state.go('account');
	})

	$scope.address = function(){
		$ionicModal.fromTemplateUrl('templates/account/address-modal.html',{            
			scope: $scope,
			animation:'slide-in-up'
		}).then(function(modal){
			$scope.modal = modal;
			$scope.modal.show();
		})		
	}

	$scope.closeModal = function() {
		$scope.modal.hide().then(function(){
			$scope.modal.remove();			
		})
	};	
	$scope.$on('$destroy', function() {
		//$scope.modal.remove();
	});	

})


.controller('regCtrl', ['$scope','initUser', function($scope,initUser){
	
}])