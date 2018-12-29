//https://stackoverflow.com/questions/47605027/how-i-fetch-google-review-on-website-that-also-display-on-my-website

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
        zoom: 13, // Nous définissons le type de carte (ici carte routière)
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
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
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
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "30"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "gamma": "0.00"
                    },
                    {
                        "lightness": "74"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "3"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
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
                        "color": "#000000"
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
                        "color": "#000000"
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
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
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
        this.gestionClick();
    }

    function createMarker(place) {
        this.RemplirHUD(place);


        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            placeID: place.place_id,
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
                //getZoom
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
    $('body').append('<div class="HUD"></div><div class="contenu_resto"></div>')

}

function retrouverPlace(id_place) {
    //console.log(id_place)

    this.JSONPlace(id_place)
}

function RemplirHUD(place) {

    var nb_restaurant = $('.restaurant').length + 1;
    $('.HUD').append('<div id="' + place.place_id + '" class="restaurant restaurant' + nb_restaurant + '"></div>');
    $('.restaurant' + nb_restaurant).append('<h2>' + place.name + '</h2>');
    $('.restaurant' + nb_restaurant).append('<div class="note"></div>');

    var rating_round = Math.round(place.rating);
    var etoile_grise = 5 - rating_round;
    //$('.restaurant' + nb_restaurant + ' .note').append('<span>' + place.rating + '</span>');

    for (var i = 0; i < rating_round; i++) {
        $('.restaurant' + nb_restaurant + ' .note').append('<img src="img/star.svg">');
    }

    for (var j = 0; j < etoile_grise; j++) {
        $('.restaurant' + nb_restaurant + ' .note').append('<img src="img/star_grey.svg">');
    }

    //console.log(Object.keys(place.placeID))
    //console.log(place.place_id)

    //this.JSONPlace(place)

}


function JSONPlace(place_id) {
    let Nom = null;
    let Adresse = null;
    let Numeros = null;
    let Photos = null;
    let LinkPhotos = null;
    let review_auteur = null;
    let review_rating = null;
    let review_text = null;

    var request = {
        placeId: place_id,
        fields: ['name', 'rating', 'formatted_phone_number', 'formatted_address', 'photo', 'review']
    };
    var reqUri = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place_id + '&key=AIzaSyAluhfy6Err8NZWAUGD2HxhT1NgOcnWAVM';

    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, recupDonnees);

    function recupDonnees(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            Adresse = place.formatted_address;
            Nom = place.name;

            Numeros = place.formatted_phone_number;
            if (place.photos != null) {
                Photos = place.photos[0].getUrl();
            }
            if (place.reviews != null) {
                review_auteur = place.reviews[0].author_name;
                review_rating = place.reviews[0].rating;
                review_text = place.reviews[0].text;
            }


            console.log('%c' + Nom, 'font-weight: bold');
            console.log('Adresse= ' + Adresse);
            console.log('Numeros= ' + Numeros);
            $('.contenu_resto').append('<div class="header_presentation"></div>')

            if (place.photos != null) {
                console.log('Photo_url= ' + Photos);

                $('.contenu_resto .header_presentation').css('background-image', 'url("' + Photos + '")');
            }
            if (place.reviews != null) {
                $('.contenu_resto').append('<div class="contenu"><div class="commentaire_box"></div><div class="autre"></div></div>')
                for (var i = 0; i < place.reviews.length; i++) {
                    $('.commentaire_box').append('<div class="commentaire commentaire' + i + '"></div>')
                    $('.commentaire' + i).append('<h2>' + place.reviews[i].author_name + '</h2>')
                    $('.commentaire' + i).append('<h3>' + place.reviews[i].rating + '</h3>')
                    $('.commentaire' + i).append('<p>' + place.reviews[i].text + '</p>')
                    console.log("%c*****************", 'color:green; font-weight: bold');
                    console.log('%cAuteur = ' + place.reviews[i].author_name, 'color:blue');
                    console.log('%cNote = ' + place.reviews[i].rating, 'color:blue');
                    console.log('%cCommentaire = ' + place.reviews[i].text, 'color:blue');

                }
            }
            console.log("%c▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮", 'color:red; font-weight: bold');
            $('.header_presentation').append('<div class="nom_resto"><h2>' + Nom + '</h2></div>')

        }
    }




    //console.log(reqUri);
    //https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJifEPV0o13EcRL06nUkELoKc&key=AIzaSyAluhfy6Err8NZWAUGD2HxhT1NgOcnWAVM

    //https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJi58bgi813EcRG-fBOIyUwFg&key=AIzaSyAluhfy6Err8NZWAUGD2HxhT1NgOcnWAVM
    /**$.getJSON(reqUri, function (data) {
        var Nom = data.result.name;
        let Adresse = data.result.formatted_address;
        let Numeros = data.result.formatted_phone_number;
        let Photos = data.result.photos[0].photo_reference;
        let linkPhotos = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + Photos + '&key=AIzaSyAluhfy6Err8NZWAUGD2HxhT1NgOcnWAVM'
        if (data.result.reviews != undefined) {
            var ReviewAuteur = data.result.reviews[0].author_name;
            var Note = data.result.reviews[0].rating;
            var Time = data.result.reviews[0].relative_time_description;
            var Text = data.result.reviews[0].text;
        }
        console.log(Nom);
        console.log('Adresse= ' + Adresse);
        console.log('Numeros= ' + Numeros);
        console.log('Photo_url= ' + Photos);
        console.log('link= ' + linkPhotos);
        if (data.result.reviews != undefined) {
            console.log('Auteur= ' + ReviewAuteur);
            console.log('Note= ' + Note);
            console.log('Temps = ' + Time);
            console.log('Commentaire = ' + Text);
        }

        console.log('----------------------');
        var objet = `${data.result.address_components[0].short_name}`;
        //console.log(Object.keys(objet))**/


    //});
}

function gestionClick() {
    $('.restaurant').click(function () {
        //$('.HUD').css('top', '0px');
        $('.HUD').fadeOut(1);
        //$('.HUD').css('height', '100vh');
        $('.contenu_resto').css('min-height', '100vh');
        $('.contenu_resto').css('height', 'auto');
        $('.contenu_resto').css('top', '0px');
        var resto = $(this).clone();
        //$('.HUD').html(resto);
        $('.HUD').html("");
        $('.restaurant').css('width', '80%');
        $('.HUD').css('justify-content', 'space-around');
        $('.HUD').css('align-items', 'stretch');
        $('.HUD').css('border-radius', '0px');
        $('.HUD').css('background', 'rgba(250, 250, 250, 1)');
        $('.restaurant').css('height', '70px');
        $('.restaurant').css('margin-top', '20px');
        $('.restaurant h2').css('font-size', '25px');
        $('.restaurant h2').css('top', '50%');
        $('.note').fadeOut();
        var id = $(this).attr("id");
        retrouverPlace(id)

    });
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
