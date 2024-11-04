// Here is a function to create a custom menu in the spreadsheet
function onOpen(){
  var ui=SpreadsheetApp.getUi(); 
  ui.createMenu('Email Menu') 
    .addItem('Send Mail','sendEmailsFromSheet').addToUi(); 
}

function sendEmailsFromSheetDetails(){
  var sheet=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data=sheet.getDataRange().getValues();
  
  
  for(var i=1;i<data.length;i++){
    var recipient=data[i][0]; 
    var cc=data[i][1]; 
    var bcc=data[i][2]; 
    var subject=data[i][3]; 
    var body=data[i][4]; 
    var status=data[i][5];
    
    if(status===''){
      MailApp.sendEmail({to:recipient,subject:subject,body:body,cc:cc,bcc:bcc});
      
      sheet.getRange(i+1,6).setValue('Mail Sent');
      
      //SpreadsheetApp.getUi().alert('Email sent to'+recipient);
    }
  }
}
