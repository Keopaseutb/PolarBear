BASE_URL = 'https://3243fawkdafg.firebaseio.com//'

ROOM_LIST_PATH = BASE_URL + 'room_list/'

$('document').ready( function(){
  PolarBear.initialize();
} );

PolarBear = {
  initialize: function(){
    this.drawLandingPage();
    this.checkGeoLocation();
  },

  drawLandingPage: function(){
     $.ajax({
      type: 'get',
      url: '/landing_page',
      dataType: "text"
     }).done(function(data){
       $(".other_stuff").html(data);
     })
  },


  checkGeoLocation: function(){
      navigator.geolocation.getCurrentPosition(geoHelper.success, geoHelper.failure, geoHelper.defaultOps)

    } else {
      console.log('no geolocation')
    }
  },

  fireRoomListEvents: function() {
    this.bindRoomListener();
    this.prepareRoomListMVC();
  },

  bindRoomListener: function() {
    var self = this;

    new CustomEvent('readyToMakeRoom', {'chatRoomUrl': ''})
    $(document).on('readyToMakeRoom', function(event, roomPath) {
      var chatRoomUrl = BASE_URL + roomPath
      self.prepareRoomMVC(chatRoomUrl, roomPath)
    })
  },

  prepareRoomListMVC: function(){
    var roomListDomSelectors = {
      roomList: '.room-list',
      roomListTemplate: '#room-list-template'
    }
    var roomListView = new RoomListApp.RoomListView(roomListDomSelectors)
    var roomList = new RoomListApp.RoomList()
    var roomListController = new RoomListApp.RoomListController(roomList, roomListView)
    roomListController.listeners()
  },

  prepareRoomMVC: function(chatRoomUrl, roomPath){
    var roomDomSelectors = {
      room: '.room',
      roomTemplate: '#room-template'
    }
    var roomView = new ChatRoomApp.RoomView(roomDomSelectors)
    var room = new ChatRoomApp.Room(chatRoomUrl, roomPath)
    var roomController = new ChatRoomApp.RoomController(room, roomView)
    var roomName = {name: roomController.model.chatRoomUrl}
    roomController.drawRoom(roomName)

  }
}



