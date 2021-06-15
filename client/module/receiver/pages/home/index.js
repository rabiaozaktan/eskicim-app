// import google from 'google-maps';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
const { default: Swal } = require("sweetalert2");

Template.receiverPageHome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    announcements: [],
    notFound: false
  });

  this.markers = [];
});

Template.receiverPageHome.onRendered(function () {
  const self = this;

  self.map = Gmap.init('#map', new google.maps.LatLng(0, 0)) //40.823, 29.478

  function deleteMarkers() {
    for (let i = 0; i < self.markers.length; i++) {
      self.markers[i].setMap(null);
    }
    self.markers = [];
  }

  if (navigator.geolocation) {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;
      self.crd = {
        latitude: crd.latitude,
        longitude: crd.longitude,
        accuracy: crd.accuracy,
      };
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      const myLatlng = new google.maps.LatLng(crd.latitude, crd.longitude);

      self.map = Gmap.init('#map', myLatlng) //40.823, 29.478

      self.marker = Gmap.addMarker(self.map, myLatlng, '/assets/svg/location-main.svg')

      AppUtil.refreshTokens.set('announcements', Random.id());
    }

    function error(error) {
      console.warn(`ERROR(${error.code}): ${error.message}`);

      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("Kullanıcı izin vermeyi reddetti.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Lokasyon bilgisi bulunamadı.");
          break;
        case error.TIMEOUT:
          console.log("İstek zaman aşımına uğradı.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("Bilinmeyen bir hata oluştu.");
          break;
      }
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  this.autorun(function () {
    AppUtil.refreshTokens.get('announcements');

    if (!self.crd) {
      return;
    }

    const latitude = self.crd.latitude
    const longitude = self.crd.longitude

    deleteMarkers();

    Meteor.call('receiver.announcements.list', { latitude, longitude }, function (error, result) {
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      console.log(result);

      for (let i = 0; i < result.announcements.length; i++) {
        const announcement = result.announcements[i];

        const myLatlng = new google.maps.LatLng(announcement.location.latitude, announcement.location.longitude);

        const marker = Gmap.addMarker(self.map, myLatlng, '/assets/svg/location.svg', announcement.descriptions)

        self.markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            console.log(marker, result.announcements[i]);

            AppUtil.temp.set('announcement', result.announcements[i])
            $('#brdReceiverModalAnnouncement').modal('show');
          }
        })(marker, i));
      }

      self.state.set('announcements', result.announcements);
    });

  });
});

Template.receiverPageHome.events({ 
  'click .brd-my-location': function (event, template) {
    event.preventDefault();

    const location = Geolocation.currentLocation();

    if (!location) {
      return
    }

    console.log(Geolocation.currentLocation());
    const crd = location.coords;
    template.crd = crd;

    const myLatlng = new google.maps.LatLng(crd.latitude, crd.longitude);
    template.map = Gmap.init('#map', myLatlng) //40.823, 29.478
    template.marker = Gmap.addMarker(template.map, myLatlng, '/assets/svg/location-main.svg')
  }
});