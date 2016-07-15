angular.module('starter.controllers')

.controller('addressCtrl', function($scope,$rootScope,$state,$ionicModal,$ionicPopup,$ionicListDelegate,$ionicHistory,$cordovaToast,$timeout,ionicToast,initUser,getData){
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = true;
	$scope.listCanSwipe = true;
    $ionicListDelegate.showDelete(true);
	console.log(initUser.isLogin)	

	initUser.address.list().success(function(res){
		console.log('地址列表',res)
		if (res.status.succeed) {
			$scope.list = res.data;
		}else{
			ionicToast.show(res.status.error_desc, 'middle', false, 2500)
			//$cordovaToast.show(res.status.error_desc, 'short', 'center')
			$state.go('login')
		}
	})



	$scope.address = function(){
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

	//删除地址
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

	//设置默认地址
	$scope.setDefault = function(id){
		initUser.address.setDefault(id).success(function(res){
			console.log(res)
			if(res.status.succeed == 1){
				$cordovaToast.showShortCenter('设置成功').then(function(success) {
					$state.reload();					
				}, function (error) {
					alert(error)
				});
			}
		}).error(function(err){
			$cordovaToast.showShortCenter('网络错误')
		})
	}

	$scope.update = function(id){
		$scope.edit = {};
		initUser.address.info(id).success(function(editRes){
			//console.log(res)
			$scope.edit.id = editRes.data.id;
			$scope.edit.address = editRes.data.address;
			$scope.edit.consignee = editRes.data.consignee;
			$scope.edit.mobile = editRes.data.mobile;
			// address: "dongdaqiao"
			// best_time: ""
			// city: "52"
			// city_name: "北京"
			// consignee: ""
			// country: "1"
			// country_name: "中国"
			// default_address: 1
			// district: "503"
			// district_name: "朝阳区"
			// email: ""
			// id: "48"
			// mobile: "13011"
			// province: "2"
			// province_name: "北京"
			// sign_building: ""
			// tel: ""
			// zipcode: ""			
			$ionicModal.fromTemplateUrl('templates/account/address-edit-modal.html',{            
				scope: $scope,
				animation:'slide-in-up'
			}).then(function(modal){
				$scope.modal = modal;
				$scope.modal.show().then(function(){
					//获取一级地址
					$scope.region(1).then(function(res){
						//获取省份列表
						$scope.edit.provinceList = res.data.regions;
						//选中当前省份
						$scope.edit.province = editRes.data.province;
						return $scope.region(editRes.data.province)					
					}).then(function(res){
						console.log(res)
						//获取城市
						$scope.edit.cityList = res.data.regions;
						//选中当前
						$scope.edit.city = editRes.data.city;
						return $scope.region(editRes.data.city)
					}).then(function(res){
						console.log(res)
						$scope.edit.districtList = res.data.regions;
						$scope.edit.district = editRes.data.district;	
					})
					//获取城市
					$scope.changeCity = function(e){
						//console.log(e,this)
						$scope.region(e).then(function(res){
							$scope.edit.cityList = res.data.regions;
						})
					}
					//获取区域
					$scope.changeDis = function(e){
						//console.log(e,this)
						$scope.region(e).then(function(res){
							$scope.edit.districtList = res.data.regions;
						})
					} 

				})
			})			
		})
	}

	//获取地区
	$scope.region = function(id){
		return getData.region(id)
	}

})