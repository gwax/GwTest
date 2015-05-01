function run_Stubs_test() {
  new StubsManagerTest().runTests();
}

// Tests for GwTest.StubsManager
function StubsManagerTest() {
  GwTest.TestCase.call(this);
}
StubsManagerTest.prototype = Object.create(GwTest.TestCase.prototype);
StubsManagerTest.prototype.constructor = StubsManagerTest;

StubsManagerTest.prototype.name = 'StubsManagerTest';

StubsManagerTest.prototype.testSet_Invalid = function() {
  // Setup
  var stubs = new GwTest.StubsManager();
  var obj = {};
  // Execute
  this.assertRaises(function() {
    stubs.Set(obj, 'foo', 3);
  }, Error('Object has no property "foo"'));
};

StubsManagerTest.prototype.testUnSet_Invalid = function() {
  // Setup
  var stubs = new GwTest.StubsManager();
  var obj = {};
  // Execute
  this.assertRaises(function() {
    stubs.UnSet(obj, 'foo');
  }, Error('Object does not have stubbed property "foo"'));
};

StubsManagerTest.prototype.testSet_Success = function() {
  // Setup
  var stubs = new GwTest.StubsManager();
  var obj = {'a': 1};
  // Execute
  stubs.Set(obj, 'a', 2);
  // Verify
  this.assertEquals(2, obj.a);
};

StubsManagerTest.prototype.testUnSet_Success = function() {
  // Setup
  var stubs = new GwTest.StubsManager();
  var obj = {'a': 1};
  stubs.Set(obj, 'a', 2);
  // Execute
  stubs.UnSet(obj, 'a');
  // Verify
  this.assertEquals(1, obj.a);
};

StubsManagerTest.prototype.testUnsetOrdering = function() {
  // Setup
  var stubs = new GwTest.StubsManager();
  var obj = {'a': 1};
  stubs.Set(obj, 'a', 2);
  stubs.Set(obj, 'a', 3);
  stubs.Set(obj, 'a', 4);
  // Execute and Verify
  this.assertEquals(4, obj.a);
  stubs.UnSet(obj, 'a');
  this.assertEquals(3, obj.a);
  stubs.UnSet(obj, 'a');
  this.assertEquals(2, obj.a);
  stubs.UnSet(obj, 'a');
  this.assertEquals(1, obj.a);
};

StubsManagerTest.prototype.testUnSetAll_Success = function() {
  // Setup
  var stubs = new GwTest.StubsManager();
  var obj1 = {'a': 1, 'b': 2};
  var obj2 = {'c': 3};
  stubs.Set(obj1, 'a', 5);
  stubs.Set(obj2, 'c', 4);
  // Execute
  stubs.UnSetAll();
  // Verify
  this.assertEquals(1, obj1.a);
  this.assertEquals(3, obj2.c);
};

StubsManagerTest.prototype.testAllWithObjects = function() {
  // Setup
  function TestObject() {
    this.val = 3;
    this.val2 = 4;
  }
  TestObject.prototype = {};
  TestObject.prototype.getVal = function() { return this.val; };
  var obj1 = new TestObject();
  var obj2 = new TestObject();
  var stubs = new GwTest.StubsManager();
  // Execute and verify
  stubs.Set(obj1, 'val', 5);
  stubs.Set(obj2, 'val', 6);
  this.assertEquals(5, obj1.getVal());
  this.assertEquals(6, obj2.getVal());
  stubs.UnSet(obj1, 'val');
  this.assertEquals(3, obj1.getVal());
  this.assertEquals(6, obj2.getVal());
  stubs.Set(TestObject.prototype, 'getVal', function() { return this.val2; });
  this.assertEquals(4, obj1.getVal());
  this.assertEquals(4, obj2.getVal());
  stubs.UnSetAll();
  this.assertEquals(3, obj1.getVal());
  this.assertEquals(3, obj2.getVal());
};
