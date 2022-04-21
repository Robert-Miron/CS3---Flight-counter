//var myCenter = new google.maps.LatLng(53.920498, 27.446894);

let lat = [];
let long = [];
let nrOfFlights = 50;
let flightPaths = new Array(nrOfFlights);
for (i = 0; i <= nrOfFlights; i++)
    flightPaths[i] = new Array(101);
let coordinates = {
    lat: [41.4147,
        42.0337,
        40.4761,
        51.4775,
        51.148056,
        53.333611,
        40.147222,
        40.750278,
        46.990833,
        48.233056,
        48.110278,
        51.189444,
        50.46,
        50.636389,
        42.695,
        43.231944,
        42.570278,
        45.738356,
        44.094443,
        34.878889,
        50.1018,
        49.696111,
        55.618056,
        56.2975,
        59.413333,
        58.3075,
        60.317222,
        60.514722,
        49.009722,
        45.725556,
        43.436667,
        52.366667,
        51.518333,
        48.69,
        37.936389,
        35.339722,
        36.405419,
        47.439444,
        47.488889,
        46.686389,
        55.044167,
        53.421389,
        52.701944,
        41.799444,
        43.81,
        38.181944,
        56.923611,
        56.5175,
        54.636944,
        54.963889,
        49.623333,
        35.8575,
        52.308056,
        51.45,
        50.915833,
        52.165833,
        50.077778,
        54.3775,
        38.774167,
        41.856667,
        44.571111,
        46.785,
        47.178889,
        48.17,
        48.663056,
        49.073333,
        46.224444,
        45.473353,
        40.472222,
        41.296944,
        37.418056,
        59.223611,
        59.651944
],
    lng: [19.7206,
        20.4158,
        19.4742,
        -0.461389,
        -0.190278,
        -2.849722,
        44.395833,
        43.859167,
        15.439444,
        14.1875,
        16.569722,
        4.460278,
        4.452778,
        5.442778,
        23.408333,
        27.825278,
        27.515278,
        16.060673,
        15.352874,
        33.630278,
        14.2632,
        18.110833,
        12.656111,
        9.124722,
        24.8325,
        26.686944,
        24.963333,
        22.261667,
        2.547778,
        5.081111,
        5.215,
        13.503333,
        7.612222,
        9.221944,
        23.947222,
        25.180278,
        28.086192,
        19.261944,
        21.615278,
        17.159167,
        -8.341111,
        -6.27,
        -8.924722,
        12.597222,
        11.203889,
        13.099444,
        23.971111,
        21.096944,
        25.287778,
        24.084722,
        6.204444,
        14.4775,
        4.764167,
        5.374444,
        5.776944,
        20.967222,
        19.784722,
        18.466111,
        -9.134167,
        -6.7075,
        26.085,
        23.686111,
        27.62,
        17.212778,
        21.241111,
        20.241111,
        14.456111,
        13.614978,
        -3.560833,
        2.078333,
        -5.898889,
        15.038056,
        17.918611
],
};

function calcule(Lat_start, Long_start, Lat_end, Long_end) {
    lat.length = 0;
    long.length = 0;
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

    const Sector2Coords = [

        { lat: 43.31889, lng: 0.75 },
        { lat: 43.26667, lng: 1.65 },
        { lat: 43.18389, lng: 2.196111 },
        { lat: 43, lng: 2.050278 },
        { lat: 43, lng: 0.75 },
        { lat: 43.31889, lng: 0.75 },
    ];

    const Sector3Coords = [

        { lat: 43.29, lng: 1.263056 },
        { lat: 43.27528, lng: 1.508056 },
        { lat: 43.09278, lng: 1.596111 },
        { lat: 43.09222, lng: 1.239444 },
        { lat: 43.29, lng: 1.263056 },
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
    
    // Construct the polygons.
    const Sector2 = new google.maps.Polygon({
        paths: Sector2Coords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });

   
    // Construct the polygons.
    const Sector3 = new google.maps.Polygon({
        paths: Sector3Coords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });

    // Path generation
    var flightPlanCoordinates = [];
    for (j = 0; j <= nrOfFlights; j++) {
        flightPlanCoordinates.length = 0;
        iStart = Math.floor(Math.random() * coordinates.lat.length);
        iEnd = Math.floor(Math.random() * coordinates.lat.length);
        while (iStart == iEnd) {
            iEnd = Math.floor(Math.random() * coordinates.lat.length);
        }
        var Lat_start = coordinates.lat[iStart];
        var Long_start = coordinates.lng[iStart];
        var Lat_end = coordinates.lat[iEnd];
        var Long_end = coordinates.lng[iEnd];
        calcule(Lat_start, Long_start, Lat_end, Long_end);
        for (i = 0; i <= 100; i++)
            flightPaths[j][i] = { lat: lat[i], lng: long[i] }
    }
    // end of path generation
    for (i = 0; i <= nrOfFlights; i++) {
        const flightPath = new google.maps.Polyline({
            path: flightPaths[i],
            geodesic: true,
            strokeColor: "#FFF8DC",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        flightPath.setMap(map);
    }
   // Sector1.setMap(map);
    Sector2.setMap(map);
   // Sector3.setMap(map);

}