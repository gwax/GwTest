function load_Util() {
  load_ObjectsEqual();
}

/**
 * Should ObjectsEqual perform verbose logging.
 * @type {boolean}
 * @constant
 */
var VERBOSE_OBJECTS_EQUAL = false;

var ObjectsEqual;
function load_ObjectsEqual() {
  /**
   * Check value based equality of two objects.
   * @param a The first object.
   * @param b The second object.
   * @returns {boolean} Whether the objects a, and b have equal values.
   */
  ObjectsEqual = function(a, b) {
    if (a === null || b === null) {
      if (VERBOSE_OBJECTS_EQUAL) Logger.log('Null comparison of %s === %s', a, b);
      return a === b;
    }
    
    if (typeof a == 'undefined' || typeof b == 'undefined') {
      if (VERBOSE_OBJECTS_EQUAL) Logger.log('Undefined comparison of typeof %s == typeof %s', a, b);
      return typeof a == typeof b;
    }
    
    if (typeof a != 'object' || typeof b != 'object') {
      if (VERBOSE_OBJECTS_EQUAL) Logger.log('Nonobject comparison of (%s)%s === (%s)%s', typeof a, a, typeof b, b);
      return a === b;
    }
    
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length != b.length) {
        if (VERBOSE_OBJECTS_EQUAL) Logger.log('Length mismatch of (%s).length == (%s).length', a, b);
        return false;
      }
      for (var i=0; i < a.length; i++) {
        if (!ObjectsEqual(a[i], b[i]))
          return false;
      }
      return true;
    }
    
    if (Object.getPrototypeOf(a) === Object.getPrototypeOf(b)) {
      if (a === b) return true;
      if (!ObjectsEqual(Object.keys(a), Object.keys(b)))
        return false;
      for (var key in a) {
        if (!ObjectsEqual(a[key], b[key]))
          return false;
      }
      return true;
    }  
    
    return false;
  }
}
