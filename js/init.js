var lat = 48.852969;
var lon = 2.349903;
var map = null;
let lat_perso;
let long_perso;
var infowindow;

function initMap() {
    this.HUDPlace();
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: lat,
            lng: lon
        },
        zoom: 11, // Nous définissons le type de carte (ici carte routière)
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // Nous activons les options de contrôle de la carte (plan, satellite...)
        mapTypeControl: false,
        // Nous désactivons la roulette de souris
        scrollwheel: true,
        mapTypeControlOptions: {
            // Cette option sert à définir comment les options se placent
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
        },
        // Activation des options de navigation dans la carte (zoom...)
        navigationControl: true,
        navigationControlOptions: {
            // Comment ces options doivent-elles s'afficher
            style: google.maps.NavigationControlStyle.ZOOM_PAN
        },
        disableDefaultUI: true,
        styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#d0e4e6"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e8e8e8"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            }
        ]

    });
    infoWindow = new google.maps.InfoWindow();
    //var pyrmont = new google.maps.LatLng(50.6759, 1.86502);
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
    var latlng = new google.maps.LatLng(50.6760032, 1.86507089);



    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        } else(alert("Pas de restaurant aux alentours"))
    }

    function createMarker(place) {
        this.RemplirHUD(place);
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
            icon: {
                url: '../img/marker3.png',
                scaledSize: new google.maps.Size(32, 32)

            },
            title: place.name
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });


    }



    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
                lat_perso = position.coords.latitude;
                long_perso = position.coords.longitude;
                var pos = {
                    lat: lat_perso,
                    lng: long_perso
                };

                var request = {
                    location: pos,
                    radius: '5000',
                    type: ['restaurant']
                };

                service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, callback);

                //infoWindow.setPosition(pos);
                //infoWindow.setContent('Votre position');
                //infoWindow.open(map);
                map.setCenter(pos);
            },
            function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Erreur: Problèmpe avec le service de géolocalisation.' :
        'Erreur: Votre navigateur ne supporte pas la géolocalisation.');
    infoWindow.open(map);
}

function HUDPlace() {
    $('body').append('<div class="HUD"></div>')

}

function RemplirHUD(place) {
    var nb_restaurant = $('.restaurant').length + 1;
    $('.HUD').append('<div class="restaurant restaurant' + nb_restaurant + '"></div>');
    $('.restaurant' + nb_restaurant).append('<h2>' + place.name + '</h2>');
    //$('.restaurant' + nb_restaurant).append('<h3>' + place.place_id + '</h3>');

}
window.onload = function () {
    initMap();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let myLatlng_perso = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //alert(myLatlng_perso)
            var marker_localisation = new google.maps.Marker({
                position: myLatlng_perso,
                map: map,
                title: "Votre position",
                animation: google.maps.Animation.DROP,
                icon: {
                    url: '../img/marker4.png',
                    scaledSize: new google.maps.Size(32, 32),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 16)

                }


            });

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }



};
