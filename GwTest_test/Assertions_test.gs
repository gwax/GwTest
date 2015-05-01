function run_AssertionErrorTest() {
  new AssertionErrorTest().runTests();
}
function run_AssertionManagerTest() {
  new AssertionManagerTest().runTests();
}

// Tests for GwTest.AssertionError
function AssertionErrorTest() {
  GwTest.TestCase.call(this);
}
AssertionErrorTest.prototype = Object.create(GwTest.TestCase.prototype);
AssertionErrorTest.prototype.constructor = AssertionErrorTest;

AssertionErrorTest.prototype.name = 'AssertionErrorTest';

AssertionErrorTest.prototype.testConstruct = function() {
  // Setup
  var name = 'Name';
  var message = 'some message';
  // Execute
  try {
    throw new GwTest.AssertionError(name, message);
  } catch(err) {
    // Verify
    this.assertEquals('Name', err.name);
    this.assertEquals('some message', err.message);
    this.assertNotEquals('undefined', typeof err.stack);
    this.assertNotEquals('null', typeof err.stack);
    this.assertNotEquals('', err.stack);
  }
};

AssertionErrorTest.prototype.testConstructNoMessage = function() {
  // Setup
  var name = 'Name';
  // Execute
  try {
    throw new GwTest.AssertionError(name);
  } catch(err) {
    // Verify
    this.assertEquals('Name', err.name);
    this.assertEquals('', err.message);
    this.assertNotEquals('undefined', typeof err.stack);
    this.assertNotEquals('null', typeof err.stack);
    this.assertNotEquals('', err.stack);
  }
};

AssertionErrorTest.prototype.testConstructNoArguments = function() {
  // Execute
  try {
    throw new GwTest.AssertionError();
  } catch(err) {
    // Verify
    this.assertEquals('AssertionError', err.name);
    this.assertEquals('', err.message);
    this.assertNotEquals('undefined', typeof err.stack);
    this.assertNotEquals('null', typeof err.stack);
    this.assertNotEquals('', err.stack);
  }
};

AssertionErrorTest.prototype.testInstanceOfError = function() {
  // Execute
  try {
    throw new GwTest.AssertionError();
  } catch(err) {
    // Verify
    this.assertInstanceOf(err, Error);
  }
};


// Tests for GwTest.AssertionManager
function AssertionManagerTest() {
  GwTest.TestCase.call(this);
}
AssertionManagerTest.prototype = Object.create(GwTest.TestCase.prototype);
AssertionManagerTest.prototype.constructor = AssertionManagerTest;

AssertionManagerTest.prototype.name = 'AssertionManagerTest';

AssertionManagerTest.prototype.testAssertTrue = function() {
  this.assertTrue(true);
};

AssertionManagerTest.prototype.testAssertTrue_Failure = function() {
  this.assertRaises(function() {
    this.assertTrue(false);
  }, GwTest.AssertionError('AssertTrue'));
};

AssertionManagerTest.prototype.testAssertFalse = function() {
  this.assertFalse(false);
};

AssertionManagerTest.prototype.testAssertFalse_Failure = function() {
  this.assertRaises(function() {
    this.assertFalse(true);
  }, GwTest.AssertionError('AssertFalse'));
};

AssertionManagerTest.prototype.testAssertEquals = function() {
  this.assertEquals([1, 2, 3], [1, 2, 3]);
};

AssertionManagerTest.prototype.testAssertEquals_Failure = function() {
  this.assertRaises(function() {
    this.assertEquals([1, 2, 3], [4, 5, 6]);
  }, GwTest.AssertionError('AssertEquals'));
};

AssertionManagerTest.prototype.testAssertNotEquals = function() {
  this.assertNotEquals([1, 2, 3], [4, 5, 6]);
};

AssertionManagerTest.prototype.testAssertNotEquals_Failure = function() {
  this.assertRaises(function() {
    this.assertNotEquals([1, 2, 3], [1, 2, 3]);
  }, GwTest.AssertionError('AssertNotEquals'));
};

AssertionManagerTest.prototype.testAssertGreater = function() {
  this.assertGreater(3, 2);
};

AssertionManagerTest.prototype.testAssertGreater_Failure = function() {
  this.assertRaises(function() {
    this.assertGreater(2, 3);
  }, GwTest.AssertionError('AssertGreater'));
};

AssertionManagerTest.prototype.testAssertLess = function() {
  this.assertLess(2, 3);
};

AssertionManagerTest.prototype.testAssertLess_Failure = function() {
  this.assertRaises(function() {
    this.assertLess(3, 2);
  }, GwTest.AssertionError('AssertLess'));
};

AssertionManagerTest.prototype.testAssertInstanceOf = function() {
  function Klass() {}
  Klass.prototype = {};

  var obj = new Klass();
  this.assertInstanceOf(obj, Klass);

  function Klass2() {}
  Klass2.prototype = Object.create(Klass.prototype);
  Klass2.prototype.constructor = Klass2;

  var obj2 = new Klass2();
  this.assertInstanceOf(obj2, Klass);
};

AssertionManagerTest.prototype.testAssertInstanceOf_Failure = function() {
  function Klass1() {}
  Klass1.prototype = {};
  function Klass2() {}
  Klass2.prototype = {};

  var obj = new Klass2();
  this.assertRaises(function() {
    this.assertInstanceOf(obj, Klass1);
  }, GwTest.AssertionError('AssertInstanceOf'));
};

AssertionManagerTest.prototype.testAssertRaises = function() {
  this.assertRaises(function() {
    throw new Error('error message');
  }, Error('error message'));
};

AssertionManagerTest.prototype.testAssertRaises_Failure = function() {
  // Test does not raise
  this.assertRaises(function() {
    this.assertRaises(function() {
    }, Error());
  }, GwTest.AssertionError('AssertRaises'));
  // Test don't catch wrong type
  this.assertRaises(function() {
    this.assertRaises(function() {
      this.assertTrue(false);
    }, GwTest.AssertionError('AssertFalse'));
  }, GwTest.AssertionError('AssertTrue'));
  // Test don't catch wrong message
  this.assertRaises(function() {
    this.assertRaises(function() {
      this.assertTrue(false, 'some message');
    }, GwTest.AssertionError('AssertTrue', 'another message'));
  }, GwTest.AssertionError('AssertTrue'));
};
