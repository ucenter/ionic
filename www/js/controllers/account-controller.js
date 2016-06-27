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

.controller('orderlistCtrl', function($scope,$state,$ionicLoading,$ionicPopover,$ionicPopup,$timeout,initUser){
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
		console.log('list',res)
		$ionicLoading.hide();
		if (res.data.status.succeed == 1) {
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
		title: 'Enter Wi-Fi Password',
		subTitle: 'Please use normal things',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
		    text: '<b>Save</b>',
		    type: 'button-positive',
		    onTap: function(e) {
		      if (!$scope.data.wifi) {
		        //don't allow the user to close unless he enters wifi password
		        e.preventDefault();
		      } else {
		        return $scope.data.wifi;
		      }
		    }
		  }
		]
		});

		myPopup.then(function(res) {
			console.log('Tapped!', res);
		});

		$timeout(function() {
			myPopup.close(); //close the popup after 3 seconds for some reason
		}, 10000);
	};

})

.controller('addressCtrl', function($scope,initUser){
	initUser.address.list().success(function(res){
		console.log(res)
	})

})


.controller('regCtrl', ['$scope','initUser', function($scope,initUser){
	
}])