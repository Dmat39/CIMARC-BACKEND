(function() {
        
    // Coordenadas iniciales del mapa
    const lat = document.querySelector('#lat').value || -7.1571614;
    const lng = document.querySelector('#lng').value || -78.5206756;
 
    // Crear un objeto de mapa Leaflet y establecer la vista inicial
    const mapa = L.map('mapa').setView([lat, lng], 25);

    let marker;

    // utilizar Provider y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    // Agregar una capa de azulejos (tiles) de OpenStreetMap al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //el pin
    marker = new L.marker([lat,lng], {
        draggable:true,
        autoPan: true

    }).addTo(mapa)

    // detectar el movimiento del pin 
    marker.on('moveend', function(e){
        marker = e.target

        const posicion= marker.getLatLng();
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

        //obtener la inf de la las calles al soltar el ping
        geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado){

            //console.log(resultado)
            marker.bindPopup(resultado.address.LongLabel)

            //Lenar los campos

            document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';
            document.querySelector('#calle').value = resultado?.address?.Address ?? '';
            document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';
        })
    })

})();