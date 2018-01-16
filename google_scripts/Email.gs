function emailrespondToFormSubmit(e) {
// This function sends an Email to the Person who just filled out the form.
//  It emails all the information they provided.
//
  /* MailApp.sendEmail("evelyn.boettcher@gmail.com",
                    "Test Test ",
                    "A new application has been submitted.\n\n" +
                    "Here is the link to all Applications:\n",
                    {name:"Testing"});
  //var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  //var settings = PropertiesService.getDocumentProperties();

  */

  // Get PTO defined information: Subject, Message and emaill clouser
  var ss       = SpreadsheetApp.getActiveSpreadsheet();
  var sheet    = ss.getSheetByName('FormInit');
  var subject  = sheet.getRange('C10').getValue();
  var message  = sheet.getRange('C11').getValue();
  var clouser  = sheet.getRange('C12').getValue();

  //https://stackoverflow.com/questions/26253706/how-to-extract-response-items-from-a-google-form
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();
  var yourtext = "";
  var usremail = "false";

  // For each response parse results
  for (var i=0; i<itemResponses.length; i++) {
     var str = itemResponses[i].getItem().getTitle();
     yourtext  = yourtext + str + ": " + itemResponses[i].getResponse()+"\n";
     var bolemail = str.indexOf('mail');
     if (bolemail>-1){
         var usremail = itemResponses[i].getResponse();  // returns a string
    }
  }
  message = message +'\n' + yourtext  +'\n' + clouser;

  //var outsheet = ss.getSheetByName('out'); // For Testing output
  //outsheet.getRange('A1').setValue(yourtext); // For Testing output

  if (usremail.length>5){
     MailApp.sendEmail(usremail, subject, message);
  }
  Logger.log('email: ' + e.response);
  Logger.log('email: ' + e.response.getItemResponses()[0].getResponse());
}
