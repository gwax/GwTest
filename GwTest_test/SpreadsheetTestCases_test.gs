function run_SpreadsheetTestCases_test() {
  new SpreadsheetTestCaseTest().runTests();
}

// Tests for SpreadsheetTest.SpreadsheetTestCase
function SpreadsheetTestCaseTest() {
  GwTest.SpreadsheetTestCase.call(this, 5, 4);
}
SpreadsheetTestCaseTest.prototype = Object.create(GwTest.SpreadsheetTestCase.prototype);
SpreadsheetTestCaseTest.prototype.constructor = SpreadsheetTestCaseTest;

SpreadsheetTestCaseTest.prototype.name = 'SpreadsheetTestCaseTest';

SpreadsheetTestCaseTest.prototype.testSetSheetSize = function() {
  this.SetSheetSize(this.sheet, 9, 8);
  
  this.assertEquals(9, this.sheet.getMaxRows());
  this.assertEquals(8, this.sheet.getMaxColumns());
  
  this.SetSheetSize(this.sheet, 3, 2);
  
  this.assertEquals(3, this.sheet.getMaxRows());
  this.assertEquals(2, this.sheet.getMaxColumns());
  
  this.SetSheetSize(this.sheet, 3, 2);
  
  this.assertEquals(3, this.sheet.getMaxRows());
  this.assertEquals(2, this.sheet.getMaxColumns());
}

// We run each test below twice so as to check initial conditions are restored afterward
SpreadsheetTestCaseTest.prototype.AssertInitialConditions = function() {
  this.assertEquals(1, this.spreadsheet.getSheets().length);
  this.assertEquals('Sheet1', this.sheet.getSheetName());
  this.assertEquals(5, this.sheet.getMaxRows());
  this.assertEquals(4, this.sheet.getMaxColumns());
  this.assertTrue(this.sheet.getDataRange().isBlank());
}

SpreadsheetTestCaseTest.prototype.testIncreaseSheetSize_1 = function() {
  this.AssertInitialConditions();
  
  this.sheet.insertRowsAfter(5, 1);
  this.sheet.insertColumnsAfter(4, 1);
  
  this.assertEquals(6, this.sheet.getMaxRows());
  this.assertEquals(5, this.sheet.getMaxColumns());
}

SpreadsheetTestCaseTest.prototype.testIncreaseSheetSize_2 = function() {
  this.AssertInitialConditions();
  
  this.sheet.insertRowsAfter(5, 1);
  this.sheet.insertColumnsAfter(4, 1);
  
  this.assertEquals(6, this.sheet.getMaxRows());
  this.assertEquals(5, this.sheet.getMaxColumns());
}

SpreadsheetTestCaseTest.prototype.testDecreaseSheetSize_1 = function() {
  this.AssertInitialConditions();
  
  this.sheet.deleteRow(5);
  this.sheet.deleteColumn(4);
  
  this.assertEquals(4, this.sheet.getMaxRows());
  this.assertEquals(3, this.sheet.getMaxColumns());
}

SpreadsheetTestCaseTest.prototype.testDecreaseSheetSize_2 = function() {
  this.AssertInitialConditions();
  
  this.sheet.deleteRow(5);
  this.sheet.deleteColumn(4);
  
  this.assertEquals(4, this.sheet.getMaxRows());
  this.assertEquals(3, this.sheet.getMaxColumns());
}

SpreadsheetTestCaseTest.prototype.testRenameSheet_1 = function() {
  this.AssertInitialConditions();
  
  this.sheet.setName('new sheet name');
  
  this.assertEquals('new sheet name', this.sheet.getSheetName());
}

SpreadsheetTestCaseTest.prototype.testRenameSheet_2 = function() {
  this.AssertInitialConditions();
  
  this.sheet.setName('new sheet name');
  
  this.assertEquals('new sheet name', this.sheet.getSheetName());
}

SpreadsheetTestCaseTest.prototype.testAddSheets_1 = function() {
  this.AssertInitialConditions();
  
  this.spreadsheet.insertSheet('after sheet', 2);
  this.spreadsheet.insertSheet('before sheet', 0);
  
  this.assertEquals(3, this.spreadsheet.getSheets().length);
}

SpreadsheetTestCaseTest.prototype.testAddSheets_2 = function() {
  this.AssertInitialConditions();
  
  this.spreadsheet.insertSheet('after sheet', 2);
  this.spreadsheet.insertSheet('before sheet', 0);
  
  this.assertEquals(3, this.spreadsheet.getSheets().length);
}

SpreadsheetTestCaseTest.prototype.testChangeValues_1 = function() {
  this.AssertInitialConditions();
  
  var range = this.sheet.getRange(1, 1, 3, 3);
  var values = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  range.setValues(values);
  
  this.assertEquals(5, this.sheet.getRange(2, 2).getValue());
}

SpreadsheetTestCaseTest.prototype.testChangeValues_2 = function() {
  this.AssertInitialConditions();
  
  var range = this.sheet.getRange(1, 1, 3, 3);
  var values = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  range.setValues(values);
  
  this.assertEquals(5, this.sheet.getRange(2, 2).getValue());
}
