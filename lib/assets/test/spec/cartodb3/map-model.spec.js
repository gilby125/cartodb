var MapModel = require('../../../javascripts/cartodb3/map-model');

describe('map-model', function () {
  beforeEach(function () {
    this.map = new MapModel({
      urlRoot: '/bampadam',
      id: 9000
    });
  });

  it('should have a layers collection', function () {
    expect(this.map.layers).toBeDefined();
    expect(this.map.layers.url()).toEqual('/bampadam/maps/9000/layers');
  });
});