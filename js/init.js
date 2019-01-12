class Map {

    initMap(div) {
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
        this.results = null;
        this.markerCenter;
        this.circle = {
            lat: this.lat,
            lng: this.lon
        };

        this.map = new google.maps.Map(document.getElementById(div), {
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

        this.creationMarker();
        this.decouvreResto();
        this.CreationFiltre();




    }



    creationMarker() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let myLatlng_perso = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //alert(myLatlng_perso)
                map.markerCenter = new google.maps.Marker({
                    position: myLatlng_perso,
                    map: map.map,
                    title: "Votre position",
                    //animation: google.maps.Animation.DROP,
                    icon: {
                        url: './img/marker4.png',
                        scaledSize: new google.maps.Size(32, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(16, 16)

                    }


                });


                var lat_perso = position.coords.latitude;
                var long_perso = position.coords.longitude;
                var pos = {
                    lat: lat_perso,
                    lng: long_perso
                };
                map.map.setCenter(pos);

                map.creationCircle(map.map.getCenter());


            }, function () {
                this.map.handleLocationError(true, infoWindow, this.map.getCenter());
            });
        }

        this.map.addListener('dragend', function () {
            var latLng = new google.maps.LatLng(map.map.getCenter().lat(), map.map.getCenter().lng());
            map.removeCircle();
            console.log(latLng.lat())
            map.map.setCenter(latLng);
            map.map.center = latLng;
            map.removeAllMarker();
            map.creationCircle(map.map.getCenter())
        });

    }

    creationCircle(center) {
        this.center = center;
        this.circle = new google.maps.Circle({
            strokeColor: '#F9C822',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: '#F9C822',
            fillOpacity: 0.1,
            map: map.map,
            center: center,
            radius: 3000
        });
    }

    removeCircle() {
        this.circle.setMap(null);
    }

    recreateMarkerCenter() {
        let myLatlng_perso = new google.maps.LatLng(map.map.getCenter().lat(), map.map.getCenter().lng());
        //alert(myLatlng_perso)
        map.markerCenter = new google.maps.Marker({
            position: myLatlng_perso,
            map: map.map,
            title: "Votre position",
            //animation: google.maps.Animation.DROP,
            icon: {
                url: './img/marker4.png',
                scaledSize: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 16)

            }


        });
    }




    callback(results, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            //this.results = results;
            map.results = []
            for (var i = 0; i < results.length; i++) {
                map.createMarker(results[i]);
                //map.results[i] = results[i];
                //console.log(map.results)
            }

        } else {
            //alert("Pas de restaurant aux alentours")
        }

        map.gestionClick();
    }

    createMarker(place) {
        this.RemplirHUD(place);
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            placeID: place.place_id,
            map: map.map,
            position: place.geometry.location,
            icon: {
                url: './img/marker3.png',
                scaledSize: new google.maps.Size(32, 32)

            },
            title: place.name,
            rating: place.rating
        });
        map.results.push(marker)
        google.maps.event.addListener(marker, 'click', function () {

        });


    }

    removeAllMarker() {
        for (var i = 0; i < map.results.length; i++) {
            map.results[i].setMap(null);
        }
        $('.HUD').remove();
        map.markerCenter.setMap(null);

        map.recreateMarkerCenter();
        map.RedecouvreResto();


    }


    decouvreResto() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                var lat_perso = position.coords.latitude;
                var long_perso = position.coords.longitude;
                var pos = {
                    lat: lat_perso,
                    lng: long_perso
                };
                //getZoom
                var request = {
                    location: pos,
                    radius: '3000',
                    type: ['restaurant']
                };

                let service = new google.maps.places.PlacesService(map.map);
                service.nearbySearch(request, map.callback);
                map.map.setCenter(pos);
            }, function () {
                this.handleLocationError(true, infoWindow, map.map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, infoWindow, map.map.getCenter());
        }





    }

    RedecouvreResto() {

        var lat_perso = map.map.getCenter().lat();
        var long_perso = map.map.getCenter().lng();
        var pos = {
            lat: lat_perso,
            lng: long_perso
        };
        //getZoom
        var request = {
            location: pos,
            radius: '3000',
            type: ['restaurant']
        };

        let service = new google.maps.places.PlacesService(map.map);
        service.nearbySearch(request, map.callback);
        delete map.HUD;
        map.map.setCenter(pos);

        map.HUDPlace()

    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Erreur: Problèmpe avec le service de géolocalisation.' :
            'Erreur: Votre navigateur ne supporte pas la géolocalisation.');
        infoWindow.open(map.map);
    }

    HUDPlace() {
        $('body').append('<div class="HUD"></div><div class="contenu_resto"></div>')

    }

    CreationFiltre() {
        $('body').append('<div class="filtre"><h2></h2><div class="image_filtre" id="1"><img src="./img/star.svg" id="1" class="star"><h3 class="dnone">1</h3></div></div>')
        $('.filtre').append('<div class="image_filtre" id="2"><img src="./img/star.svg" id="2" class="star" ><h3 class="dnone">2</h3></div>');
        $('.filtre').append('<div class="image_filtre" id="3"><img src="./img/star.svg" id="3" class="star" ><h3 class="dnone">3</h3></div>');
        $('.filtre').append('<div class="image_filtre" id="4"><img src="./img/star.svg" id="4" class="star" ><h3 class="dnone">4</h3></div>');
        $('.filtre').append('<div class="image_filtre" id="5"><img src="./img/star.svg" id="5" class="star" ><h3 class="dnone">5</h3></div>');
    }

    retrouverPlace(id_place) {
        //console.log(id_place)

        this.JSONPlace(id_place)
        console.log("oui")
    }

    RemplirHUD(place) {
        //console.log(place)
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


    JSONPlace(place_id) {
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

        let service = new google.maps.places.PlacesService(map.map);
        service.getDetails(request, this.recupDonnees);



    }

    recupDonnees(place, status) {
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

            $('.contenu_resto').append('<div class="header_presentation"></div>')
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
            $('.contenu_resto').append('<div class="contenu"><div class="commentaire_box"></div><div class="autre"></div></div>')

            if (place.reviews != null) {

                for (var i = 0; i < place.reviews.length; i++) {

                    $('.commentaire_box').append('<div class="commentaire commentaire' + i + '"></div>')
                    $('.commentaire' + i).append('<h2>' + place.reviews[i].author_name + '</h2>')
                    $('.commentaire' + i).append('<h3>' + place.reviews[i].rating + '</h3>')
                    $('.commentaire' + i).append('<p>' + place.reviews[i].text + '</p>')
                    /**console.log("%c*****************", 'color:green; font-weight: bold');
                    console.log('%cAuteur = ' + place.reviews[i].author_name, 'color:blue');
                    console.log('%cNote = ' + place.reviews[i].rating, 'color:blue');
                    console.log('%cCommentaire = ' + place.reviews[i].text, 'color:blue');**/

                }
                $('.commentaire_box').append('<div class="commentaire commentaireAjout"></div>')
                $('.commentaireAjout').append('<div class="ajout"></div>')
                $('.commentaireAjout div').append('<h2>+</h2>')
            }




            if (place.photos != null) {

                //console.log('Photo_url= ' + place.photos[0].getUrl());
                $('.autre').append('<div class="image_box"></div>')
                $('.contenu_resto .header_presentation').css('background-image', 'url("' + place.photos[0].getUrl() + '")');
                //$('.contenu_resto .header_presentation').css('background-image', 'url("' + url + '")');

                //https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyAluhfy6Err8NZWAUGD2HxhT1NgOcnWAVM

                //console.log(url)



                for (var j = 0; j < place.photos.length; j++) {


                    $('.contenu .autre .image_box').append('<div class="image"><img src="' + place.photos[j].getUrl() + '"></div>');
                }

            }


            let url = "https://maps.googleapis.com/maps/api/streetview?location=" + lat + "," + lng + "&size=640x220&key=AIzaSyAluhfy6Err8NZWAUGD2HxhT1NgOcnWAVM";
            $('.autre').append('<div class="street"><img src="' + url + '"></div>')
            //console.log("%c▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮", 'color:red; font-weight: bold');
            $('.header_presentation').append('<div class="nom_resto"><h2>' + Nom + '</h2></div>')



            $('.commentaireAjout').on('click', '.ajout', function () {

                map.ajoutCommentaire();
            });
        }
    }

    ajoutCommentaire() {
        $('.commentaireAjout').html("");
        $('.commentaireAjout').addClass("create");
        $('.commentaireAjout').append('<input type="text"><input type="number" min="0" max="5" value="0"><textarea name="" id="" ></textarea><div class="boutonCreateSend"><img src="./img/send-button.svg"></div>')

        //<h2>Ricardo Citera</h2><h3>4</h3><p>Great personal and service. The place was top</p>
    }

    retractionRestoInfo() {
        $('.contenu_resto').css('min-height', '0vh');
        $('.contenu_resto').css('height', '0vh');
        $('.contenu_resto').html("");
        $('.contenu_resto').css('top', '100%');
        $('.HUD').fadeIn(1);
        $('.HUD').html(this.HUD);
        $('.HUD').css('border-top-right-radius', '50px');
        $('.HUD').css('border-top-left-radius', '50px');
        $('.HUD').css('justify-content', 'start');

        $('.filtre').fadeIn(500);

        //this.gestionClick();
    }

    gestionClick() {
        $('.contenu_resto').on('click', '.nom_resto', function () {
            map.retractionRestoInfo();
        })

        $('.HUD').on('click', '.restaurant', function () {
            console.log('click HUD')
            delete map.HUD;

            map.HUD = $('.HUD').html();
            console.log(map.HUD)
            $('.HUD').html("");
            //$('.HUD').css('top', '0px');
            $('.HUD').fadeOut(1);
            //$('.HUD').css('height', '100vh');
            $('.contenu_resto').css('min-height', '100vh');
            $('.contenu_resto').css('height', 'auto');
            $('.contenu_resto').css('top', '0px');
            var resto = $(this).clone();
            //$('.HUD').html(resto);
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
            map.retrouverPlace(id);
            $('.filtre').fadeOut(500);


        });

        $('.filtre').click(function () {
            $(this).toggleClass("activefiltre");
            $('.filtre .star').toggleClass('active');
            $('.filtre .image_filtre').toggleClass('active_div');
            $('.filtre h2').toggleClass('dnone');
            $('.filtre h3').toggleClass('dnone');
            //alert("click")

        });


        $('.filtre').on('click', '.active_div', function () {

            var id = $(this).attr("id");
            console.log(id)
            map.gestionFiltre(id);
        });

        $('.contenu_resto').on('click', '.image', function () {
            $('.contenu_resto').append('<div class="image_full">' + $(this).html() + '<img src="./img/close.svg" class="close"></div>')
            $('body').css('overflow', "hidden");
            window.scroll(0, 0);
        });

        $('.contenu_resto').on('click', '.close', function () {
            $('.image_full').remove();
            $('body').css('overflow', "auto");
        });


    }

    gestionFiltre(id) {
        //console.log("ID: "+id)
        for (var i = 0; i < map.results.length; i++) {
            var marker = map.results[i];
            //console.log("Rating: "+parseInt(marker.rating))
            //console.log("ID: "+marker.placeID)
            var rating = parseInt(marker.rating)
            $('.filtre h2').html(id);
            if (rating === parseInt(id)) {
                marker.setVisible(true);
                $('#' + marker.placeID).css('display', 'block')

                //map.results[1].setVisible(false)
            } else {
                $('#' + marker.placeID).css('display', 'none')
                marker.setVisible(false);
            }
        }

        //console.log('-------------------')


    }
}
