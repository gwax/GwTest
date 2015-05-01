function load_Assertions() {
  load_AssertionError();
  load_AssertionManager();
}

var AssertionError;
function load_AssertionError() {
  /**
   * Wrapper used to construct an Error message for use by AssertionManager.
   * @param {string} [name='AssertionError'] The name of the error being created.
   * @param {string} [message=''] The message for the error.
   */
  AssertionError = function(name, message) {
    name = name || 'AssertionError';
    message = message || '';
    var inner = Error(message);
    inner.name = name;
    return inner;
  };
}

var AssertionManager;
function load_AssertionManager() {
  /**
   * Class for storing and throwing assertions
   * @constructor
   */
  AssertionManager = function() {};
  AssertionManager.prototype = {};

  /**
   * Assert that a value is true.
   * @param value The value to check for truth.
   * @param {string} [message='false'] The message to use in the error if the value is false.
   * @throws {Error}
   */
  AssertionManager.prototype.assertTrue = function(value, message) {
    var test = value;
    if (!test) throw new AssertionError('AssertTrue', message || 'false');
  };

  /**
   * Assert that a value is false.
   * @param value The value to check for falsehood.
   * @param {string} [message='false'] The message to use in the error if the value is true.
   * @throws {Error}
   */
  AssertionManager.prototype.assertFalse = function(value, message) {
    var test = !value;
    if (!test) throw new AssertionError('AssertFalse', message || 'true');
  };

  /**
   * Assert that two objects are equal using Util.ObjectsEqual
   * @param a The first object.
   * @param b The second object.
   * @param {string} [message=(a + ', ' + b)] The message to use in the error if the objects differ.
   * @throws {Error}
   */
  AssertionManager.prototype.assertEquals = function(a, b, message) {
    var test = ObjectsEqual(a, b);
    if (!test) throw new AssertionError('AssertEquals', message || (a + ', ' + b));
  };

  /**
   * Assert that two objects are not equal using Util.ObjectsEqual
   * @param a The first object.
   * @param b The second object.
   * @param {string} [message=(a + ', ' + b)] The message to use in the error if the objects are equal.
   * @throws {Error}
   */
  AssertionManager.prototype.assertNotEquals = function(a, b, message) {
    var test = !ObjectsEqual(a, b);
    if (!test) throw new AssertionError('AssertNotEquals', message || (a + ', ' + b));
  };

  /**
   * Assert that the first object is greater than the second.
   * @param a The first object.
   * @param b The second object.
   * @param {string} [message=(a + ' > ' + b)] The message to use in the error if the first object is not greater than the second.
   * @throws {Error}
   */
  AssertionManager.prototype.assertGreater = function(a, b, message) {
    var test = a > b;
    if (!test) throw new AssertionError('AssertGreater', message || (a + ' > ' + b));
  };

  /**
   * Assert that the first object is less than the second.
   * @param a The first object.
   * @param b The second object.
   * @param {string} [message=(a + ' < ' + b)] The message to use in the error if the first object is not less than the second.
   * @throws {Error}
   */
  AssertionManager.prototype.assertLess = function(a, b, message) {
    var test = a < b;
    if (!test) throw new AssertionError('AssertLess', message || (a + ' < ' + b));
  };

  /**
   * Assert that an object is an instance of a class.
   * @param obj The object.
   * @param kls The class.
   * @param {string} [message=(obj + ' instanceOf ' + kls)] The message to use in the error if obj is not an instance of kls.
   * @throws {Error}
   */
  AssertionManager.prototype.assertInstanceOf = function(obj, kls, message) {
    var test = obj instanceof kls;
    if (!test) throw new AssertionError('AssertInstanceOf', message || (obj + ' instanceof ' + kls));
  };

  /**
   * Assert that a closure raises a given error when executed.
   * @param {Function} closure The block of code to execute.
   * @param {Error} err The error to check against. Check is based on err.name and, if err.message if err.message != ''.
   * @param {string} [message=err] The message to use if the error is not raised. Note, if a non-matching error is raised, it will be rethrown.
   * @throws {Error}
   */
  AssertionManager.prototype.assertRaises = function(closure, err, message) {
    var test = false;
    try {
      closure.call(this);
    } catch(e) {
      if (err.name == e.name && (err.message === '' || err.message == e.message)) {
        test = true;
      } else {
        throw e;
      }
    }
    if (!test) throw new AssertionError('AssertRaises', message || err);
  };
}
