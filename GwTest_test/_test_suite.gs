function SuiteRunner() {
  var testcases = [
    ObjectsEqualTest,
    StubsManagerTest,
    AssertionErrorTest,
    AssertionManagerTest,
    TestCaseTest,
    FileTestCaseTest,
    SpreadsheetTestCaseTest
  ];

  var testcases_run = 0;
  var testcases_passing = 0;
  for (var i=0; i<testcases.length; i++) {
    var testcase = testcases[i];
    var testinstance = new testcase();
    var failures = testinstance.runTests();
    testcases_run++;
    if (failures.length === 0) testcases_passing++;
  }

  if (testcases_run > testcases_passing) {
    Logger.log('TEST SUITE: %s / %s TEST CASES FULLY PASSED', testcases_passing.toString(), testcases_run.toString());
    return false;
  } else {
    Logger.log('TEST SUITE: ALL TEST CASES FULLY PASSED');
    return true;
  }
}
