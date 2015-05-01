function run_FileTestCases_test() {
  new FileTestCaseTest().runTests();
}

// Tests for FilesTest.FilesTestCase
function FileTestCaseTest() {
  GwTest.FileTestCase.call(this);
}
FileTestCaseTest.prototype = Object.create(GwTest.FileTestCase.prototype);
FileTestCaseTest.prototype.constructor = FileTestCaseTest;

FileTestCaseTest.prototype.name = 'FileTestCaseTest';

FileTestCaseTest.prototype.testCreateFile = function() {
  this.assertEquals([], this.created_files);
  
  var filename = this.GetTestFilename('.txt');
  var file = this.CreateFile(filename, 'test content');
  
  this.assertEquals([file], this.created_files);
  this.assertEquals('test content', file.getBlob().getDataAsString());
}
