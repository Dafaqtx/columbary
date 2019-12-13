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
    center: new google.maps.LatLng(55.804858, 37.590193),
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
      title: "SKL Tech",
      address: "Москва, Россия",
      desc: "",
      tel: "",
      int_tel: "",
      email: "",
      web: "https://savcity.ru/",
      web_formatted: "",
      open: "",
      time: "",
      lat: 55.804858,
      lng: 37.590193,
      vicinity: "Moscow",
      marker: {
        fillColor: "#F44336",
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 1.5,
        path:
          "M10.2,2.5v4.2c0,0,0,0,0,0L10.2,2.5c-6,0-10.9,4.9-10.9,10.9s10.9,23.8,10.9,23.8v0c0,0,10.9-17.8,10.9-23.8 S16.2,2.5,10.2,2.5z M10.2,17.9c-2.5,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6s4.6,2.1,4.6,4.6S12.8,17.9,10.2,17.9z M16.8,14.1 c0-0.2,0-0.3,0-0.5C16.9,13.8,16.9,14,16.8,14.1z",
        anchor: {
          x: 10,
          y: 30
        },
        origin: {
          x: 0,
          y: 0
        },
        style: 5
      },
      iw: {
        address: true,
        desc: true,
        email: true,
        enable: true,
        int_tel: true,
        open: true,
        open_hours: true,
        photo: true,
        tel: true,
        title: true,
        web: true
      }
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
