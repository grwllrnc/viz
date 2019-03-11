// Denkmalschutzobjekte, Stadt Zürich

// Building the map

L.mapbox.accessToken = 'xxxx';

var map = L.mapbox.map('map', 'xxxx').setView([47.3848, 8.5274], 12);

L.tileLayer('https://a.tiles.mapbox.com/v4/xxxx.json', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);


// Getting JSON data

var xhr = new XMLHttpRequest();
var url = "https://xy.z/denkmalschutzobjekt.json";

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        pointsToMap(data);
    }
}
xhr.open("GET", url, true);
xhr.send();


// Adding the objects to the map
function pointsToMap(data){
	for (var i = 0; i < data.features.length; i++) {
               var point = data.features[i].geometry.coordinates;
               if (data.features[i].properties.Schutzstatus == "Ja"){
                  var color = "orange";
               } else {
                  var color = "blue";
               };
               L.circleMarker([point[1],point[0]], {radius: 4, color: "white", fillColor: color, opacity: 1, fillOpacity: 1}).addTo(map).bindPopup("<strong>" + data.features[i].properties.Objektbezeichnung + "</strong>" + "<br />" + "Baujahr: " + data.features[i].properties.Baujahr + "<br />" + "Schutzstatus: " + data.features[i].properties.Schutzstatus);
        };
}
