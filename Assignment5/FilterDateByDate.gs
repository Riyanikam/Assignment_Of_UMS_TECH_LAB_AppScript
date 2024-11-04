// This function is for creating a custom menu in Spreadsheet
function onOpen() {
  var ui=SpreadsheetApp.getUi();
  ui.createMenu("UserMenu")
    .addItem('Add User Data','openForm').addItem('Generate Report','openReportForm')
}

function openForm(){
  var htmlOutput=HtmlService.createHtmlOutputFromFile('UserForm')
    .setWidth(400)
    .setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Enter Details');
}

function processForm(formData) {
  Logger.log(formData);
  if(formData && formData.name && formData.email && formData.date) {
    var sheet=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([formData.name, formData.email, formData.date]);

    SpreadsheetApp.getUi().alert('Form submitted successfully!');
  } else {
    SpreadsheetApp.getUi().alert('Error: Name, Email, or Date not provided.');
  }
}

function openReportForm() {
  var htmlOutput=HtmlService.createHtmlOutputFromFile('UserForm')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Filter Report by Date');
}

function filterDataByDate(formData) {
  var startDate=new Date(formData.startDate);
  var endDate=new Date(formData.endDate);

  var sheet=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data=sheet.getDataRange().getValues();

  var reportSheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Report');
  if (!reportSheet){
    reportSheet=SpreadsheetApp.getActiveSpreadsheet().insertSheet('Report');
  } else {
    reportSheet.clear();
  }
  reportSheet.appendRow(['Name', 'Email', 'Date']);

  for (var i=1;i<data.length;i++) {
    var recordDate=new Date(data[i][2]);
    if (recordDate>=startDate && recordDate<=endDate) {
      reportSheet.appendRow([data[i][0],data[i][1],data[i][2]]);
    }
  }
  SpreadsheetApp.getUi().alert('Report generated successfully!');
}
