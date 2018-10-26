'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1Ijoib3l5YyIsImEiOiJjam43dzZqYjIwM3RvM3FwZjg2emVmeXFnIn0.r4AOJghdRp7zMMppmH58aQ'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/oyyc/cjnq63tmq0rob2ro68l31aix4',
    center: [-73.96216,40.80779],
    zoom: 12
})

let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})
map.addControl(navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})
map.addControl(geolocate, 'top-left')

geolocate.on('geolocate', function(event) {

})