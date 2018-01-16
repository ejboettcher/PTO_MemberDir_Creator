function send_directory(directory,master_S,master_ss,hdsendTF,hdemail,hdreceivername,subject,message,clouser){

  //Get URL for Spreadsheet to email

  var FileIterator = DriveApp.getFilesByName(directory);
  if (FileIterator.hasNext()){
     var file = FileIterator.next();
     var url     = SpreadsheetApp.open(file).getUrl();

  // Open Master Spreadsheet and get values
  var FileIterator = DriveApp.getFilesByName(master_S);
  if (FileIterator.hasNext()){
     var file = FileIterator.next();
     var OrgSS             = SpreadsheetApp.open(file);
     var ssmain            = OrgSS.getSheetByName(master_ss);

     //Get number of columns to scan over
    var lastColumn       = ssmain.getLastColumn();
    var lastRow          = ssmain.getLastRow();
    var headers          = ssmain.getRange(1,1,1,lastColumn).getValues();

    var emails, names, sendtf

    //Get Receiver_email
     var hdinx = headers[0].indexOf(hdemail)+1
     if (hdinx<0){
        Browser.msgBox('Header Names can not be found.  Check the Header Names before trying again.  No emails sent.', Browser.Buttons.OK_CANCEL);
     }else{
       var emails = ssmain.getRange(2,hdinx,lastRow-1,1).getValues();
     }
    // Receiver_Name
       hdinx = headers[0].indexOf(hdreceivername)+1
     if (hdinx<0){
        Browser.msgBox('Header Names can not be found.  Check the Header Names before trying again.  No emails sent.', Browser.Buttons.OK_CANCEL);
     }else{
       var names = ssmain.getRange(2,hdinx,lastRow-1,1).getValues();
     }

    // Receiver_sendTF
      hdinx = headers[0].indexOf(hdsendTF)+1
     if (hdinx<0){
        Browser.msgBox('Header SendTF can not be found.  Check the Header Names before trying again.  No emails sent.', Browser.Buttons.OK_CANCEL);
     }else{
      var sendTF = ssmain.getRange(2,hdinx,lastRow-1,1).getValues();
     }

    for (var ii=0; ii<lastRow-1; ii++){
      //Get receiver_name, receiver_email, receiver_sentTF
      if (sendTF[ii]!='undefined' || sendTF[ii]!=null ||typeof(sendTF[ii])!='undefined'){
        var outsheet = OrgSS.getSheetByName('out'); // For Testing output
         outsheet.getRange('A1').setValue(names[ii]); // For Testing output
         outsheet.getRange('A2').setValue(emails[ii]);
         outsheet.getRange('A3').setValue(sendTF[ii]);
         outsheet.getRange('A4').setValue(names);

         var TF = sendTF[ii].toString().toLowerCase().trim();
         if (TF=="yes"){
           outMessage = ""
           outMessage = "Dear "+ names[ii] +",\n"+

                        message+ "\n"+url+"\n" +clouser       ;
           email_a_directory(emails[ii],subject,outMessage )
         }else{
          var m = "Not sending dir"
         }

      }else{
        break;

      }
    }



  }
  }

}

function email_a_directory(emailout,emailsubject,emailmessage ) {
 //Send a signle email
  try{
     MailApp.sendEmail(emailout, emailsubject, emailmessage);
  } catch(e){
  Logger.log('email: ' + e.response);
  Logger.log('email: ' + e.response.getItemResponses()[0].getResponse());
  }
}
