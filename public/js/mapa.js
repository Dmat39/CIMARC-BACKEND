/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ (() => {

eval("(function() {\r\n        \r\n    // Coordenadas iniciales del mapa\r\n    const lat = -7.1571614;\r\n    const lng = -78.5206756;\r\n\r\n    // Crear un objeto de mapa Leaflet y establecer la vista inicial\r\n    const mapa = L.map('mapa').setView([lat, lng], 25);\r\n\r\n    let marker;\r\n\r\n    // utilizar Provider y Geocoder\r\n    const geocodeService = L.esri.Geocoding.geocodeService();\r\n\r\n    // Agregar una capa de azulejos (tiles) de OpenStreetMap al mapa\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    //el pin\r\n    marker = new L.marker([lat,lng], {\r\n        draggable:true,\r\n        autoPan: true\r\n\r\n    }).addTo(mapa)\r\n\r\n    // detectar el movimiento del pin \r\n    marker.on('moveend', function(e){\r\n        marker = e.target\r\n\r\n        const posicion= marker.getLatLng();\r\n        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))\r\n\r\n        //obtener la inf de la las calles al soltar el ping\r\n        geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado){\r\n\r\n            //console.log(resultado)\r\n            marker.bindPopup(resultado.address.LongLabel)\r\n\r\n            //Lenar los campos\r\n\r\n            document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';\r\n            document.querySelector('#calle').value = resultado?.address?.Address ?? '';\r\n            document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';\r\n            document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';\r\n        })\r\n    })\r\n\r\n})();\n\n//# sourceURL=webpack://cimarc-backend/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"]();
/******/ 	
/******/ })()
;