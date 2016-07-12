angular.module('starter.controllers')

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