import ReactDOM from 'react-dom';
import React from 'react';
import Main from './main.js';
let map,
    marker;

document.addEventListener('DOMContentLoaded', () => {
    let element = document.querySelector('#main'),
        socket = io(),
        store = [];

    socket.on('mapData', function (data) {
        updateMap(store, data);
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
}

function updateMap (store, point) {
    store.push(point);

    marker && marker.setMap(null);
    marker = new google.maps.Marker({
        position: point,
        map: map
    });

    var flightPath = new google.maps.Polyline({
        path: store,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath.setMap(map);


}