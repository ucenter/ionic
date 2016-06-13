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

.factory('category', function(){
  var category = {"data":[{"id":"146","name":"\u4f1a\u5458\u5361","children":[{"id":"147","name":"\u5e74\u5361"},{"id":"149","name":"\u534a\u5e74\u5361"},{"id":"148","name":"\u5b63\u5361"},{"id":"152","name":"\u4f53\u9a8c\u5361"}]},{"id":"150","name":"\u751f\u6001\u7cae\u6cb9","children":[]},{"id":"151","name":"\u751f\u6001\u79bd\u86cb\u8089","children":[]},{"id":"153","name":"\u98df\u73cd\u5e72\u679c","children":[]},{"id":"154","name":"\u751f\u6001\u83cc\u7c7b","children":[]},{"id":"155","name":"\u6c81\u852c\u81f4\u81b3","children":[]},{"id":"156","name":"\u5bb6\u5ead\u7504\u9009","children":[]},{"id":"158","name":"\u6d4b\u8bd5\u5206\u7c7b","children":[]},{"id":"160","name":"ceshi1","children":[]}],"status":{"succeed":1}}

  return {
    all: function(){
      return category;
    }
  };
})

.factory('url',function(){
  var url = 'http://test.shizhencaiyuan.com/PHP/?url='
  return url;
})
.factory('search', ['$http', function($http){
    return function search(){      
      return $http.post('http://test.shizhencaiyuan.com/PHP?url=/search')
    } 
}])
.factory('getData', function($http){
  var url = 'http://test.shizhencaiyuan.com/PHP/?url=';
  return {
      good: function(arg){
        return $http.post(url+'/goods',arg)
      },
      goodDetail:function(){
        return 
      }    

  }
  
})