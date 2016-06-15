angular.module('starter.controllers')

.controller('AccountCtrl', function($scope,$ionicLoading,getData,ionicToast,initUser) {
	//个人中心页
	$scope.$on('$ionicView.beforeEnter',function(){
		$ionicLoading.show({
			template: 'Loading...'
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
			alert('changed')
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
	
})

.controller('orderlistCtrl', function($scope,$state,getData,initUser){
	$scope.$on('$ionicView.beforeEnter',function(){
		// 判断是否登陆
		// if(!initUser.isLogin){
		// 	$state.go('login')
		// }
	})
})

.controller('addressCtrl', function($scope,getData){

})

.controller('loginCtrl', function($scope,$state,$ionicHistory,getData,initUser,ionicToast){
	$scope.data = {
		'username': 'test',
		'password': 'test888'
	};
	$scope.settings = {
		savePassword: true
	};
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
							$state.go(fromParams,{}, {reload: true}); 
							//$scope.$ionicGoBack();
						})
					},0)
					
					//initUser.setLocal('session','sid:'+res.data.session.sid+',uid:'+res.data.session.uid+' ')
				}

			})  

		}
	}
})