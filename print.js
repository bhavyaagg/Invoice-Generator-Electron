const {app, BrowserWindow, ipcMain} = require('electron');
const {dialog} = require('electron')
const fs = require('fs');

let print_win;
let save_pdf_path;

function getPDFPrintSettings() {
  var option = {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: 'A4'
  };
  return option;
}

function print() {
  if (print_win)
    print_win.webContents.print();
}

function savePDF(file_path) {
  if (!print_win) {
    dialog.showErrorBox('Error', "The printing window isn't created");
    return;
  }

  if (file_path) {
    print_win.webContents.printToPDF(getPDFPrintSettings(), function (err, data) {
      if (err) {
        dialog.showErrorBox('Error', err);
        return;
      }
      fs.writeFile(file_path, data, function (err) {
        if (err) {
          dialog.showErrorBox('Error', err);
          return;
        }
        save_pdf_path = file_path;

      });
    });
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
  print
};