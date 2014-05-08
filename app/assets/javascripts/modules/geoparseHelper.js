var geoparseHelper = (function(){
	var _parseRoomsToDisplayEligibleRooms = function() {
    var roomListFirebaseObject = firebaseHelper.createFireBase(ROOM_LIST_PATH)
    var roomListJson = firebaseHelper.getFirebaseValue(roomListFirebaseObject)
    debugger
    // var roomNames = Object.keys(roomListJson)
    var roomLocationArray = _getRoomLocations(roomNames)
    var eligibleRoomsArray = _getEligibleRooms(roomLocationArray)


    return eligibleRoomsArray
  }

  var _getAllRooms = function() {
    // var self = this;
    var roomListFirebaseObject = new Firebase(ROOM_LIST_PATH)

    var rooms;
    roomListFirebaseObject.on('value', function(snapshot) {
      rooms = snapshot.val()

    });
    return rooms;
    // var roomNames = Object.keys(roomListJson)





    // var roomNames = Object.keys(roomsListJson)

    // return roomNames
  }

  var _getEligibleRooms = function(roomLocationArray){
    var eligibleRoomsArray = []
    for (var i = 0; i < roomLocationArray.length; i++){

      if (_roomIsEligible(roomLocationArray[i])) {

         roomLocationArray[i]["distance"] = _distanceFromRoom(roomLocationArray[i])

        eligibleRoomsArray.push(roomLocationArray[i])

      }
    }

    return eligibleRoomsArray
  }

  var _distanceFromRoom = function(roomObject){
      var distance = geoHelper.calculateDistance(userFactory.getUserValue("userLatitude"), userFactory.getUserValue("userLongitude"), roomObject["roomLatitude"], roomObject["roomLongitude"])
      distance = distance + ''
      distance = distance.substring(0,7) + ' miles'
      return distance
  }

  var _roomIsEligible = function(roomObject) {

    var userLocation = [userFactory.getUserValue('userLatitude'), userFactory.getUserValue('userLongitude')]

    var roomLocation = [roomObject['roomLatitude'], roomObject['roomLongitude']]
    return geoHelper.inRange(userLocation, roomLocation)
  }

  var _getRoomLocations = function(roomNames) {
    var roomLocationArray = []
    for (var i = 0; i < roomNames.length; i++){
      var roomLatitude = _getRoomLatitude(roomNames[i])
      var roomLongitude = _getRoomLongitude(roomNames[i])
      var userCount = firebaseHelper.getUserCount(roomNames[i])

      roomLocationArray.push({name: roomNames[i], roomLatitude: roomLatitude, roomLongitude: roomLongitude, userCount: userCount})
    }

    return roomLocationArray
  }

  var _getRoomLatitude = function(roomName) {
    var roomLatitudeUrl = ROOM_LIST_PATH + roomName + '/location/latitude'
    var roomLatitudeFirebase = firebaseHelper.createFireBase(roomLatitudeUrl)
    var latitude = firebaseHelper.getFirebaseValue(roomLatitudeFirebase)

    return latitude
  }

  var _getRoomLongitude = function(roomName) {
    var roomLongitudeUrl = ROOM_LIST_PATH + roomName + '/location/longitude'
    var roomLongitudeFirebase = firebaseHelper.createFireBase(roomLongitudeUrl)
    var longitude = firebaseHelper.getFirebaseValue(roomLongitudeFirebase)

    return longitude
  }

  return {
    parseRoomsToDisplayEligibleRooms: _parseRoomsToDisplayEligibleRooms,
    getAllRooms: _getAllRooms,
    getEligibleRooms: _getEligibleRooms,
    getRoomLongitude: _getRoomLongitude,
    getRoomLatitude: _getRoomLatitude,
    getRoomLocations: _getRoomLocations,
    roomIsEligible: _roomIsEligible,
    distanceFromRoom: _distanceFromRoom
  }

}())