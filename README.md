# GwTest
A unit testing framework for Google Apps Script, loosely based on python unittest.

# Google Drive
GwTest is also available to be accessed directly on Google Drive:

* [GwTest](https://script.google.com/d/1_HM9-h-a94XlfDTnDhzWb1oiQlFs3ZTpNVZ0p_DS0KbDaJ356tQo8KPG/edit?usp=sharing)
* [GwTest_test](https://script.google.com/d/1JuCorrkKzo-vrozrzh8kG1ANpAphS85Yz3_nfC27bC0I7o_x_e41mskx/edit?usp=sharing)

## Usage
GwTest is used to test itself; the suite available in GwTest_test provides some examples of how to use the testing framework.

The best way to make use of GwTest is to use it add it to your project via Resource > Libraries with the project key: M1PpVYsD2R68uNDajUcXNca_fO5HBBZ0R

## OAuth Scopes
GwTest needs certain OAuth security permissions to be run:

* drive: FileTestCase needs to be able to create (and delete) files in Google Drive in order to provide temporary files for use in tests.
* spreadsheets: SpreadsheetTestCase needs to be able to create, delete, and manipulate spreadsheets on Google Drive in order to provide a temporary spreadsheet for use in tests.
