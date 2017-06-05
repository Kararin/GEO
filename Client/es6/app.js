let map,
    marker,
    flightPath;

document.addEventListener('DOMContentLoaded', () => {
    let element = document.querySelector('#main'),
        socket = io(),
        store = [];

    socket.on('latest', function (data) {
        // updateMap(store, data);
        console.log(data);
    });

    initMap();
});

function initMap () {
    map = new google.maps.Map(document.getElementById('main'), {
        zoom: 15,
        center: {
            lat:48.473285,
            lng: 35.028482
        }
    });

    flightPath = new google.maps.Polyline({
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });


    flightPath.setMap(map);
}

function updateMap (store, point) {
    store.push(point);
    console.log(point);

    marker && marker.setMap(null);
    marker = new google.maps.Marker({
        position: point,
        map: map
    });

    flightPath.setPath(store);
}