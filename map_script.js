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
var lenL;
var list_ac_in_cta1 = [];
var list_ac_in_cta2 = [];
var sum1 = 0;
var sum2 = 0;


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
        zoom: 6,
        center: { lat: 51.3333, lng: 9.4166 },
        mapTypeId: "roadmap",
    });

    const Sector1Coords = [
        { lat: 51.333333, lng: 9.517222 },
        { lat: 51.085555, lng: 9.435833 },
        { lat: 50.684722, lng: 9.305833 },
        { lat: 50.400277, lng: 9.398333 },
        { lat: 50.298611, lng: 9.431111 },
        { lat: 49.555555, lng: 9.186944 },
        { lat: 49.904444, lng: 8.493333 },
        { lat: 50.611666, lng: 7.909444},
        { lat: 50.7, lng: 7.666111 },
        { lat: 50.752222, lng: 7.648888 },
        { lat: 50.981111, lng: 8.247222 },
        { lat: 51.108611, lng: 8.586666 },
        { lat: 51.166388, lng: 8.741944 },
        { lat: 51.196388, lng: 8.817777 },
        { lat: 51.333333, lng: 9.166666 },
        { lat: 51.333333, lng: 9.517222 },
    ];

    const Sector2Coords = [
        { lat: 51.27, lng: 8.411111  },
        { lat: 51.108611, lng: 8.586666 },
        { lat: 50.981111, lng: 8.247222 },
        { lat: 50.752222, lng: 7.648888 },
        { lat: 51.037777, lng: 7.554166 },
        { lat: 51.178888, lng: 8.070833 },
        { lat: 51.27, lng: 8.411111 },
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
        strokeColor: "#green",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "green",
        fillOpacity: 0.35,
    });

    // Path generation
    for (j = 0; j <= nrOfFlights; j++) {
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

    var lineSymbol = {
        path: "m 0,3.93375" +
            "c -0.44355,0 -0.84275,0.18332 -1.17933,0.51592" +
            "c -0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377" +
            "c -0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085" +
            "c -0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118" +
            "c -5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223" +
            "c -1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549" +
            "c 0.38616,4.88048 0.94192,9.7138 1.42461,13.50099" +
            "c -1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255" +
            "c -0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316" +
            "c 0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557" +
            "c 0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316" +
            "c 0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516" +
            "c 0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115" +
            "c 0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902" +
            "c -0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352" +
            "c 0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476" +
            "c -0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561" +
            "c -0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377" +
            "c -0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0l0.00002,0.00001" +
            "z",
        scale: 0.5,
        strokeColor: '#3D084C',
        fillColor: '#3D084C',
        fillOpacity: 1.0,
        strokeOpacity: 1.0
    };

    for (i = 0; i <= nrOfFlights; i++) {
        const flightPath = new google.maps.Polyline({
            path: flightPaths[i],
            geodesic: true,
            strokeColor: "#FFF8DC",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            icons: [{
                icon: lineSymbol,
                offset: '100%'
            }],
        });
        flightPath.setMap(map);
        animate(flightPath);
    }
    //Generate animation
    function animate(flightPath) {
        var count = 0;
        window.setInterval(function () {
            count = (count + 1) % 200;

            var icons = flightPath.get('icons');
            // console.log(icons[0]);
            icons[0].offset = (count / 2) + '%';
            flightPath.set('icons', icons);

            for (var i = 0; i <= nrOfFlights; i++) {
                for (var j = 0; j <= 100; j++) {
                    var marker;
                    if (!marker) {
                        marker = new google.maps.Marker({
                            position: flightPaths[i][j]
                        });
                    } else {
                        marker.setPosition(flightPaths[i][j]);
                    }
                    var lat = flightPaths[i][j].lat;
                    var lng = flightPaths[i][j].lng;
                    var point = [lat, lng];
                    var isInTheCTA1 = inside(point, coordsOfAirspace(Sector1Coords));
                    var check1 = list_ac_in_cta1.includes(i);

                    if (isInTheCTA1 && (!check1)) {
                        list_ac_in_cta1.push(i);
                        lenL = list_ac_in_cta1.length;
                        console.log("No of AC in CTA1 : " + list_ac_in_cta1.length);
                        document.getElementById("noCTA1").innerHTML = lenL;
                        sum1 = sum1 + lenL;
                        document.getElementById("totCTA1").innerHTML = sum1;
                    }
                    else if ((!isInTheCTA1) && check1) {
                        ind = list_ac_in_cta1.indexOf(i);
                        list_ac_in_cta1.splice(ind);
                        lenL = list_ac_in_cta1.length;
                        console.log("No of AC in CTA1 : " + list_ac_in_cta1.length)
                        document.getElementById("noCTA1").innerHTML = lenL
                    }
                    //document.getElementById("sumCta1").innerHTML=lenL}

                    var check2 = list_ac_in_cta2.includes(i);
                    var isInTheCTA2 = inside(point, coordsOfAirspace(Sector2Coords))
                    if (isInTheCTA2 && (!check2)) {
                        list_ac_in_cta2.push(i);
                        lenL = list_ac_in_cta2.length;
                        document.getElementById("noCTA2").innerHTML = lenL;
                        console.log("No of AC in CTA2 : " + list_ac_in_cta2.length);
                        sum2 = sum2 + lenL;
                        document.getElementById("totCTA2").innerHTML = sum2;
                    }
                    else if ((!isInTheCTA2) && check2) {
                        ind = list_ac_in_cta2.indexOf(i);
                        list_ac_in_cta2.splice(ind);
                        lenL = list_ac_in_cta2.length;
                        console.log("No of AC in CTA2 : " + list_ac_in_cta2.length)
                        document.getElementById("noCTA2").innerHTML = lenL
                    }
                }
            }
            
        }, 200);
    }
    //End animation

    //verify a point is inside polygon
    function inside(point, vs) {
        var x = point[0], y = point[1];
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    //obj to array function
    function coordsOfAirspace(obj) {
        var finalArray = [];
        for (var i = 0; i < obj.length; i++) {
            finalArray.push([obj[i].lat, obj[i].lng]);
        }
        return finalArray;
    }

   Sector1.setMap(map);
   Sector2.setMap(map);
   // Sector3.setMap(map);

}