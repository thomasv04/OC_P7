function initMap() {
    this.HUDPlace();
    this.lat = 48.852969;
    this.lon = 2.349903;
    this.lat_perso;
    this.long_perso;
    this.infowindow;
    this.infoWindow = new google.maps.InfoWindow();
    this.pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
    this.latlng = new google.maps.LatLng(50.6760032, 1.86507089);
    this.HUD;
    this.results = [];
    this.markerCenter;
    this.load = null;
    this.commentID = [];
    this.comment = [];
    this.markerClick = [];
    this.type = 'restaurant';
    this.typeColor = '#2fdbc1';
    this.nbElement = 0;

    this.minFiltre = 0;
    this.maxFiltre = 5;
    this.choixFiltre = 0;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            var lat_perso = position.coords.latitude;
            var long_perso = position.coords.longitude;


            this.lat = lat_perso;
            this.lon = long_perso;

        })
    }

    window.scroll(0, 0);

    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: this.lat,
            lng: this.lon
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
        styles: [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#e9e9e9"
            },
                    {
                        "lightness": 17
                        }
                       ]
        },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
                        "color": "#dedede"
                     },
                    {
                        "lightness": 21
                                 }
                                ]
                 },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
                    "visibility": "off"
                     }]
                 },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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

    console.log('Google Maps API version: ' + google.maps.version);

    $('body').append('<div class="loadingScreen"><img src="./img/loaderSite.gif"></div>');

    google.maps.event.addListener(this.map, 'tilesloaded', () => {
        if (this.load === null) {
            this.load = "isLoaded";
            $('.loadingScreen').delay(2000).fadeOut(500);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    var lat_perso = position.coords.latitude;
                    var long_perso = position.coords.longitude;
                    var pos = {
                        lat: lat_perso,
                        lng: long_perso
                    };
                    this.map.setCenter(pos);
                    creationMarker();

                    decouvreResto('restaurant');




                })

                CreationFiltre();
                this.map.addListener('click', function (e) {
                    createMarkerClick(e.latLng);

                });

                this.map.addListener('dragend', function () {
                    $('.reload img').css('animation', 'animReload 1s');
                });

                this.map.addListener('dragstart', function () {
                    $('.reload img').css('animation', '');
                    $('.seeMore').removeClass('activeHUD');
                    $('.seeMore .newHUD').fadeOut();
                    $('.seeMore h2').fadeIn(500);
                });

                $('.icon').click(function () {
                    if ($('body .newHUD').length != 0) {
                        $('.newHUD').remove();
                    }
                    var id = $(this).attr('id');
                    changeIconColor(id);
                    var latLng = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
                    $('.seeMore').css('background', typeColor);
                    $('.seeMore .search').css('background', typeColor);
                    $('.seeMore .search').fadeIn(300);
                    $('.seeMore').removeClass('activeHUD');
                    $('.seeMore .newHUD').fadeOut();
                    $('.seeMore h2').fadeIn(500);

                    CreationFiltre();
                    colorFilter()
                    map.setCenter(latLng);
                    map.center = latLng;
                    removeAllMarker();
                    recreateMarkerCenter();
                    RedecouvreResto(id);
                    detectMarkerClick();
                })

                $('.reload').click(function () {
                    if ($('body .newHUD').length != 0) {
                        $('.newHUD').remove();
                    }
                    var latLng = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
                    CreationFiltre();
                    $('.seeMore .search').fadeIn(300);
                    $('.seeMore').removeClass('activeHUD');
                    $('.seeMore .newHUD').fadeOut();
                    $('.seeMore h2').fadeIn(500);
                    colorFilter()
                    map.setCenter(latLng);
                    map.center = latLng;
                    removeAllMarker();
                    recreateMarkerCenter();
                    RedecouvreResto(type);
                    detectMarkerClick();

                })

                $('.seeMore').click(function () {
                    if ($('.seeMore .newHUD').length != 0) {
                        $('.seeMore .newHUD').remove();
                    }
                    $('.seeMore').append('<div class="newHUD"></div>');
                    for (var i = 0; i < results.length; i++) {
                        var marker = results[i];
                        var rating = parseInt(marker.rating)
                        if (rating <= maxFiltre && rating >= minFiltre) {
                            var etoile = rating;
                            var etoile_grise = 5 - rating;
                            $('.newHUD').append('<div class="newResto" id="' + results[i].placeID + '"><h2 class="name">' + results[i].title + '</h2><div class="stars"></div></div>');

                            for (var k = 0; k < etoile; k++) {
                                $('.newResto#' + results[i].placeID + ' .stars').append('<img src="img/star.svg">');
                            }


                            for (var j = 0; j < etoile_grise; j++) {
                                $('.newResto#' + results[i].placeID + ' .stars').append('<img src="img/star_grey.svg">');
                            }

                            $('.seeMore .newResto#' + results[i].placeID).click(function () {
                                var id = $(this).attr('id')
                                $('body').css('overflow-y', 'auto');
                                HUD = $('.newHUD').html();
                                $('.contenu_resto').css('z-index', '6');
                                $('.contenu_resto').css('min-height', '100vh');
                                $('.contenu_resto').css('height', 'auto');
                                $('.contenu_resto').css('top', '0px');
                                var resto = $(this).clone();
                                $('.restaurant').css('width', '80%');
                                $('.restaurant').css('height', '70px');
                                $('.restaurant').css('margin-top', '20px');
                                $('.restaurant h2').css('font-size', '25px');
                                $('.restaurant h2').css('top', '50%');
                                $('.note').fadeOut();
                                var id = $(this).attr("id");
                                if ($(this).hasClass('restaurantAdd')) {
                                    //rien
                                } else {
                                    retrouverPlace(id);
                                }


                                $('.filtre').fadeOut(500);
                            })

                        }
                    }
                    for (var i = 0; i < markerClick.length; i++) {
                        var marker = markerClick[i];
                        var rating = parseFloat(marker.rating)
                        var etoile = rating;
                        var etoile_grise = 5 - rating;
                        $('.newHUD').append('<div class="newResto clickMarker" id="' + i + '"><h2 class="name">' + marker.title + '</h2><div class="stars"></div></div>');

                        for (var k = 0; k < etoile; k++) {
                            $('.clickMarker#' + i + ' .stars').append('<img src="img/star.svg">');
                        }


                        for (var j = 0; j < etoile_grise; j++) {
                            $('.clickMarker#' + i + ' .stars').append('<img src="img/star_grey.svg">');
                        }

                        $('.seeMore .clickMarker#' + i).click(function () {
                            var id = $(this).attr('id')
                            $('body').css('overflow-y', 'auto');
                            HUD = $('.newHUD').html();
                            $('.contenu_resto').css('z-index', '6');
                            $('.contenu_resto').css('min-height', '100vh');
                            $('.contenu_resto').css('height', 'auto');
                            $('.contenu_resto').css('top', '0px');
                            var resto = $(this).clone();
                            $('.restaurant').css('width', '80%');
                            $('.restaurant').css('height', '70px');
                            $('.restaurant').css('margin-top', '20px');
                            $('.restaurant h2').css('font-size', '25px');
                            $('.restaurant h2').css('top', '50%');
                            $('.note').fadeOut();
                            var id = $(this).attr("id");
                            clickHUDNewMarker(id);


                            $('.filtre').fadeOut(500);
                        })
                    }


                    $('.seeMore').addClass('activeHUD');

                    $('.seeMore .nbElement').fadeOut(500);


                })


            }


        }

    });


}

function detectMarkerClick() {
    if (markerClick.length != 0) {

        for (var i = 0; i < markerClick.length; i++) {
            if (map.getBounds().contains(markerClick[i].position)) {
                markerClick[i].setMap(map)
            } else {
                markerClick[i].setMap(null)
            }
        }

    }
}

function gestionClick() {
    $('.contenu_resto').on('click', '.retour', function () {
        $('.seeMore').removeClass('activeHUD');
        $('.seeMore .newHUD').fadeOut();
        $('.seeMore h2').fadeIn(500);
        retractionRestoInfo();
    })

    $('.contenu_resto').on('click', '.image', function () {
        $('.contenu_resto').append('<div class="image_full">' + $(this).html() + '<img src="./img/close.svg" class="close"></div>')
        $('body').css('overflow', "hidden");
        window.scroll(0, 0);
    });

    $('.contenu_resto').on('click', '.close', function () {
        $('.image_full').remove();
        $('body').css('overflow', "auto");
    });

    $('.filtre div').click(function () {
        var id = parseInt($(this).attr('id'));
        if (choixFiltre === 0) {
            if (id === minFiltre) {

                $('#' + minFiltre).removeClass('activefiltre');
                $('#' + minFiltre).css('background', '#e6e6e6');
                $('#' + minFiltre).css('border-color', '#9b9b9b');
                choixFiltre = 1;
            } else if (id === maxFiltre) {
                $('#' + maxFiltre).removeClass('activefiltre');
                $('#' + maxFiltre).css('background', '#e6e6e6');
                $('#' + maxFiltre).css('border-color', '#9b9b9b');
                choixFiltre = 2;
            }
        } else {
            if (choixFiltre === 1) {
                if (id < maxFiltre) {

                    minFiltre = id;
                    colorFilter();
                    gestionFiltre();
                    choixFiltre = 0;
                }
            } else if (choixFiltre === 2) {
                if (id > minFiltre) {
                    maxFiltre = id;
                    colorFilter();
                    gestionFiltre();
                    choixFiltre = 0;
                }
            }
        }


    })



}

function changeIconColor(id) {
    $('.icon').removeClass('active');
    $('.icon#' + id).addClass('active');
    type = id;

    switch (id) {
        case 'restaurant':
            typeColor = '#2fdbc1';
            break;
        case 'meal_takeaway':
            typeColor = '#f06161';
            break;
        case 'bar':
            typeColor = '#fe3f79';
            break;
        case 'cafe':
            typeColor = '#feb93f';
            break;
        case 'convenience_store':
            typeColor = '#61f072';
            break;
        case 'supermarket':
            typeColor = '#3f63fe';
    }
    $('.icon').css('background', 'none');
    $('.active').css('background', '#fff');
    $('.active').css('background', typeColor);

}

function createMarkerClick(location) {

    $('body').append('<div class="nameMarker"><input type="text"><div class="button"><h3>Valider</h3><h4>X</h4></div></div>');
    $('.nameMarker h3').css('background', typeColor);
    $('.nameMarker').css('opacity', '1');
    $('.nameMarker h4').click(function () {
        $('.nameMarker').remove();
    })
    $('.nameMarker h3').click(function () {
        var name = $('.nameMarker input').val();
        if (name != "") {
            $('.nameMarker').remove();
            var nb = markerClick.length;
            markerClick[nb] = new google.maps.Marker({
                position: location,
                map: map,
                title: name,
                rating: "0",
                nbComment: "0",
                animation: google.maps.Animation.DROP,
                newMarker: "1",
                placeID: nb,
                icon: {
                    url: './img/icon/new_pin.png',
                    scaledSize: new google.maps.Size(40, 40),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 16)

                }
            });

            var nbElement = $('.seeMore .nbElement').html();

            nbElement++;

            $('.seeMore .nbElement').html(nbElement)

            google.maps.event.addListener(markerClick[nb], 'click', function () {
                $('body').css('overflow-y', 'auto');
                $('.contenu_resto').css('z-index', '6');
                $('.contenu_resto').css('min-height', '100vh');
                $('.contenu_resto').css('height', 'auto');
                $('.contenu_resto').css('top', '0px');
                $('.restaurant').css('width', '80%');
                $('.restaurant').css('height', '70px');
                $('.restaurant').css('margin-top', '20px');
                $('.restaurant h2').css('font-size', '25px');
                $('.restaurant h2').css('top', '50%');
                $('.note').fadeOut();

                clickHUDNewMarker(markerClick[nb].placeID)
            });

        }
    })






}

function CreationFiltre() {
    $('.filtre').remove();
    $('body').append('<div class="filtre"><div id="0">0</div><div id="1">1</div><div id="2">2</div><div id="3">3</div><div id="4">4</div><div id="5">5</div></div>')
    colorFilter();


}

function gestionFiltre() {
    for (var i = 0; i < results.length; i++) {
        var marker = results[i];
        var rating = parseFloat(marker.rating)
        if (rating <= maxFiltre && rating >= minFiltre) {
            marker.setVisible(true);
            $('#' + marker.placeID).css('display', 'block')

        } else {
            $('#' + marker.placeID).css('display', 'none')
            marker.setVisible(false);
        }
    }
    $('.seeMore').removeClass('activeHUD');
    $('.seeMore .newHUD').fadeOut();
    $('.seeMore h2').fadeIn(500);

    $('.seeMore h2').remove();
    var nbFiltre = 0;
    for (var i = 0; i < results.length; i++) {

        if (results[i].rating <= maxFiltre && results[i].rating >= minFiltre) {
            nbFiltre++;
        }
    }

    var nbNew = markerClick.length;
    nbFiltre = nbFiltre + nbNew;

    $('.seeMore').append('<h2 class="nbElement">' + nbFiltre + '</h2>').css('background', typeColor);


}

function colorFilter() {
    $('.filtre div').css('background', '#e6e6e6');
    $('.filtre div').css('border-color', '#9b9b9b');
    $('.filtre div').removeClass('activefiltre');
    var rgba = colorconvert(typeColor.substring(1, typeColor.length), 0.6);
    $('#' + minFiltre).css('background', rgba);
    $('#' + maxFiltre).css('background', rgba);
    $('#' + minFiltre).css('border-color', typeColor);
    $('#' + maxFiltre).css('border-color', typeColor);
    $('#' + minFiltre).addClass("activefiltre");
    $('#' + maxFiltre).addClass("activefiltre");
}

function colorconvert(color, transparency) {
    var r = parseInt(color.substring(0, 2), 16);
    var g = parseInt(color.substring(2, 4), 16);
    var b = parseInt(color.substring(4, 6), 16);
    var a = transparency;
    return ('rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')');
}

function creationMarker() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat_perso = position.coords.latitude;
            var long_perso = position.coords.longitude;
            var pos = {
                lat: lat_perso,
                lng: long_perso
            };
            map.setCenter(pos);
            let myLatlng_perso = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());

            markerCenter = new google.maps.Marker({
                position: myLatlng_perso,
                map: map,
                title: "Votre position",
                animation: google.maps.Animation.DROP,
                icon: {
                    url: './img/icon/gps.svg',
                    scaledSize: new google.maps.Size(32, 32),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 16)

                }


            });
        }, function () {
            map.handleLocationError(true, infoWindow, map.getCenter());
        });
    }
}

function recreateMarkerCenter() {
    let myLatlng_perso = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
    //alert(myLatlng_perso)
    markerCenter = new google.maps.Marker({
        position: myLatlng_perso,
        map: map,
        title: "Votre position",
        animation: google.maps.Animation.DROP,
        icon: {
            url: './img/icon/gps.svg',
            scaledSize: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 16)

        }


    });


}

function decouvreResto(type) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            var request = {
                location: map.center,
                type: [type],
                bounds: map.getBounds()
            };

            let service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);



        }, function () {
            this.handleLocationError(true, infoWindow, map.getCenter());

        });

    } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, map.getCenter());
    }
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {

        if (results.length === 0) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);


            }
        } else {


            for (var i = 0; i < results.length; i++) {


                if (map.getBounds().contains(results[i].geometry.location)) {
                    createMarker(results[i]);
                }


            }
        }

        $('.seeMore h2').remove();
        $('.seeMore .search').fadeOut(700);
        var nbFiltre = 0;
        for (var i = 0; i < results.length; i++) {

            if (results[i].rating <= maxFiltre && results[i].rating >= minFiltre) {
                nbFiltre++;
            }
        }
        var nbNew = markerClick.length;
        nbFiltre = nbFiltre + nbNew;

        $('.seeMore').append('<h2 class="nbElement">' + nbFiltre + '</h2>').css('background', typeColor);

    } else {
        $('.seeMore h2').remove();
        $('.seeMore .search').fadeOut(700);
        var nbNew = markerClick.length;

        if (nbNew != 0) {
            $('.seeMore').append('<h2 class="nbElement">' + nbNew + '</h2>').css('background', typeColor);
        } else {
            $('.seeMore').append('<h2 class="nbElement">0</h2>').css('background', typeColor);
        }


    }

    gestionClick();
    gestionFiltre();
}

function createMarker(place) {

    //dataHUD(place);

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        placeID: place.place_id,
        map: map,
        position: place.geometry.location,
        icon: {
            url: './img/icon/' + type + '_pin.png',
            scaledSize: new google.maps.Size(40, 40)

        },
        title: place.name,
        animation: google.maps.Animation.DROP,
        rating: place.rating
    });
    results.push(marker)
    google.maps.event.addListener(marker, 'click', function () {
        $('body').css('overflow-y', 'auto');
        $('.contenu_resto').css('z-index', '6');
        $('.contenu_resto').css('min-height', '100vh');
        $('.contenu_resto').css('height', 'auto');
        $('.contenu_resto').css('top', '0px');
        $('.restaurant').css('width', '80%');
        $('.restaurant').css('height', '70px');
        $('.restaurant').css('margin-top', '20px');
        $('.restaurant h2').css('font-size', '25px');
        $('.restaurant h2').css('top', '50%');
        $('.note').fadeOut();
        retrouverPlace(marker.placeID);
    });






}

function removeAllMarker() {
    for (var i = 0; i < results.length; i++) {
        results[i].setMap(null);
        results.shift();
        i--;
    }
    $('.HUD').remove();
    markerCenter.setMap(null);

}

function RedecouvreResto(type) {

    var lat_perso = map.getCenter().lat();
    var long_perso = map.getCenter().lng();
    var pos = {
        lat: lat_perso,
        lng: long_perso
    };
    //getZoom
    var request = {
        location: pos,
        type: [type],
        bounds: map.getBounds()
    };

    let service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);
    delete HUD;
    map.setCenter(pos);

    //HUDPlace()


}

function retrouverPlace(id_place) {

    JSONPlace(id_place)
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
        fields: ['name', 'rating', 'formatted_phone_number', 'formatted_address', 'photo', 'review', 'geometry', 'place_id']
    };

    let service = new google.maps.places.PlacesService(map);
    service.getDetails(request, recupDonnees);



}

function recupDonnees(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {


        let Adresse = place.formatted_address;
        let Nom = place.name;

        let Numeros = place.formatted_phone_number;
        if (place.photos != null) {
            let Photos = place.photos[0].getUrl();
        }
        if (place.reviews != null) {
            let review_auteur = place.reviews[0].author_name;
            let review_rating = place.reviews[0].rating;
            let review_text = place.reviews[0].text;
        }

        $('.contenu_resto').attr('id', place.place_id)
        $('.contenu_resto').append('<div class="header_presentation"></div>')
        $('.header_presentation').append('<div class="retour"><img src="./img/back (1).svg"></div>')
        $('.retour').css('background', typeColor)

        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
        $('.contenu_resto').append('<div class="contenu"><div class="commentaire_box"></div><div class="autre"></div></div>');
        const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

        if (place.reviews != null) {

            for (var i = 0; i < place.reviews.length; i++) {

                var dateReview = new Date(place.reviews[i].time * 1000);
                if (dateReview.getYear() > 100) {
                    var year = dateReview.getYear() + 1900;
                }

                var dateFinal = dateReview.getDate() + " " + monthNames[dateReview.getMonth()] + " " + year;

                $('.commentaire_box').append('<div class="commentaire commentaire' + i + '"></div>')
                $('.commentaire' + i).append('<img class="profil" src="' + place.reviews[i].profile_photo_url + '">')
                $('.commentaire' + i).append('<h2>' + place.reviews[i].author_name + '<span>' + dateFinal + '</span></h2>')
                $('.commentaire' + i + ' h2 span').append('<div class="etoile"></div>')

                for (var k = 0; k < place.reviews[i].rating; k++) {
                    $('.commentaire' + i + ' h2 span .etoile').append('<img src="img/star.svg">');
                }

                var etoile_grise = 5 - place.reviews[i].rating;

                for (var j = 0; j < etoile_grise; j++) {
                    $('.commentaire' + i + ' h2 span .etoile').append('<img src="img/star_grey.svg">');
                }

                $('.commentaire' + i).append('<p>' + place.reviews[i].text + '</p>')

            }
            $('.commentaire_box').append('<div class="commentaire commentaireAjout"></div>')
            $('.commentaireAjout').append('<div class="ajout"></div>')
            $('.commentaireAjout div').append('<h2>+</h2>')
        }
        if (place.photos != null) {

            $('.autre').append('<div class="image_box"></div>')


            var image = [];
            for (var j = 0; j < place.photos.length; j++) {


                $('.contenu .autre .image_box').append('<div class="image image' + j + '"></div>');
                $('.contenu .autre .image_box .image' + j).append('<div class="loader"><img src="./img/loader.gif" class="loader_image"></div>')
                image[j] = new Image();
                $(image[j]).fadeOut(1)
                image[j].onload = function () {
                    $('.image_box .image' + j + ' .loader').css('display', 'none')
                    $(this).fadeIn(1300);

                }
                image[j].src = place.photos[j].getUrl();

                $(image[j]).appendTo('.contenu .autre .image_box .image' + j);
            }

        }



        let url = "https://maps.googleapis.com/maps/api/streetview?location=" + lat + "," + lng + "&size=640x220&key=AIzaSyAluhfy6Err8NZWAUGD2HxhT1NgOcnWAVM";
        $('.autre').append('<div class="street"><img src="' + url + '"></div>')
        $('.header_presentation').append('<div class="nom_resto"><h2>' + Nom + '</h2></div>')
        $('.header_presentation .nom_resto').append('<div class="nom_etoile"></div>');

        for (var k = 0; k < place.rating; k++) {
            $('.header_presentation .nom_resto .nom_etoile').append('<img src="img/star.svg">');
        }

        var etoile_grise = 5 - place.rating;

        for (var j = 0; j < etoile_grise; j++) {
            $('.header_presentation .nom_resto .nom_etoile').append('<img src="img/star_grey.svg">');
        }


        detectionComment(place.place_id);

        $('.commentaireAjout').on('click', '.ajout', function () {

            addCommentArea(0);
        });
    }
}

function addCommentArea(newM) {
    var newM = newM
    $('.commentaireAjout').html("");
    $('.commentaireAjout').addClass("create");
    $('.commentaireAjout').append('<input type="text" class="nameAdd"><input type="number" min="0" max="5" value="0" class="rating"><textarea name="" id="" class="text"></textarea><div class="boutonCreateSend"><img src="./img/send-button.svg"></div>')

    $('.boutonCreateSend').css('background', typeColor)

    $('.boutonCreateSend').click(function () {
        $('.commentaireAjout').removeClass("create");
        var name = $('.nameAdd').val();
        var rating = $('.rating').val().toString();
        var text = $('.text').val();
        var id = $('.contenu_resto').attr('id');
        addComment(name, rating, text, 0, newM)
    })
}

function detectionComment(id) {
    if (comment.length != 0) {
        var idx = commentID.indexOf(id);
        var indices = [];
        while (idx != -1) {
            indices.push(idx);
            var idx = commentID.indexOf(id, idx + 1);
        }


        for (var i = 0; i < indices.length; i++) {
            var id = comment[indices[i]][0];
            var name = comment[indices[i]][1];
            var date = comment[indices[i]][2];
            var rating = comment[indices[i]][3];
            var text = comment[indices[i]][4];

            addComment(name, rating, text, 1);

        }

    }
}

function detectionMarker(id, newMarker) {
    if (markerClick.length != 0) {
        for (var i = 0; i < markerClick.length; i++) {
            var placeID = parseInt(markerClick[i].placeID)
            var idInt = parseInt(id)
            if (placeID === idInt) {
                return (markerClick[i])
            }
        }

    }
}

function addComment(name, rating, text, detection, newMarker) {

    if (rating > 5) {
        rating = 5;
    }
    const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var monthName = monthNames[month];
    var day = now.getDate();

    var dateFinal = day + " " + monthName + " " + year;

    $('.commentaireAjout').html("");
    $('.commentaireAjout').append('<div class="ajout"></div>')
    $('.commentaireAjout div').append('<h2>+</h2>')
    var nb = $('.commentaire').length;
    var i = $('.commentaire').length + 1;

    $('.commentaireAjout').before('<div class="commentaire commentaire' + i + ' add"></div>')
    $('.commentaire' + i).append('<div class="newProfil"><h2>' + name.charAt(0).toUpperCase() + '</h2></div>')
    $('.commentaire' + i).append('<h2>' + name + '<span>' + dateFinal + '</span></h2>')
    $('.commentaire' + i + ' h2 span').append('<div class="etoile"></div>');


    for (var k = 0; k < rating; k++) {
        $('.commentaire' + i + ' .etoile').append('<img src="img/star.svg">');
    }

    var etoile_grise = 5 - rating;

    for (var j = 0; j < etoile_grise; j++) {
        $('.commentaire' + i + ' .etoile').append('<img src="img/star_grey.svg">');
    }

    $('.commentaire' + i).append('<p>' + text + '</p>');

    var id = $('.contenu_resto').attr('id');

    var addComment = [id, name, dateFinal, rating, text];

    if (newMarker === 1) {
        var detectionM = detectionMarker(id, newMarker);

        if (parseInt(detectionM.newMarker) === 1) {
            detectionM.nbComment++;
            var nbComment = detectionM.nbComment;
            var ratingDetect = detectionM.rating;
            var points = ratingDetect * (nbComment - 1);
            var newRating = parseInt(points) + parseInt(rating);
            newRating = newRating / nbComment;
            detectionM.rating = newRating;

        }
    }


    if (detection === 0) {
        commentID.push(id);

        comment.push(addComment);

    }




}

function retractionRestoInfo() {
    $('.contenu_resto').css('height', '0');
    $('.contenu_resto').html("");
    $('.contenu_resto').css('top', '100%');
    $('body').css('overflow-y', 'hidden');
    $('.filtre').fadeIn(500);
}

function dataHUD(place) {
    var nb_restaurant = $('.restaurant').length + 1;
    $('.HUD').append('<div id="' + place.place_id + '" class="restaurant restaurant' + nb_restaurant + '"></div>');
    $('.restaurant' + nb_restaurant).append('<div class="imageResto"></div>')
    $('.restaurant' + nb_restaurant).append('<h2>' + place.name + '</h2>');


    $('.restaurant' + nb_restaurant).append('<div class="note"></div>');


    var rating_round = Math.round(place.rating);
    var etoile_grise = 5 - rating_round;

    for (var i = 0; i < rating_round; i++) {
        $('.restaurant' + nb_restaurant + ' .note').append('<img src="img/star.svg">');
    }

    for (var j = 0; j < etoile_grise; j++) {
        $('.restaurant' + nb_restaurant + ' .note').append('<img src="img/star_grey.svg">');
    }

}

function HUDPlace() {
    $('.contenu_resto').remove();
    $('body').append('<div class="HUD"></div><div class="contenu_resto"></div>')

}

function clickHUDNewMarker(id) {
    let marker = markerClick[id];
    let Nom = marker.title;
    $('.contenu_resto').attr('id', id)

    $('.contenu_resto').append('<div class="header_presentation"></div>')

    $('.header_presentation').append('<div class="retour"><img src="./img/back (1).svg"></div>')
    $('.retour').css('background', typeColor)
    let lat = marker.position.lat();
    let lng = marker.position.lng();
    $('.contenu_resto').append('<div class="contenu"><div class="commentaire_box"></div><div class="autre"></div></div>');
    const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

    $('.commentaire_box').append('<div class="commentaire commentaireAjout"></div>')
    $('.commentaireAjout').append('<div class="ajout"></div>')
    $('.commentaireAjout div').append('<h2>+</h2>')

    let url = "https://maps.googleapis.com/maps/api/streetview?location=" + lat + "," + lng + "&size=640x220&key=AIzaSyAluhfy6Err8NZWAUGD2HxhT1NgOcnWAVM";
    $('.autre').append('<div class="street"><img src="' + url + '"></div>')
    $('.header_presentation').append('<div class="nom_resto"><h2>' + Nom + '</h2></div>')
    $('.header_presentation .nom_resto').append('<div class="nom_etoile"></div>');

    for (var k = 0; k < marker.rating; k++) {
        $('.header_presentation .nom_resto .nom_etoile').append('<img src="img/star.svg">');
    }
    var etoile_grise = 5 - marker.rating;

    for (var j = 0; j < etoile_grise; j++) {
        $('.header_presentation .nom_resto .nom_etoile').append('<img src="img/star_grey.svg">');
    }
    detectionComment(id.toString());

    $('.commentaireAjout').on('click', '.ajout', function () {
        addCommentArea(1);
    });

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Erreur: Problèmpe avec le service de géolocalisation.' :
        'Erreur: Votre navigateur ne supporte pas la géolocalisation.');
    infoWindow.open(map);
}
