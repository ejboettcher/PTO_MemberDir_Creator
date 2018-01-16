/**
 * Copyright 2017 Evelyn J. Boettcher. All Rights Reserved.
 * evelyn.boettcher@gmail.com
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function onOpen() {

  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  //This builds the APPS on the main spread shhet
  ui.createMenu('PTO FORM Apps')
      .addItem('PTO Form Generator', 'ptoform')
      .addItem('PTO Member Directory', 'mem_dir')
      .addItem('Email PTO Member Directory','email_dir')
      .addItem('Check Paid by PayPal','paypalck')
      .addToUi();
}

function ptoform(){ // THis builds the PTO Form for User inputs and emails the User
  var ss       = SpreadsheetApp.getActiveSpreadsheet();
  var sheet    = ss.getSheetByName('FormInit')
  var FormTitle = sheet.getRange('C3').getValue();
  var outss     = sheet.getRange('C4').getValue(); //Out spread sheet name
  var donate    = sheet.getRange('C6').getValue();
  var classlist = sheet.getRange('C5').getValue();
  var formclouser = sheet.getRange('C7').getValue();
  formptomain(FormTitle,outss,donate, classlist,formclouser);
}

function email_dir(){ // This emails people that have "Paid" the Directory
  var ss       = SpreadsheetApp.getActiveSpreadsheet();
  var sheet    = ss.getSheetByName('EmailDirectory')
  var directory = sheet.getRange('C1').getValue(); //Directory name
  var master_S  = sheet.getRange('C2').getValue(); //Master Spreadsheet
  var master_ss = sheet.getRange('C3').getValue(); //Master Spreadsheet sheet
  var hdsendTF  = sheet.getRange('C4').getValue(); //Header name that says emails or not (Yes/No)
  var hdemail   = sheet.getRange('C5').getValue(); // Header name for email address
  var hdreceivername = sheet.getRange('C6').getValue(); // Header of receivers' name

  //Email message parts
  var subject  = sheet.getRange('C10').getValue();
  var message  = sheet.getRange('C11').getValue();
  var clouser  = sheet.getRange('C12').getValue();


  send_directory(directory,master_S,master_ss,hdsendTF,hdemail,hdreceivername,subject,message,clouser);

}
