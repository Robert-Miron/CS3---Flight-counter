// JavaScript source code
function path_gen() {
    var Lat_start = 44.57111;
    var Long_start = 26.08500;
    var Lat_end = 49.009724;
    var Long_end = 2.547778;
    let pos = {
        lat=[],
        long=[]
    };

    var R = 6371*10^3;
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
        var step_lat = (Lat_start - Lat_end) / 100;
        var step_long = (Long_start - Long_end) / 100;

        pos.lat[0] = Lat_start;
        pos.long[0] = Long_start;
        for (i = 1; i <= 100; i++) {
            pos.lat(i) = pos.lat(i - 1) + step_lat;
            pos.long(i) = pos.long(i - 1) + step_long;
        }
    }
    else {
        var phi = [];
        var lambda = [];
        var fraction = [];
        var x = [];
        var y = [];
        var z = [];

        for (i = 0; i <= 100; i++)
            fraction[i] = i / 100;
        a = sin(delta_phi / 2) * sin(delta_phi / 2) + cos(phi1) * cos(phi2) * sin(delta_lambda / 2) * sin(delta_lambda / 2);
        delta = 2 * atan2(sqrt(a), sqrt(1 - a));

        for (i = 0; i <= 100; i++) {
            A = Math.sin((1 - fraction[i]) * delta) / Math.sin(delta);
            B = Math.sin(fraction[i] * delta) / Math.sin(delta);

            x[i] = A * Math.cos(phi1) * Math.cos(lambda1) + B * Math.cos(phi2) * Math.cos(lambda2);
            y[i] = A * Math.cos(phi1) * Math.sin(lambda1) + B * Math.cos(phi2) * Math.sin(lambda2);
            z[i] = A * Math.sin(phi1) + B * Math.sin(phi2);

            pos.lat[i] = Math.rad2deg(Math.atan2(z[i], Math.sqrt(x[i] * x[i] + y[i] * y[i])));
            pos.long[i] = Math.rad2deg(Math.atan2(y[i], x[i]));
        }
    }
    return pos;
}