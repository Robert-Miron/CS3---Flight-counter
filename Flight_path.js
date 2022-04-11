// JavaScript source code
function initMap() {
    var mapProp = {
        center: myCenter,
        zoom: 3,
        //Can be either ROADMAP, SATELLITE, HYBRID, OR TERRAIN
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
        position: myCenter

    });

    marker.setMap(map);
}
