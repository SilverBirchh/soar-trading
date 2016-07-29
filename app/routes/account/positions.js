import Ember from 'ember';

export default Ember.Route.extend({
  dealService: Ember.inject.service('deal-service'),
  confirmService: Ember.inject.service('confirm-service'),
  notify: Ember.inject.service('notify'),
  model: function() {
    return this.store.findAll('position');
  },
  deactivate: function() {
    this.get('store').unloadAll('position');
    this.refresh();
  },
  onClose(response, position, size) {
    this.get('confirmService').confirm(response.dealReference, position, size, this.onConfirm.bind(this));
  },
  onConfirm(response, position, size) {
    if (size.toString() === position.dealSize.toString() && response.dealStatus === "ACCEPTED") {
      this.get('store').unloadAll('position');
    }
    this.refresh();
    if (response.dealStatus === "ACCEPTED") {
      this.get('notify').success(response.dealStatus);
    } else {
      this.get('notify').error(response.dealStatus);
    }
  },

  actions: {
    close(position, size) {
      this.get('dealService').closePosition(position, size, this.onClose.bind(this));
    }
  }
});
