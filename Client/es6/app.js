let map,
    marker,
    flightPath,
    socket;

document.addEventListener('DOMContentLoaded', () => {
    let element = document.querySelector('#main'),
        store = [];

    socket = io();

    socket.on('latest', function (data) {
        updateMap(store, data);
    });
    socket.on('range', function (data) {
        showRange(data);
    });


    addListeners();
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
    let mapPoint = {
        lat: point.latitude,
        lng: point.longitude
    };

    store.push(mapPoint);
    console.log(point);

    marker && marker.setMap(null);
    marker = new google.maps.Marker({
        position: mapPoint,
        map: map
    });
    map.panTo(marker.getPosition());

    flightPath.setPath(store);
}

function showRange (data) {
    store = data.map((item) => {
        return {
            lat: item.latitude,
            lng: item.longitude
        }
    });

    marker && marker.setMap(null);
    marker = new google.maps.Marker({
        position: store[store.length - 1],
        map: map
    });
    map.panTo(marker.getPosition());

    flightPath.setMap(map);
    flightPath.setPath(store);
}

function addListeners () {
    let start = document.querySelector('.start'),
        stop = document.querySelector('.stop'),
        clear = document.querySelector('.clear'),
        show = document.querySelector('.show');

    start.addEventListener('click', onStart);
    stop.addEventListener('click', onStop);
    clear.addEventListener('click', onClear);
    show.addEventListener('click', onShow);
}

function onStart () {
    socket.emit('start');
}

function onStop () {
    socket.emit('stop');
}

function onClear () {
    marker && marker.setMap(null);
    flightPath.setMap(null);
}

function onShow () {
    let from = document.querySelector('.from').value,
        to = document.querySelector('.to').value,
        result = {
            from: new Date(from),
            to: new Date(to)
        };

    socket.emit('show', result);
    console.log(result);
}