function load_TestCases() {
  load_TestCase();
}

var TestCase;
function load_TestCase() {
  /**
   * Base class for building unit tests.
   * @constructor
   * @extends {AssertionManager}
   */
  TestCase = function() {
    AssertionManager.call(this);
  };
  TestCase.prototype = Object.create(AssertionManager.prototype);
  TestCase.prototype.constructor = TestCase;

  /**
   * The TestCase's name
   * @constant
   */
  TestCase.prototype.name = 'TestCase';

  /**
   * Code to be run before performing all tests.
   */
  TestCase.prototype.setUpClass = function() {};
  /**
   * Code to be run after performing all tests.
   */
  TestCase.prototype.tearDownClass = function () {};
  /**
   * Code to be run before performing each test.
   */
  TestCase.prototype.setUp = function() {};
  /**
   * Code to be run after performing each test.
   */
  TestCase.prototype.tearDown = function() {};

  /**
   * Get the list of all methods in this object that start with 'test'.
   * @returns {string[]} List of all test method names.
   */
  TestCase.prototype.getAllTestNames = function() {
    var test_functions = [];
    var obj = this;
    do {
      var properties = Object.getOwnPropertyNames(obj);
      for (var i=0; i < properties.length; i++) {
        var name = properties[i];
        if (name.slice(0, 4) != 'test') continue;
        test_functions.push(name);
      }
      obj = Object.getPrototypeOf(obj);
    } while (obj !== null);
    return test_functions;
  };

  /**
   * Run the test with a given name, logging success or failure to Logger.
   * @param {string} testname The name of the test method to run.
   * @returns {boolean} If the test passed.
   */
  TestCase.prototype.runTestMethod = function(testname) {
    var test_label = this.name + '.' + testname;
    try {
      this[testname]();
      Logger.log('%s: PASSED', test_label);
      return true;
    } catch(err) {
      Logger.log('%s: ERROR: %s(%s)%s', test_label, err.name, err.message, err.stack);
      return false;
    }
  };

  /**
   * Run tests for the test case, logging success or failure to the Logger.
   * @param {string|string[]} [testnames] The name(s) of specific tests to run; if not specified, all tests will be run.
   * @returns {string[]} The list of testnames that failed, empty list if passing.
   */
  TestCase.prototype.runTests = function(testnames) {
    if (typeof testnames != 'undefined') {
      if (!Array.isArray(testnames)) testnames = [testnames];
    } else {
      testnames = this.getAllTestNames();
    }

    var failing = [];

    this.setUpClass();
    for(var i=0; i < testnames.length; i++) {
      this.setUp();

      var testname = testnames[i];
      var passed = this.runTestMethod(testname);
      if (!passed) failing.push(testname);

      this.tearDown();
    }
    this.tearDownClass();

    if (failing.length === 0) {
      Logger.log('%s: ALL TESTS PASSED', this.name);
    } else {
      var tests_run = testnames.length;
      var tests_passing = testnames.length - failing.length;
      Logger.log('%s: %s / %s PASSING', this.name, tests_passing.toString(), tests_run.toString());
    }
    return failing;
  };
}
