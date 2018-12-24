let donnees
var json = $.getJSON("../resto.json", function (data) {
    donnees = data;
    console.log(data);
})

$(function () {
    //alert(donnees[0]["restaurantName"]);

    //var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';


    /**for (var i = 0; i < donnees.length; i++) {
        console.log(donnees[i]["restaurantName"]);
        console.log(donnees[i]["address"]);
        let myLatlng = new google.maps.LatLng(donnees[i]["lat"], donnees[i]["long"]);
        window['marker' + i] = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: donnees[i]["restaurantName"],
            animation: google.maps.Animation.DROP,
            icon: {
                url: '../img/marker3.png',
                scaledSize: new google.maps.Size(32, 32)

            }


        });

    }


    function drop() {
        for (var i = 0; i < markerArray.length; i++) {
            setTimeout(function () {
                addMarkerMethod();
            }, i * 200);
        }
    }**/
});
