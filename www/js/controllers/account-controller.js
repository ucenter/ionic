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


.controller('addressCtrl', function($scope,$rootScope,$state,$ionicModal,$ionicPopup,$ionicListDelegate,$ionicHistory,$cordovaToast,$timeout,ionicToast,initUser,getData){
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = true;
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

	//初始化地址信息变量
	$scope.Add = {
		'consignee':'',
		'mobile':'',
		'provinceList':[],
		'province': '',
		'cityList':[],
		'city':'',
		'district':'',
		'address':'',
		'default':true
	}

	$scope.address = function(){
		$ionicModal.fromTemplateUrl('templates/account/address-modal.html',{            
			scope: $scope,
			animation:'slide-in-up'
		}).then(function(modal){
			$scope.modal = modal;
			$scope.modal.show()
			.then(function(){
				$scope.region(1).then(function(res){
					console.log(res)
					$scope.Add.provinceList = res.data.regions

				})
				$scope.changeCity = function(e){
					console.log(e,this)
					$scope.region(e).then(function(res){
						$scope.Add.cityList = res.data.regions;
					})
				}
				$scope.changeDis = function(e){
					console.log(e,this)
					$scope.region(e).then(function(res){
						$scope.Add.districtList = res.data.regions;
					})
				}								
			})
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

	$scope.submit = function(){
		console.log($scope.Add)
		initUser.address.add({
			'id': '',
			'name': $scope.Add.consignee,
			'email': '',
			'country': 1,
			'province': $scope.Add.province,
			'city': $scope.Add.city,
			'district': $scope.Add.district,
			'address': $scope.Add.address,
			'zipcode': '',
			'tel': '',
			'mobile': $scope.Add.mobile,
			'sign_building': '',
			'best_time': '',
			'default_address': $scope.Add.isDefault ? '1' : '0'
		}).success(function(res){
			if (res.status.succeed) {
				alert('地址增加成功')
				$scope.closeModal();
				$state.reload();
			}
		})
	}
	$scope.del = function(id){
		console.log(id)
		 var myPopup = $ionicPopup.show({
		    title: '确定要删除地址吗',
		    buttons: [
		      { text: '取消' },
		      {
		        text: '<b>删除</b>',
		        type: 'button-positive',
		        onTap: function(e) {
					initUser.address.del(id).success(function(res){
						console.log(res)
						if (res.status.succeed) {
							ionicToast.show('删除成功', 'middle', false, 2000)
							$timeout(function(){
								$state.reload();								
							},1000)
							  							
						}else{
							ionicToast.show('删除失败', 'middle', false, 2000)
						}
					})
		        }
		      }
		    ]
		  });
	}




	$scope.region = function(id){
		return getData.region(id)
	}

})


.controller('regCtrl', ['$scope','initUser','ionicToast', function($scope,initUser,ionicToast){
	//ionicToast.show('init', 'middle', false, 2500);    

	$scope.username = '13011191283';
	$scope.mobile = $scope.username;
	$scope.password = '123456';
	$scope.code;
	$scope.list=[];

	$scope.reg = function(){
		$scope.list.push(this.username)
		$scope.list.push(this.password)
		$scope.list.push(this.mobile);
		console.log($scope.list)

		var user = new AV.User();
		user.set("username", $scope.username);
		user.set("password", $scope.password);
		user.setMobilePhoneNumber($scope.username);
		user.signUp().then(function(res){
			console.log(res)
		},function(error){
			ionicToast.show(error, 'middle', false, 2000)
		})
		
	}

	$scope.getCode = function(){
		if ($scope.mobile && $scope.mobile.length == '11') {
			ionicToast.show('手机号格式不正确！', 'middle', false, 2500)
			return false;
		}
		AV.User.requestLoginSmsCode($scope.mobile).then(function (success) {

	  	}, function (error) {

	  	});
	}


}])