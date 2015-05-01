function run_Util_test() {
  new ObjectsEqualTest().runTests();
}

// Tests for GwTest.ObjectsEqual
function ObjectsEqualTest() {
  GwTest.TestCase.call(this);
}
ObjectsEqualTest.prototype = Object.create(GwTest.TestCase.prototype);
ObjectsEqualTest.prototype.constructor = ObjectsEqualTest;

ObjectsEqualTest.prototype.name = 'ObjectsEqualTest';

ObjectsEqualTest.prototype.ObjectsEqualMessage = function(a, b) {
  return 'GwTest.ObjectsEqual(' + a + ', ' + b + ')';
};

ObjectsEqualTest.prototype.testNonObject = function() {
  // Test numbers
  this.assertTrue(
    GwTest.ObjectsEqual(1, 1),
    this.ObjectsEqualMessage('1', '1'));

  this.assertTrue(
    GwTest.ObjectsEqual(1.0, 1.0),
    this.ObjectsEqualMessage('1.0', '1.0'));

  this.assertFalse(
    GwTest.ObjectsEqual(1, 2),
    this.ObjectsEqualMessage('1', '2'));

  this.assertFalse(
    GwTest.ObjectsEqual(1.0, 2.0),
    this.ObjectsEqualMessage('1.0', '2.0'));

  // Test strings
  this.assertTrue(
    GwTest.ObjectsEqual('a', 'a'),
    this.ObjectsEqualMessage('a', 'a'));

  this.assertTrue(
    GwTest.ObjectsEqual('abcdef', 'abcdef'),
    this.ObjectsEqualMessage('abcdef', 'abcdef'));

  this.assertFalse(
    GwTest.ObjectsEqual('a', 'b'),
    this.ObjectsEqualMessage('a', 'b'));

  this.assertFalse(
    GwTest.ObjectsEqual('abcdef', 'abcdefg'),
    this.ObjectsEqualMessage('abcdef', 'abcdefg'));

  // Test other things
  this.assertTrue(
    GwTest.ObjectsEqual(null, null),
    this.ObjectsEqualMessage('null', 'null'));

  this.assertTrue(
    GwTest.ObjectsEqual(undefined, undefined),
    this.ObjectsEqualMessage('undefined', 'undefined'));

  this.assertFalse(
    GwTest.ObjectsEqual(true, false),
    this.ObjectsEqualMessage('true', 'false'));
};

ObjectsEqualTest.prototype.testArrays = function() {
  this.assertTrue(
    GwTest.ObjectsEqual([], []),
    this.ObjectsEqualMessage('[]', '[]'));

  this.assertTrue(
    GwTest.ObjectsEqual([1], [1]),
    this.ObjectsEqualMessage('[1]', '[1]'));

  this.assertTrue(
    GwTest.ObjectsEqual([1, 'a', 2, 'b', 3], [1, 'a', 2, 'b', 3]),
    this.ObjectsEqualMessage("[1, 'a', 2, 'b', 3]", "[1, 'a', 2, 'b', 3]"));

  this.assertFalse(
    GwTest.ObjectsEqual([], {}),
    this.ObjectsEqualMessage('[]', '{}'));

  this.assertFalse(
    GwTest.ObjectsEqual([1], []),
    this.ObjectsEqualMessage('[1]', '[]'));

  this.assertFalse(
    GwTest.ObjectsEqual([1, 2, 3, 4], [1, 2, 3, 4, 5]),
    this.ObjectsEqualMessage('[1, 2, 3, 4]', '[1, 2, 3, 4, 5]'));

  this.assertFalse(
    GwTest.ObjectsEqual([1, 2, 3], [1, 2, 4]),
    this.ObjectsEqualMessage('[1, 2, 3]', '[1, 2, 4]'));
};

ObjectsEqualTest.prototype.testAssociativeArrays = function() {
  this.assertTrue(
    GwTest.ObjectsEqual({}, {}),
    this.ObjectsEqualMessage('{}', '{}'));

  this.assertTrue(
    GwTest.ObjectsEqual({'a': 1, 'b': 'c'}, {'a': 1, 'b': 'c'}),
    this.ObjectsEqualMessage("{'a': 1, 'b': 'c'}", "{'a': 1, 'b': 'c'}"));

  this.assertFalse(
    GwTest.ObjectsEqual({'a': 1, 'b': 2}, {'a': 1}),
    this.ObjectsEqualMessage("{'a': 1, 'b': 2}", "{'a': 1}"));

  this.assertFalse(
    GwTest.ObjectsEqual({'a': 1, 'b': 2}, {'a': 1, 'b': 3}),
    this.ObjectsEqualMessage("{'a': 1, 'b': 2}", "{'a': 1, 'b': 3}"));

  this.assertFalse(
    GwTest.ObjectsEqual({'a': 1, 'b': 2}, {'a': 1, 'c': 2}),
    this.ObjectsEqualMessage("{'a': 1, 'b': 2}", "{'a': 1, 'b': 3}"));
};

ObjectsEqualTest.prototype.testNestedObjects = function() {
  this.assertTrue(
    GwTest.ObjectsEqual([[{}]], [[{}]]),
    this.ObjectsEqualMessage('[[{}]]', '[[{}]]'));

  this.assertTrue(
    GwTest.ObjectsEqual(
      [1, 2, [3, 4, []], {'a': 1, 'b': [2, 3, [], {}]}],
      [1, 2, [3, 4, []], {'a': 1, 'b': [2, 3, [], {}]}]),
    this.ObjectsEqualMessage(
      "[1, 2, [3, 4, []], {'a': 1, 'b': [2, 3, [], {}]}]",
      "[1, 2, [3, 4, []], {'a': 1, 'b': [2, 3, [], {}]}]"));

  this.assertFalse(
    GwTest.ObjectsEqual([[[]]], [[]]),
    this.ObjectsEqualMessage('[[[]]]', '[[]]'));

  this.assertFalse(
    GwTest.ObjectsEqual(
      [1, 2, 3, 4, 5, [6, 7, [8, {9: 10}]]],
      [1, 2, 3, 4, 5, [6, 7, [8, {9: 11}]]]),
    this.ObjectsEqualMessage(
      '[1, 2, 3, 4, 5, [6, 7, [8, {9: 10}]]]',
      '[1, 2, 3, 4, 5, [6, 7, [8, {9: 11}]]]'));
};
