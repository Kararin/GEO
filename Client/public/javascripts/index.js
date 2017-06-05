/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map