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
        return $http.post(url+'/search',{'json':arg})
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
          return $http.post(url+'/user/signin',{'json': JSON.stringify(arg)})
        },
        signup: function(arg){
          return $http.post(url+'/user/signup',{'json': JSON.stringify(arg)})
        },
        signupFields: function(){
          return $http.post(url+'/user/signupFields')
        },
        info: function(arg){
          return $http.post(url+'/user/info',{'json': JSON.stringify(arg)})
        },
        collectCreate: function(arg){
          return $http.post(url+'/user/collect/create',{'json': JSON.stringify(arg)})
        },
        collectDelete: function(arg){
          return $http.post(url+'/user/collect/delete',{'json': JSON.stringify(arg)})
        },
        collectList: function(arg){
          return $http.post(url+'/user/collect/list',{'json': JSON.stringify(arg)})
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
          return $http.post(url+'/cart/create',{'json': JSON.stringify(arg)})
        },
        update: function(arg){
          return $http.post(url+'/cart/update',arg)
        },
        del: function(arg){
          return $http.post(url+'/cart/delete',arg)
        },
        list: function(arg){
          return $http.post(url+'/cart/list',{'json': JSON.stringify(arg)})
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
          return $http.post(url+'/order/list',{'json': JSON.stringify(arg)})
        },
        affirmReceived: function(arg){
          return $http.post(url+'/order/affirmReceived',arg)
        },
        cancel: function(arg){
          return $http.post(url+'/order/cancel',{'json': JSON.stringify(arg)})
        },
        pay: function(arg){
          return $http.post(url+'/order/pay',{'json': JSON.stringify(arg)})
        }
      },
      brand: function(category_id){
        return $http.post(url+'/brand',arg)
      },
      price_range: function(category_id){
        return $http.post(url+'/price_range',arg)
      },
      getLocal: function(a){
        return window.localStorage.getItem(a)
      },
      setLocal: function(a,b){
        return window.localStorage.setItem(a,b)
      },
      removeLocal: function(a){
        return window.localStorage.removeItem(a)
      },
      menuCate: function(){
        return $http.get('./server-demo/menu-category.json')
      },
      menuList: function(){
        return $http.get('./server-demo/menu-list.json')
      },
      menuDetail: function(){
        return $http.get('./server-demo/menu-detail.json')
      },
      menuSearch: function(){
        return $http.get('./server-demo/menu-search.json')
      },
      getWxToken: function(code){
        return $http.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx0e34e63ab10fe5c6&secret=cbcf18fc542410928238ffcdef0807ca&code='+code+'&grant_type=authorization_code')
      }


  }
  
})


.service('initUser', ['$rootScope','$http','getData', function($rootScope,$http,getData){
    var initUser = {};//初始用户全局变量
        initUser.session = {'sid':'','uid':''}
        initUser.info = {};
        initUser.isLogin;      
    //读取本地存储
    if (getData.getLocal('sid') && getData.getLocal('sid').length == 40 && getData.getLocal('uid')) {
        initUser.session.sid = getData.getLocal('sid');
        initUser.session.uid = getData.getLocal('uid');    
        //判断是否登陆

        getData.user.info({
          "session":{
            "sid":initUser.session.sid,
            "uid":initUser.session.uid
          }
        }).success(function(res){
          console.log(res)
          if (res.status.succeed == 1) {
              initUser.info = res.data;
              initUser.isLogin = true;
          }else{
              console.log(res.status.error_desc)
              initUser.loginOut()
          }
        })
    }

    initUser.setInfo = function(info){
      initUser.info = info;
    }

    initUser.loginOut = function(){
      getData.removeLocal('uid')
      getData.removeLocal('sid')
      initUser.session = {};
      initUser.info = {};
      initUser.isLogin = false;
    }

    //设置用户session值
    initUser.setSession = function(s,u){
        initUser.session.uid = u;
        initUser.session.sid = s;
        getData.setLocal('uid',u)
        getData.setLocal('sid',s)
    }

    initUser.order = {
        list: function(initUser){
          return getData.order.list({
            'session': {
              'sid':initUser.session.sid,
              'uid':initUser.session.uid
            },
            'pagination':{
              'page':'1',
              'count':'100',
            },
            'type':''
          })
        },
        cancel: function(initUser,orderid){
            return getData.order.cancel({
              'session': {
                'sid':initUser.session.sid,
                'uid':initUser.session.uid
              },
              'order_id': orderid        
            })
        },
        update: function(){
            return 
        },
        pay: function(initUser,orderid){
            return getData.order.pay({
              'session': {
                'sid':initUser.session.sid,
                'uid':initUser.session.uid
              },
              'order_id': orderid        
            })
        }      
    }

    initUser.address = {
        add:function(){
          return getData.address.add()
        },
        list: function(){
          return getData.address.list({
            'json':JSON.stringify({              
              'session':{
                'uid': initUser.session.uid,
                'sid': initUser.session.sid
              }
            })
          })
        },
        update: function(){

        },
        info: function(){

        },
        del: function(){

        },
        setDefault: function(){

        }

    }


    //返回用户状态服务
    return initUser;
}])


.service('cart',function(getData){
  var cart = {};
  cart.add = function(user,id,number,spec){
    return getData.cart.create({
      'session':{
        'uid':user.session.uid,
        'sid':user.session.sid
      },
      'goods_id': id,
      'number': number,
      'spec':spec
    })
  }
  cart.remove = function(){

  }
  cart.update = function(){

  }
  cart.list = function(session){
    return getData.cart.list(session)
  }

  return cart;
})


// .service('index', function($http,$q){
//   var url = 'http://test.shizhencaiyuan.com/PHP/?url='
//   return {
//       homeData: function(){
//         var deferred = $q.defer();
//         $http.post(url+'/home/data')
//         .success(function(data,status,headers,config){
//           deferred.resolve(data);
//         })
//         .error(function(data,status,headers,config) {
//           /* Act on the event */
//           deferred.reject(data)
//         });
//         return deferred.promise
//       },
//       homeCategory:function(){
//         var deferred = $q.defer();
//         $http.post(url+'/home/category')
//         .success(function(data,status,headers,config){
//           deferred.resolve(data);
//         })
//         .error(function(data,status,headers,config) {
//           /* Act on the event */
//           deferred.reject(data)
//         });
//         return deferred.promise        
//       },

//   }
// })