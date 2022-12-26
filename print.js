const {app, BrowserWindow, ipcMain, webContents} = require('electron');
const {dialog} = require('electron')
const fs = require('fs');

let print_win;
let save_pdf_path;

function getPDFPrintSettings() {
  var option = {
    landscape: false,
    marginsType: 1,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: 'A4'
  };
  return option;
}

function print(event) {
  if (print_win) {
    print_win.webContents.print();
    event.sender.send('printedInvoice', {
      success: true
    })
  } else {
    event.sender.send('printedInvoice', {
      success: false
    })
  }
}

function printMainContent(event) {
  if (print_win) {
    print_win.webContents.print();
    event.sender.send('printedMainContent', {
      success: true
    })
  } else {
    event.sender.send('printedMainContent', {
      success: false
    })
  }
}

function savePDF(file_path) {
  if (!print_win) {
    console.log("Saving error")
    dialog.showErrorBox('Error', "The printing window isn't created");
    return;
  }

  if (file_path) {
    print_win.webContents.printToPDF(getPDFPrintSettings())
      .then(data => {
        fs.writeFileSync(file_path, data, (error) => {
          console.log(error)
          if (error) throw error
          console.log(`Wrote PDF successfully to ${file_path}`)
        })
      }).catch(error => {
      console.log(`Failed to write PDF to ${file_path}: `, error)
    })
  }
}

function viewPDF() {
  if (!save_pdf_path) {
    dialog.showErrorBox('Error', "You should save the pdf before viewing it");
    return;
  }
  ipcMain.openItem(save_pdf_path);
}

function preparePrint(print) {

  print_win = print;
  print_win.show();

  print_win.on('closed', function () {
    print_win = null;
  });
}

module.exports = exports = {
  preparePrint,
  savePDF,
  viewPDF,
  print,
  printMainContent
};