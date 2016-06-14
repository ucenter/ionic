angular.module('starter.services', ['ngResource'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('init', function($http,getData){
  console.log('init')
  //初始化用户信息变量
  var user = {"session":{"uid":"","sid":""}}
  
  //读取本地存储用户信息
  user.session = JSON.stringify(getlocal('session'));

  //获取用户登录状态
  getData.user.info().success(function(res){
    console.log('初始化用户',res)
    if (res.status.error_code == 100) {
      
    }
  })
  function getlocal(a){
    return window.localStorage.getItem(a)
  } 
  return {
    user: user
  }
})

.factory('getData', function($http){
  var url = 'http://test.shizhencaiyuan.com/PHP/?url=';
  return {
      config:function(){
        return $http.post(url+'/config')
      },
      category:function(){
        return $http.post(url+'/category')
      },
      good: function(arg){
        return $http.post(url+'/goods',arg)
      },
      goodDesc:function(goodsid){
        return $http.post(url+'/goods/desc',goodsid)
      },
      search: function(arg){
        return $http.post(url+'/search',arg)
      },
      searchKeywords:function(){
        return $http.post(url+'/searchKeywords')
      },
      homeData: function(){
        return $http.post(url+'/home/data')
      },
      homeCategory:function(){
        return $http.post(url+'/home/category')
      },
      shopHelp:function(){
        return $http.post(url+'/shopHelp')
      },
      article: function(article_id){
        return $http.post(url+'/article',id)
      },
      region: function(parent_id){
        return $http.post(url+'/region',id)
      },
      user: {
        signin: function(arg){
          return $http.post(url+'/user/signin',arg)
        },
        signup: function(arg){
          return $http.post(url+'/user/signup',arg)
        },
        signupFields: function(){
          return $http.post(url+'/user/signupFields')
        },
        info: function(arg){
          return $http.post(url+'/user/info',arg)
        },
        collectCreate: function(arg){
          return $http.post(url+'/user/collect/create',arg)
        },
        collectDelete: function(arg){
          return $http.post(url+'/user/collect/delete',arg)
        },
        collectList: function(arg){
          return $http.post(url+'/user/collect/list',arg)
        }
      },
      address: {
        list: function(arg){
          return $http.post(url+'/address/list',arg)
        },
        add: function(arg){
          return $http.post(url+'/address/add',arg)
        },
        update: function(arg){
          return $http.post(url+'/address/update',arg)
        },
        info: function(arg){
          return $http.post(url+'/address/info',arg)
        },
        del: function(arg){
          return $http.post(url+'/address/delete',arg)
        },
        setDefault: function(arg){
          return $http.post(url+'/address/setDefault',arg)
        }
      },
      cart: {
        create: function(arg){
          return $http.post(url+'/cart/create',arg)
        },
        update: function(arg){
          return $http.post(url+'/cart/update',arg)
        },
        del: function(arg){
          return $http.post(url+'/cart/delete',arg)
        },
        list: function(arg){
          return $http.post(url+'/cart/list',arg)
        }
      },
      flow: {
        checkOrder: function(arg){
          return $http.post(url+'/flow/checkOrder',arg)
        },
        done: function(arg){
          return $http.post(url+'/flow/done',arg)
        }
      },
      order: {
        list: function(arg){
          return $http.post(url+'/order/list',arg)
        },
        affirmReceived: function(arg){
          return $http.post(url+'/order/affirmReceived',arg)
        },
        cancel: function(arg){
          return $http.post(url+'/order/cancel',arg)
        },
        pay: function(arg){
          return $http.post(url+'/order/pay',arg)
        }
      },
      brand: function(category_id){
        return $http.post(url+'/brand',arg)
      },
      price_range: function(category_id){
        return $http.post(url+'/price_range',arg)
      }


  }
  
})