import Ember from 'ember';

export default Ember.ObjectController.extend({
  preferences: null,

  modelDidChange: function() {
    if (window.EmberENV.segmentWriteKey != null) {
      analytics.identify(
        this.get('initials'),
        _(this.get('model').toJSON()).pick('initials', 'name', 'developer')
      );
    }
  }.observes('model'),

  setupIntercom: function() {
    if (window.EmberENV.intercomAppId != null) {
      /* jshint newcap: false */
      Intercom('boot', {
        app_id: window.EmberENV.intercomAppId,
        email: this.get('email'),
        created_at: this.get('createdAt'),
        name: this.get('name'),
        user_id: this.get('id'),
        user_hash: this.get('intercomUserHash')
      });
      /* jshint newcap: true */
    }
  },

  actions: {
    boot: function() {
      this.setupIntercom();
    }
  }
});
