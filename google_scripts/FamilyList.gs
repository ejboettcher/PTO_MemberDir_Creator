function family_list() {
  var directory = "Test member output";
  var url = "https://docs.google.com/spreadsheets/d/1oHMnL0kxHmPYQ0cqwhRvsWgwByLq3IX0Qp87eC22dao/edit?usp=sharing"
  var outtext ="";
  var OrgSS             = SpreadsheetApp.openByUrl(url);
  var ssmain            = OrgSS.getSheetByName('Form Responses 1');

  //Get number of columns to scan over
  var lastColumn       = ssmain.getLastColumn();
  var lastRow          = ssmain.getLastRow();
  var headers          = ssmain.getRange(1,1,1,lastColumn).getDisplayValues();
  headers = headers[0];
  for (var i = 2; i < lastRow; i++){
       var row          = ssmain.sort(4).getRange(i,1,1,lastColumn).getDisplayValues();
       var temptext =parserow( row[0]);
       temptext = table_column(temptext,i % 2);
       outtext = outtext+temptext;
  }
 return outtext
}

function GetFamilyNames(rows){
  return rows.sort(3);
}

function parserow(row){
   var child_i=[7,10,12];
   var class_i=[8,11,13];
   var parent_i=[3,4];
   var phone_i=5;
   var add_i=6;
   var email_i=2;
   var child=return_array(child_i,row);
   var class = return_array(class_i,row);
   var parent = return_array(parent_i,row);
   var phone = [row[phone_i]];
   var address = [row[add_i]];
   var email = [row[email_i]];
   var table = html_table(child,class,parent,phone,address,email);
   return table;
}

function return_array(index,array){
  var outarray =[];
  for (var i = 0; i < index.length; i++){
     if (index[i]!='undefined'&& index[i]!=null ){
          outarray.push(array[index[i]]);
      }
  }
  return outarray   ;
}

function doGet(e) {  // The call to make the html page
  var output = HtmlService.createHtmlOutputFromFile('style');
  //var output = HtmlService.createHtmlOutput('<b>Family Alpha Listing</b>');
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  output.append('<b>Family Alpha Listing</b>');
  output.append("<div class=\"row\">");
  var text = family_list();
  output.append(text)
  output.append('</div>')

  return output;
}


function table_column(text,col){
   // Make a table into a column
  // col is 0 or 1 to indicate color
  color = ['#aaa','#bbb'];
  var outtext = "  <div class=\"column\" style=\"background-color:"+color[col]+";\">";
  outtext = outtext + text + "</div>";
  return outtext
}
function capitalizeFirstLetter(string) {
  if (string!='undefined'&& string!=null){
    string = string.toString();
    return string.charAt(0).toUpperCase() + string.slice(1);}
  else{return string;}
}
function html_table(child,class,parent,phone,address,email){
  // Each input var should be an ordered list
  if (child[0]=='undefined' || child[0]==null){
    return }
  else{
  var outtext="<table> \n";
  //build child header: Family Name then Child
  if (parent[0]!='undefined'&& parent[0]!=null){
    var family = parent[0].trim().split(/[ ,]/);
    family = family[family.length-1]
    family = capitalizeFirstLetter(family);}
 else{
      family=parent[0];
     }

  for (var i = 0; i < child.length; i++){
    if (child[i]!='undefined'&& child[i]!=null && child[i].length>2){
       var names = child[i].split(/[ ,]+/,1);
       if (names.length>1){names = capitalizeFirstLetter(names[1]) +", "+capitalizeFirstLetter(names[0])}
       else{names = family+', ' + capitalizeFirstLetter(child[i]);}
       outtext = outtext + "<tr> \n";
       outtext = outtext + "   <th align=\"left\">"+names+ "</th>\n";
       outtext = outtext + "   <th align=\"right\">"+class[i]+ "</th>\n";
       outtext = outtext + "</tr> \n";
  }
  }
  for (var i = 0; i < Math.max(parent.length,phone.length); i++){
    outtext = outtext + "<tr> \n";
    var p = parent[i];
    if (p==null){
      p = "";
    }else{ p= capitalizeFirstLetter(p);}
    var c = phone[i];
    if (c ==null){
      c = "";
    }
    outtext = outtext + "   <td align=\"left\">"+p+ "</td>\n";
    outtext = outtext + "   <td align=\"right\">"+c+ "</td>\n";
    outtext = outtext + "</tr> \n";
  }
  for (var i = 0; i < address.length; i++){
    outtext = outtext + "<tr> \n";
    outtext = outtext + "   <td colspan=\"2\", align=\"left\">"+address[i]+ "</td>\n";
    outtext = outtext + "</tr> \n";
  }

  for (var i = 0; i < email.length; i++){
    outtext = outtext + "<tr> \n";
    outtext = outtext + "   <td colspan=\"2\", align=\"left\">"+email[i]+ "</td>\n";
      outtext = outtext + "</tr> \n";
  }
outtext = outtext + " </table>";
  return outtext;
  }
  }
