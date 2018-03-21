import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';

@Injectable()
export class CommonFunctions {

  constructor() { }
  //============ * Common Functions of Trade Settlement Dashboard Goes here * ===========//
  
  //Function to validate email address
  public isValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //Function to send email
  public sendEmail(toEmail: any, subject: any, message: any, datToSend: any){
    var emails = toEmail.split(";");
    var sub = subject;
    var msg = message;
    
    var invalidEmails="";
    emails = emails.filter(
      email =>  email != ""
    ) ;
    for(let email of emails){
      if(this.isValid(email) == false){
        invalidEmails= invalidEmails+email+"\n";
      }         
    }

    if(invalidEmails != ""){
      alert("Please check following emails: \n\n"+invalidEmails);
      return false;
    }else{
      var sendData = [{"EMAIL_TO":emails,"SUBJECT":sub,"MESSAGE":msg,"FILTER_DATA":datToSend}];
      console.log(sendData);
      return true;
    }
  }

  //============ * Common Functions of Onboarding Dashboard Goes here * ===========//

  //============ * Common Functions to both view goes here * ===========//
  //This function will print the html content passed as parameter
  public printHTML(content:string){
    var re = /class="domain"/gi; 
    content = content.replace(re, "style='fill:none'");
    var re1 = /<line/gi;
    content = content.replace(re1, "<line style='stroke: #ddd;'");
    var mywindow = window.open('', 'Print', 'height=600,width=800');
    mywindow.document.write('<html><head><title>Print</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(content);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
  }

  //This function will take SVG String and filetype as input
  //and saves the output in desired format
  public DownloadSVG(svgString: any, fileType: string, fileName : string) {
    var PNG_FORMAT = ["PNG", "Png", "png"];
    var JPG_FORMAT = ["JPG", "Jpg", "jpg", "JPEG", "Jpeg", "jpeg"];
    var PDF_FORMAT = ["PDF", "Pdf", "pdf"];
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var re = /class="domain"/gi;
    svgString = svgString.replace(re, "style='fill:none'");
    var re1 = /<line/gi;
    svgString = svgString.replace(re1, "<line style='stroke: #ddd;'");

    var DOMURL = self.URL || (window as any).webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    var url = DOMURL.createObjectURL(svg);
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      var png = canvas.toDataURL("image/png");
      canvas.toBlob(function (blob) {
        if (PNG_FORMAT.indexOf(fileType) > -1) {
          saveAs(blob, fileName + '.png');
        } else if (JPG_FORMAT.indexOf(fileType) > -1) {
          saveAs(blob, fileName + '.jpg');
        } else if (PDF_FORMAT.indexOf(fileType) > -1) {
          var pdf = new jsPDF();
          pdf.addImage(png, 'JPEG', 0, 0);
          pdf.save(fileName + ".pdf");
        }
      });
    };
    img.src = url;
  }

}
