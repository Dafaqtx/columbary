"use strict";

google.maps.event.addDomListener(window, "load", init);
var map,
  markersArray = [];

function bindInfoWindow(marker, map, infowindow, html) {
  marker.addListener("click", function() {
    infowindow.setContent(html);
    infowindow.open(map, this);
  });
}

function init() {
  var mapOptions = {
    center: new google.maps.LatLng(55.871093, 37.344695),
    zoom: 16,
    gestureHandling: "auto",
    fullscreenControl: false,
    zoomControl: true,
    disableDoubleClickZoom: false,
    mapTypeControl: false,
    scaleControl: false,
    scrollwheel: false,
    streetViewControl: false,
    draggable: true,
    clickableIcons: false,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        stylers: [
          {
            saturation: -100
          }
        ]
      }
    ]
  };
  var mapElement = document.getElementById("map");

  var map = new google.maps.Map(mapElement, mapOptions);
  var locations = [
    {
      title: "Коламбарий",
      address: "Москва, Россия",
      lat: 55.8716,
      lng: 37.345,
      vicinity: "Moscow"
    }
  ];

  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      icon: {
        url: "/img/map-icon.svg",
        scaledSize: new google.maps.Size(60, 90)
      },
      position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
      map: map,
      title: locations[i].title,
      address: locations[i].address,
      desc: locations[i].desc,
      tel: locations[i].tel,
      int_tel: locations[i].int_tel,
      vicinity: locations[i].vicinity,
      open: locations[i].open,
      open_hours: locations[i].open_hours,
      photo: locations[i].photo,
      time: locations[i].time,
      email: locations[i].email,
      web: locations[i].web,
      iw: locations[i].iw
    });
    markersArray.push(marker);

    if (locations[i].iw.enable === true) {
      bindInfoWindow(marker, map, locations[i]);
    }
  }
}
