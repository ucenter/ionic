angular.module('starter.controllers')

.controller('AccountCtrl', function($scope,$ionicLoading,getData,ionicToast,initUser) {
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

	getData.address.list().success(function(res){
		//console.log(res)
	});
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
	
})

.controller('orderlistCtrl', function($scope,$state,initUser){
	$scope.$on('$ionicView.beforeEnter',function(){
		// 判断是否登陆
		// if(!initUser.isLogin){
		// 	$state.go('login')
		// }
	})
	initUser.order.list(initUser).then(function(res){
		console.log('list',res)
		$scope.lists = res.data.data;
	})
	$scope.cancel = function(id){
		initUser.order.cancel(id).then(function(res){
			console.log('cancel',res)

		})
	}


})

.controller('addressCtrl', function($scope,initUser){
	initUser.address.list().success(function(res){
		console.log(res)
	})

})

.controller('loginCtrl', function($scope,$http,$rootScope,$state,$ionicHistory,getData,initUser,ionicToast){
	console.log($ionicHistory)
	$scope.data = {
		'username': 'test',
		'password': 'test888'
	};
	$scope.settings = {
		savePassword: true
	};

	$scope.back = function(){
		history.back();
	}

	$scope.login = function(){
		if (!$scope.data.username && !$scope.data.password) {
			ionicToast.show('用户名密码不难为空', 'middle', false, 2500);
			return false;    
		}else{
			getData.user.signin(
				{'name':$scope.data.username,'password':$scope.data.password}
			).success(function(res){
				//登陆成功
				console.log(res)
				if (res.status.succeed === 0) {
					ionicToast.show(res.status.error_desc, 'middle', false, 2500);
				}else{
					ionicToast.show('登录成功', 'middle', false, 2500);
					initUser.setSession(res.data.session.sid,res.data.session.uid);

					setTimeout(function(){
						var se = initUser.session;
						console.log(se);
						getData.user.info({
							"session":{
								"sid":se.sid,
								"uid":se.uid
							}
						})
						.success(function(res){
							console.log(res)
							initUser.setInfo(res.data)
							//$state.go('fromParams',{}, {reload: true}); 
							//$rootScope.$ionicGoBack();
							//$ionicHistory.goBack()
							history.back();
						})
					},0)					
				}
			})  
		}
	}

	$scope.wechatLogin = function(){
		Wechat.auth("snsapi_userinfo", function (response) {
		// you may use response.code to get the access token.
			//alert(JSON.stringify(response));
			var code = response.code;
			alert(code);
			getData.getWxToken(code).success(function(res){
				alert(JSON.stringify(res))
			})
		}, function (reason) {
			alert("Failed: " + reason);
		});
	}
})

.controller('regCtrl', ['$scope','initUser', function($scope,initUser){
	
}])