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
    // get the rat-sightings from the layer data
    let features = map.queryRenderedFeatures({ layers: ['rat-sightings'] })
    console.log(features)

    // get the location of the click
    let current_location = [event.coords.longitude, event.coords.latitude]

    // if there aren't any features, don't continue
    if (features.length == 0) return

    // create variables to hold the closest feature found so far
    let closest_distance = Infinity
    let closest_feature = null

    // we're going to check each feature
    for (let feature of features) {

        // calculate the distance using turf
        let distance = turf.distance(turf.point(feature.geometry.coordinates), turf.point(current_location))

        // if the distance is less than the closest distance we've seen so far, update the variables
        if (distance < closest_distance) {
            closest_distance = distance
            closest_feature = feature
        }        

    }

    // closest_distance should now be set to the minimum value
    // closest_feature should be set to the feature itself
    console.log("Closest feature:", closest_feature.geometry.coordinates, "(", closest_distance, "m)")

    
     // calculate bearing
    let bearing = turf.bearing(turf.point(current_location), turf.point(closest_feature.geometry.coordinates))
    console.log("Bearing:", bearing)
    // additional handler code goes here
    
    // turn the pointer in that direction
    var pointer = document.getElementById('pointer')
    pointer.style.transform = 'rotate(' + bearing + 'deg)'

    map.flyTo({ center: current_location })

})