$('document').ready(function(){
  if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(geoHelper.success, geoHelper.failure, geoHelper.defaultOps)
  } else {
    console.log("the fails") // BUGBUG
  }

  if($("#homepage-flag").length == 0) {
    var roomLinker = new RoomLinker
    roomLinker.bindButtons()
  }
});
