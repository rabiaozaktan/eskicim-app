import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
const { default: Swal } = require("sweetalert2");

Template.customerPageAnnouncement.onCreated(function () {
  this.state = new ReactiveDict(null, {
    images: []
  });
});

Template.customerPageAnnouncement.onRendered(function () {
  const self = this;

  self.map = Gmap.init('#map', new google.maps.LatLng(0, 0)) //40.823, 29.478

  if (navigator.geolocation) {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;
      self.crd = crd;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      const myLatlng = new google.maps.LatLng(crd.latitude, crd.longitude);

      self.map = Gmap.init('#map', myLatlng) //40.823, 29.478

      self.marker = Gmap.addMarker(self.map, myLatlng, '/assets/svg/location-main.svg')
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
});

Template.customerPageAnnouncement.events({
  'click .takePhoto': function (event, template) {
    event.preventDefault();
    const images = template.state.get('images');

    const cameraOptions = {
      width: 800,
      height: 600
    };

    MeteorCamera.getPicture(cameraOptions, function (error, data) {
      if (error) {
        return; // here maybe you can give an error.
      }

      images.push(data);
      template.state.set('images', images)
    });
  },
  'click .brd-remove-image': function (event, template) {
    event.preventDefault();
    const images = template.state.get('images');

    Swal.fire({
      title: 'Emin misiniz?',
      text: 'Resim silinecek.',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Hayır',
      confirmButtonText: 'Evet'
    }).then((value) => {
      if (value.isConfirmed) {
        images.splice(event.target.dataset.index, 1);
        template.state.set('images', images);
      }
    });

  },
  'submit form': function (event, template) {
    event.preventDefault();
    const images = template.state.get('images');
    const description = event.target.description.value
    const map = template.map
    const location = template.crd

    const obj = {
      descriptions: description,
      location: {
        accuracy: location.accuracy,
        latitude: location.latitude,
        longitude: location.longitude,
      },
      images: images,
    }

    console.log(obj);

    LoadingSection.hide(template, '.loading-temp');
    Meteor.call('customer.announcements.create', obj, function (error, result) {
      LoadingSection.hide(template, '.loading-temp');
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      Swal.fire({
        title: 'Başarılı',
        text: 'Kayıt başarılı',
        icon: 'success',
        confirmButtonText: 'Tamam'
      }).then(r => {
        FlowRouter.go('/customer/home');
      });
    });
  },
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