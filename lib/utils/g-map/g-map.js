import { Meteor } from "meteor/meteor";

Gmap = {
  init: function (selector, myLatlng) {

    const canvas = document.querySelector(selector);

    return new google.maps.Map(canvas, {
      center: myLatlng,
      zoom: 8,
      disableDefaultUI: true
    });

  },

  addMarker: function (map, myLatlng, iconUrl, title = '', draggable = false) {

    const icon = {
      url: iconUrl,
      size: new google.maps.Size(40, 40),
      scaledSize: new google.maps.Size(40, 40)
    };

    return new google.maps.Marker({
      position: myLatlng,
      map: map,
      draggable: draggable,
      title: title,
      icon: icon,
    });

  },
}