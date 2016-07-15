angular.module('starter.controllers')
.controller('loginCtrl', function($scope,$http,$rootScope,$state,$ionicHistory,$ionicLoading,getData,initUser,ionicToast){

	$scope.data = {
		'username': 'test',
		'password': 'test888'
	};
	$scope.settings = {
		savePassword: true
	};

	$scope.getCodeText = '获取验证码';

	$scope.getCode = function($event){
		$scope.isGetCode = true;
		console.log($event)
	}
	$scope.isGetCode = false;

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
							$ionicHistory.goBack()
							//history.back();
						})
					},0)					
				}
			})  
		}
	}

	$scope.wechatLogin = function(){
		$ionicLoading.show({
			template: '微信登录中...'
		})		
		Wechat.auth("snsapi_userinfo", function (response) {
		// you may use response.code to get the access token.
			//alert(JSON.stringify(response));
			//微信客户端授权
			//成功返回code
			var code = response.code;
			alert(code);
			//依据code获取access_token
			$ionicLoading.hide();
			getData.getWxToken(code).success(function(res){
				alert(JSON.stringify(res))
			})
		}, function (reason) {
			$ionicLoading.hide();
			alert("Failed: " + reason);
		});
	}
})