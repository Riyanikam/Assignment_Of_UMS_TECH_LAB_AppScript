function dataCopyFromSheet(){
  let SourceSpreadSheet=SpreadsheetApp.openById('1fwgCkS8-W1SHL30YSrnkAug52dBKJzV-VFh9f92TjSg');//This is Sourcesheetid
  let SourceS=SourceSpreadSheet.getSheetByName('SourceS');//This is  a Sourcesheet name

  let SourceRange=SourceS.getDataRange();
  let SourceValues=SourceRange.getValues();

  let rowCount=SourceValues.length;
  let columnCount=SourceValues[0].length;

  let DestinationSpreadSheet=SpreadsheetApp.openById('1nVTOpIt6tYUtiWgwkY95gWy4-A656-729cv4nktG4U4');// This is a  Destinationsheetid
  let DestinationSheet=DestinationSpreadSheet.getSheetByName('DestinationS');//This is  Destinationsheet name

  let DestinationRange=DestinationSheet.getRange(1,1,rowCount,columnCount);
  DestinationRange.setValues(SourceValues); 

  Logger.log('Data copied from SourceSheet to DestinationSheet.');

  SourceS.clearContents();
}
//Here a trigger for the 1 minute
function createHoursTrigger(){
  ScriptApp.newTrigger('dataCopyFromSheet').timeBased().everyMinutes(1).create();
  Logger.log('The tigger is created');
}
