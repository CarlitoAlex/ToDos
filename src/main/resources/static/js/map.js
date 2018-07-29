var avatar;

var map, infoWindow;
var username;

$(document).ready(function () {
    $("#get_location").trigger("click");
    username = document.getElementById("username").innerText;
});

(function ($, window, document) {
    $('#get_location').click(function (e) {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var google_map_pos = new google.maps.LatLng(lat, lng);
                console.log(lat + " " + lng + " geometka")

                var owner = document.getElementById("username").innerText;

                infoWindow = new google.maps.InfoWindow();

                var center = {lat: lat, lng: lng, owner: owner};

                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: center
                });


                axios.post('/getPosition', center)
                    .then(function (result) {
                        console.log(result);
                        result.lat;
                        result.lng;
                        console.log(lat + " contoller Lng" + lng)
                    })
                    .catch(function (reason) {
                        console.error(reason);
                    });


                var myPosition = {
                    person: {
                        center: {lat: lat, lng: lng},
                        radius: 200
                    }
                };

                for (person in myPosition) {
                    var personCircle = new google.maps.Circle({
                        strokeColor: '#311B92',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#673AB7',
                        fillOpacity: 0.35,
                        map: map,
                        center: myPosition[person].center,
                        radius: Math.sqrt(myPosition[person].radius) * 100
                    });
                }

                var marker = new google.maps.Marker({
                    position: center,
                    map: map
                });

                console.log("HELLO FROM USER MARKER");
            }
        )
        ;
    })
})(jQuery, window, document);


$(document).ready(function () {

    avatar = new Vue({
        el: "#avatar",
        data: {
            imageLink: "",
            user: ""
        },
        created: function () {
            this.user = document.getElementById("username").innerText;
            var usr = {
                data: null,
                nick: this.user
            };
            axios.post('/getUser', usr)
                .then(function (result) {
                    avatar.imageLink = result.data.avatar;
                })
                .catch(function (reason) {
                    console.error(reason);
                });
        }
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

var channelTimer = setInterval(function () {
        axios.post("/userChannelList")
            .then(function (result) {
                var list = result.data;
                if (list.length !== 0) {
                    for (var i = 0; i < list.length; i++) {
                        var channels = list[i].channels;
                        var uuid = list[i].id;
                        var latLng = new google.maps.LatLng(list[i].lat, list[i].lng);
                        addMarker(latLng, channels, uuid)
                    }
                }
            })
            .catch(function (reason) {
                console.error(reason);
            });
        console.log("HELLO FROM CHANNEL MARKER!");
    },
    10000
    )
;

infoWindow = new google.maps.InfoWindow();
// Отслеживаем клик в любом месте карты
google.maps.event.addListener(map, "click", function () {
    // infoWindow.close - закрываем информационное окно.
    infoWindow.close();
});


function addMarker(latLng, name, uuid) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: name
    });


    google.maps.event.addListener(marker, "click", function () {

        var usr = {
            data: uuid,
            nick: username
        };

        axios.post("/checkpoint", usr)
            .then(function (result) {
                    var disabled = true;
                    if (result.data.valid === true) disabled = false;
                    // contentString - это переменная в которой хранится содержимое информационного окна.
                    var contentString = '<div class="infowindow">' +
                        '<h3>' + name + '</h3>' +
                        '<a href="/chat/' + uuid + '"><button type="submit" ';

                    console.log(disabled);
                    if (disabled === true) contentString += "disabled";

                    contentString += ' class="btn btn-success" style="margin-top: 20px">Join channel</button></a>' +
                        '</div>';
                    // Меняем содержимое информационного окна
                    infoWindow.setContent(contentString);
                    // Показываем информационное окно
                    infoWindow.open(map, marker);
                }
            )
            .catch(function (reason) {
                console.error(reason);
            });

    });
}
