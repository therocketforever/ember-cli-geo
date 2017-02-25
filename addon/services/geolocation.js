import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {

  currentLocation: null,

  getLocation(geoOptions) {

      console.log(process.env.EMBER_CLI_FASTBOOT )
    return new Ember.RSVP.Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((geoObject) => {
        this.trigger('geolocationSuccess', geoObject, resolve);
      }, (reason) => {
        this.trigger('geolocationFail', reason, reject);
      }, geoOptions);
    });

  },

  trackLocation(geoOptions) {

      console.log(process.env.EMBER_CLI_FASTBOOT )
    return new Ember.RSVP.Promise((resolve, reject) => {
      navigator.geolocation.watchPosition((geoObject) => {
        this.trigger('geolocationSuccess', geoObject, resolve);
      }, (reason) => {
        this.trigger('geolocationFail', reason, reject);
      }, geoOptions);
    });

  },

  geolocationDidSucceed: Ember.on('geolocationSuccess', function(geoObject, resolve) {
    this.set('currentLocation', [geoObject.coords.latitude, geoObject.coords.longitude]);
    resolve(geoObject);
  }),

  geolocationDidFail: Ember.on('geolocationFail', function(reason, reject) {
    reject(reason);
  })

});
