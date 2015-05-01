function run_TestCases_test() {
  new TestCaseTest().runTests();
}

// Tests for GwTest.TestCase
function TestCaseTest() {
  GwTest.TestCase.call(this);
}
TestCaseTest.prototype = Object.create(GwTest.TestCase.prototype);
TestCaseTest.prototype.constructor = TestCaseTest;

TestCaseTest.prototype.name = 'TestCaseTest';

TestCaseTest.prototype.setUpClass = function() {
  GwTest.TestCase.prototype.setUpClass.call(this);
  Logger.log('%s.setUpClass called in test', this.name);
};

TestCaseTest.prototype.tearDownClass = function() {
  Logger.log('%s.tearDownClass called in test', this.name);
  GwTest.TestCase.prototype.tearDownClass.call(this);
};

TestCaseTest.prototype.setUp = function() {
  GwTest.TestCase.prototype.setUp.call(this);
  Logger.log('%s.setUp called in test', this.name);
};

TestCaseTest.prototype.tearDown = function() {
  Logger.log('%s.tearDown called in test', this.name);
  GwTest.TestCase.prototype.tearDown.call(this);
};

TestCaseTest.prototype.testDoNothing = function() {};

TestCaseTest.prototype.testDoNothingAgain = function() {};
