function formptomain(FormTitle,outss,donate,paycheck,classlist) {
   var form = FormApp.create(FormTitle);
   var classarray = new Array();
   classarray = classlist.split(',');
   form.setAllowResponseEdits(true)
     .setAcceptingResponses(true);
   form.setConfirmationMessage(paycheck + '\n'+
                            'Suggested Donation amount is ' + String(donate));

   var ss = SpreadsheetApp.create(outss);
   // Update the form's response destination.
   form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());


  // Set up Email response
   var triggers = ScriptApp.getProjectTriggers();
   var settings = PropertiesService.getDocumentProperties();

  // Create a new trigger if required; delete existing trigger
  //   if it is not needed.
  var existingTrigger = null;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getEventType() == ScriptApp.EventType.ON_FORM_SUBMIT) {
      existingTrigger = triggers[i];
      ScriptApp.deleteTrigger(existingTrigger);
    }
  }

  var trigger = ScriptApp.newTrigger('emailrespondToFormSubmit')
        .forForm(form)
        .onFormSubmit()
        .create();

  var dirTF=form.addListItem()
      .setTitle('Name and Address Included in Membership Directory');
      dirTF.setChoices([
        dirTF.createChoice('Yes'),
        dirTF.createChoice('No')])
      dirTF.setRequired(true);


  var useremail =form.addTextItem()
     useremail.setTitle('Your E-mail');
     useremail.setRequired(true);

  var item = form.addTextItem();
     item.setTitle('Your Name');

  var item = form.addTextItem();
     item.setTitle('Phone');

  var item = form.addTextItem();
     item.setTitle('Address');

  var item = form.addTextItem();
     item.setTitle('Child Name');
  var grade=form.addListItem()
      .setTitle('Grade');
      grade.setChoiceValues(classarray);

  var listkids = form.addListItem()
      .setTitle('More Kids');

  var addkids = form.addPageBreakItem().setTitle("Please, add the rest of your Smith Family");



 // More Kid information
 for (var i = 0; i < 5; i++) {
    var item = form.addTextItem();
     item.setTitle('Child Name');
   var grade=form.addListItem()
      .setTitle('Grade');
      grade.setChoiceValues([classarray]);
 }

 var Payment = form.addPageBreakItem().setTitle("Please, select payment");
  //Paying method

  var item = form.addListItem();
     item.setTitle('Pay by ');

  item.setChoices([
       item.createChoice('Check', FormApp.PageNavigationType.SUBMIT),
       item.createChoice('PayPal',FormApp.PageNavigationType.CONTINUE)
     ]);

   listkids.setChoices([
        listkids.createChoice('Yes', addkids),
        listkids.createChoice('No', Payment)])
        listkids.setRequired(true);


form.setConfirmationMessage( 'Click the PayPal Button to finish your membership \n'+
                            'Suggested Donation amount is $' + String(donate) +".");


Logger.log('Published URL: ' + form.getPublishedUrl());
Logger.log('Editor URL: ' + form.getEditUrl());

}
