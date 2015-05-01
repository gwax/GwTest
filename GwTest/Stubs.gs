function load_Stubs() {
  load_StubsManager();
}

var StubsManager;
function load_StubsManager() {
  /**
   * Class for managing stubs to replace attributes of given objects.
   * @constructor
   */
  StubsManager = function() {
    this.stubbed_attrs = [];
  };
  StubsManager.prototype = {};

  /**
   * Stub out a given attribute of a given object.
   * @param obj The object to set a stub for.
   * @param attr The attribute name to stub out.
   * @param value The value to replace the existing value with.
   * @throws {Error} Raised if the given object does not have the given attribute.
   */
  StubsManager.prototype.Set = function(obj, attr, value) {
    if (!obj.hasOwnProperty(attr)) throw new Error('Object has no property "' + attr + '"');
    var orig = obj[attr];
    this.stubbed_attrs.unshift([obj, attr, orig]);
    obj[attr] = value;
  };

  /**
   * Return the given attribute of the object to its previous value.
   * @param obj The object with the set stub.
   * @param attr The attribute name to reset.
   * @throws {Error} Raised if the given attribute is not stubbed on the given object.
   */
  StubsManager.prototype.UnSet = function(obj, attr) {
    for (var i=0; i<this.stubbed_attrs.length; i++) {
      var stub = this.stubbed_attrs[i];
      if (obj === stub[0] && attr === stub[1]) {
        obj[attr] = stub[2];
        this.stubbed_attrs.splice(i, 1);
        return;
      }
    }
    throw new Error('Object does not have stubbed property "' + attr + '"');
  };

  /**
   * Return all stubbed attributes to their previous values.
   */
  StubsManager.prototype.UnSetAll = function() {
    while (this.stubbed_attrs.length > 0) {
      var stub = this.stubbed_attrs.shift();
      var obj = stub[0];
      var attr = stub[1];
      var orig = stub[2];
      obj[attr] = orig;
    }
  };
}
