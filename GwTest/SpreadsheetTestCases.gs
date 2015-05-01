function load_SpreadsheetTestCases() {
  load_SpreadsheetTestCase();
}

var SpreadsheetTestCase;
function load_SpreadsheetTestCase() {
  /**
  * Base class for building unit tests that need access to a spreadsheet.
  * @constructor
  * @extends {FilesTestCase}
  * @param {number} [rows=10] The initial number of rows in the spreadsheet.
  * @param {number} [columns=10] The initial number of columns in the spreadsheet.
  */
  SpreadsheetTestCase = function(rows, columns) {
    FileTestCase.call(this);
    this.rows = rows || 10;
    this.columns = columns || 10;
    this.spreadsheet = null;
    this.sheet = null;
  };
  SpreadsheetTestCase.prototype = Object.create(FileTestCase.prototype);
  SpreadsheetTestCase.prototype.constructor = SpreadsheetTestCase;

  /**
  * The TestCase's name
  * @constant
  * @override
  */
  SpreadsheetTestCase.prototype.name = 'SpreadsheetTestCase';

  /**
  * Before all tests, create a spreadsheet and set the associated file for cleanup later.
  * @override
  */
  SpreadsheetTestCase.prototype.setUpClass = function() {
    FileTestCase.prototype.setUpClass.call(this);
    var sheetname = this.GetTestFilename();
    this.spreadsheet = SpreadsheetApp.create(sheetname, this.rows, this.columns);
    this.sheet = this.spreadsheet.getSheets()[0];
    var file = DriveApp.getFileById(this.spreadsheet.getId());
    this.AddFile(file);
  };

  /**
  * After all tests have finished, null out the spreadsheet.
  * @override
  */
  SpreadsheetTestCase.prototype.tearDownClass = function() {
    this.sheet = null;
    this.spreadsheet = null;
    FileTestCase.prototype.tearDownClass.call(this);
  };

  /**
  * Before each test, set the sheet variable and active sheet to the first sheet.
  * @override
  */
  SpreadsheetTestCase.prototype.setUp = function() {
    FileTestCase.prototype.setUp.call(this);
    this.sheet = this.spreadsheet.getSheets()[0];
    this.spreadsheet.setActiveSheet(this.sheet);
  };

  /**
  * After each test, reset the spreadsheet's state to its initial conditions.
  * @override
  */
  SpreadsheetTestCase.prototype.tearDown = function() {
    var all_sheets = this.spreadsheet.getSheets();
    for (var i=1; i < all_sheets.length; i++) {
      this.spreadsheet.deleteSheet(all_sheets[i]);
    }
    this.sheet = all_sheets[0];
    this.sheet.clear();
    this.sheet.setName('Sheet1');
    this.SetSheetSize(this.sheet, this.rows, this.columns);
    FileTestCase.prototype.tearDown.call(this);
  };

  /**
  * Resize a given sheet to the specified size; deleting or addings rows/columns as necessary.
  * @param {Sheet} sheet The sheet to resize.
  * @param {number} rows The desired number of rows.
  * @param {number} columns The desired number of columns.
  * @returns {Sheet} The input sheet, for chaining.
  */
  SpreadsheetTestCase.prototype.SetSheetSize = function(sheet, rows, columns) {
    var max_rows = sheet.getMaxRows();
    if (max_rows > rows) {
      sheet.deleteRows(rows + 1, max_rows - rows);
    } else if (max_rows < rows) {
      sheet.insertRowsAfter(max_rows, rows - max_rows);
    }

    var max_columns = sheet.getMaxColumns();
    if (max_columns > columns) {
      sheet.deleteColumns(columns + 1, max_columns - columns);
    } else if (max_columns < columns) {
      sheet.insertColumnsAfter(max_columns, columns - max_columns);
    }
    return sheet;
  };
}
