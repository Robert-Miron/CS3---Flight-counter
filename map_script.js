//var myCenter = new google.maps.LatLng(53.920498, 27.446894);

let lat = [];
let long = [];

function calcule(Lat_start, Long_start, Lat_end, Long_end) {
    var R = 6371 * 1000;
    var phi1 = Lat_start * Math.PI / 180;
    var phi2 = Lat_end * Math.PI / 180;
    var lambda1 = Long_start * Math.PI / 180;
    var lambda2 = Long_end * Math.PI / 180;
    var delta_phi = (Lat_end - Lat_start) * Math.PI / 180;
    var delta_lambda = (Long_end - Long_start) * Math.PI / 180;
    var a = Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c / 1000;

    if (distance < 1000) {
        let step_lat = - (Lat_start - Lat_end) / 100;
        let step_long = -(Long_start - Long_end) / 100;

        lat[0] = Lat_start;
        long[0] = Long_start;

        for (i = 1; i <= 100; i++) {
            lat[i] = lat[i - 1] + step_lat;
            long[i] = long[i - 1] + step_long;
        }
    }
    else {
        let phi = [];
        let lambda = [];
        let fraction = [];
        let x = [];
        let y = [];
        let z = [];
        let delta;

        for (i = 0; i <= 100; i++)
            fraction[i] = i / 100;
        a = Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);
        delta = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        for (i = 0; i <= 100; i++) {
            A = Math.sin((1 - fraction[i]) * delta) / Math.sin(delta);
            B = Math.sin(fraction[i] * delta) / Math.sin(delta);

            x[i] = A * Math.cos(phi1) * Math.cos(lambda1) + B * Math.cos(phi2) * Math.cos(lambda2);
            y[i] = A * Math.cos(phi1) * Math.sin(lambda1) + B * Math.cos(phi2) * Math.sin(lambda2);
            z[i] = A * Math.sin(phi1) + B * Math.sin(phi2);
            lat[i] = (Math.atan2(z[i], Math.sqrt(x[i] * x[i] + y[i] * y[i]))) * 180 / Math.PI;
            long[i] = (Math.atan2(y[i], x[i])) * 180 / Math.PI;
        };
    }
}

function initialize() {

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: 53.920498, lng: 27.446894 },
        mapTypeId: "roadmap",
    });

    const Sector1Coords = [
                
        { lat: 43.31889, lng: 0.75 },
        { lat: 43.29889, lng: 1.108333 },
        { lat: 43.09139, lng: 1 },
        { lat: 43.08972, lng: 0.75 },
        { lat: 43.31889, lng: 0.75},
    ];
    // Construct the polygons.
    const Sector1 = new google.maps.Polygon({
        paths: Sector1Coords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });

    // Path generation
    var flightPlanCoordinates = [];
    var Lat_start = 44.57111;
    var Long_start = 26.08500;
    var Lat_end = 49.009724;
    var Long_end = 2.547778;
    calcule(Lat_start, Long_start, Lat_end, Long_end);
    for (i = 0; i <= 100; i++)
        flightPlanCoordinates[i] = {lat: lat[i], lng: long[i]}
    // end of path generation


    const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    flightPath.setMap(map);
    Sector1.setMap(map);

}