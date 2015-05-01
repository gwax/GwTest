function load_FileTestCases() {
  load_FileTestCase();
}

var FileTestCase;
function load_FileTestCase() {
  /**
  * Base class for building unit tests that require accessing files in Drive.
  * @constructor
  * extends {TestCase}
  */
  FileTestCase = function() {
    TestCase.call(this);
    this.created_files = [];
  };
  FileTestCase.prototype = Object.create(TestCase.prototype);
  FileTestCase.prototype.constructor = FileTestCase;

  /**
  * The TestCase's name
  * @constant
  * @override
  */
  FileTestCase.prototype.name = 'FileTestCase';

  /**
  * After all tests have finished, delete all created files.
  * @override
  */
  FileTestCase.prototype.tearDownClass = function() {
    while (this.created_files.length > 0) {
      var file = this.created_files.pop();
      file.setTrashed(true);
    }
    TestCase.prototype.tearDownClass.call(this);
  };

  /**
  * Get a random filename that does not match any files currently in a user's Drive.
  * @param {string} [extension] A file extension to be appended to the filename (excluding '.').
  * @returns {string} A filename that does not match an existing file's filename.
  */
  FileTestCase.prototype.GetTestFilename = function(extension) {
    var filename;
    var fileiterator;
    do {
      filename = Math.random().toString(36).slice(2);
      if (typeof extension != 'undefined') {
        filename = filename + '.' + extension;
      }
      fileiterator = DriveApp.getFilesByName(filename);
    } while (fileiterator.hasNext());
    return filename;
  };

  /**
  * Add a file to the test's files. This is useful if you create a file separately that you need to be cleaned up later.
  * @param {File} file The file to cleanup during tearDownClass.
  */
  FileTestCase.prototype.AddFile = function(file) {
    this.created_files.push(file);
  };

  /**
  * Create a new file and add it to the test's files for cleanup later.
  * @param {...*} [var_args] Arguments to be passed to DriveApp.createFile for file creation.
  * @returns {File} The newly created file.
  */
  FileTestCase.prototype.CreateFile = function(var_args) {
    var new_file = DriveApp.createFile.apply(DriveApp, arguments);
    this.created_files.push(new_file);
    return new_file;
  };
}
