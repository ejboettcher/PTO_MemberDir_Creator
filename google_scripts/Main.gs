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
  ui.createMenu('PTO Custom Apps')
      .addItem('PTO Form Generator', 'ptoform')
      .addItem('PTO Member Directory', 'mem_dir')
      .addItem('Email PTO Member Directory','email_dir')
      .addItem('Check Paid by PayPal','paypalck')

      .addToUi();
}


function ptoform(){
  var ss       = SpreadsheetApp.getActiveSpreadsheet();  
  var sheet    = ss.getSheetByName('FormInit')
  var FormTitle = sheet.getRange('C3').getValue(); 
  var outss     = sheet.getRange('C5').getValue();
  var donate    = sheet.getRange('C6').getValue();
  var paycheck  = sheet.getRange('C7').getValue();
  var classlist  = sheet.getRange('C8').getValue();

  formptomain(FormTitle,outss,donate, paycheck,classlist);
}

function mem_dir(){
  
}

function paypalck(){
  
}
