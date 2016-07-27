var Backbone = require('backbone');
var CustomLayerModel = require('./custom-layer-model');
var _ = require('underscore');

module.exports = Backbone.Collection.extend({

  model: function (d, opts) {
    var self = opts.collection;

    var m = new CustomLayerModel(d, {
      parse: true,
      collection: self
    });

    return m;
  },

  url: function () {
    var baseUrl = this._configModel.get('base_url');
    var version = this._configModel.urlVersion('visualization');
    return baseUrl + '/api/' + version + '/users/' + this._currentUserId + '/layers';
  },

  initialize: function (attrs, opts) {
    if (!opts.configModel) throw new Error('configModel is required');
    if (!opts.currentUserId) throw new Error('currentUserId is required');

    this._configModel = opts.configModel;
    this._currentUserId = opts.currentUserId;
  },

  getSelected: function () {
    return _.first(
      this.where({ selected: true })
    );
  },

  updateSelected: function (id) {
    var oldSelected = this.getSelected();
    oldSelected && oldSelected.save({ selected: false });

    var newSelected = this.get(id);
    if (newSelected) {
      if (oldSelected && oldSelected.get('className') === newSelected.get('className')) return;

      newSelected.save({ selected: true });
    }
  }

});