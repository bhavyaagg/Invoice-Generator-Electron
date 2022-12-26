/**
 * Created by bhavyaagg on 28/12/17.
 */

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const models = require('./db/models');
let mainWindow;

const routes = require('./routes');
const print = require('./print');

function createWindow() {
  let mainScreenDimensions = require('electron').screen.getPrimaryDisplay().size;

  mainWindow = new BrowserWindow({
    width: mainScreenDimensions.width,
    height: mainScreenDimensions.height,
    defaultFontSize: 10,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  console.log(process.versions.node)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public_static', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
    console.log("Window Closed")
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('addProductCategory', routes.productCategory.addProductCategory);

ipcMain.on('viewProductCategories', routes.productCategory.viewProductCategories);

ipcMain.on('viewProductCategoryById', routes.productCategory.viewProductCategoryById);

ipcMain.on('editProductCategory', routes.productCategory.editProductCategory);

ipcMain.on('addProduct', routes.product.addProduct);

ipcMain.on('editProduct', routes.product.editProduct);

ipcMain.on('deleteProductCategoryById', routes.product.deleteProductCategoryById);

ipcMain.on('deleteProductById', routes.product.deleteProductById);

ipcMain.on('viewProducts', routes.product.viewProducts);

ipcMain.on('viewProductById', routes.product.viewProductById);

ipcMain.on('viewProductByPCategoryId', routes.product.viewProductByPCategoryId);

ipcMain.on('viewProductSales', routes.product.viewProductSales);

ipcMain.on('viewProductSalesByProductCategoryId', routes.product.viewProductSalesByProductCategoryId);

ipcMain.on('addPartyMaster', routes.partyMaster.addPartyMaster);

ipcMain.on('viewPartyMaster', routes.partyMaster.viewPartyMaster);

ipcMain.on('editPartyMaster', routes.partyMaster.editPartyMaster);

ipcMain.on('deletePartyMaster', routes.partyMaster.deletePartyMaster);

ipcMain.on('submitInvoice', routes.invoice.submitInvoice);

ipcMain.on('submitReturnInvoice', routes.invoice.submitReturnInvoice);

ipcMain.on('updateBalance', routes.partyMaster.updateBalance);

ipcMain.on('submitInvoiceDetail', routes.invoice.submitInvoiceDetail);

ipcMain.on('deleteInvoiceDetail', routes.invoiceDetail.deleteInvoiceDetail);

ipcMain.on('viewInvoiceItems', routes.invoice.viewInvoiceItems);

ipcMain.on('viewLedgerByPartyMasterId', routes.ledger.viewLedgerByPartyMasterId);

ipcMain.on('viewLedgerByInvoiceId', routes.ledger.viewLedgerByInvoiceId);

ipcMain.on('addPaymentForPartyMaster', routes.partyMaster.addPaymentForPartyMaster);

ipcMain.on('deleteInvoiceItemById', routes.invoice.deleteInvoiceItemById);

ipcMain.on('viewInvoiceItemById', routes.invoice.viewInvoiceItemById);

ipcMain.on('editInvoice', routes.invoice.editInvoice);

ipcMain.on('viewInvoiceDetailsById', routes.invoiceDetail.viewInvoiceDetailsById);

ipcMain.on('addPartyMasterProductCategoryDiscount', routes.partyMasterProductCategoryDiscount.addPartyMasterProductCategoryDiscount);

ipcMain.on('viewDiscountByPartyMasterIdAndProductCategoryId', routes.partyMasterProductCategoryDiscount.viewDiscountByPartyMasterIdAndProductCategoryId);

ipcMain.on('viewDiscountsByPartyId', routes.partyMasterProductCategoryDiscount.viewDiscountsByPartyId);

ipcMain.on('updatePartyProductCategoryDiscount', routes.partyMasterProductCategoryDiscount.updateDiscountByPartyIdProductCategoryId);

ipcMain.on('printInvoice', function (event, data) {
  print.preparePrint(mainWindow);
  print.savePDF(__dirname + '/invoices/' + data.id + '.pdf');
  print.print(event);
});

ipcMain.on('printMainContent', function (event, data) {
  print.preparePrint(mainWindow);
  // print.savePDF(__dirname + '/invoices/' + data.id + '.pdf');
  print.printMainContent(event);
});


ipcMain.on('viewLedgerByPartyMasterId', routes.ledger.viewLedgerByPartyMasterId);

ipcMain.on('deleteLedgerItem', routes.ledger.deleteLedgerItem);

ipcMain.on('updateCreditByInvoiceId', routes.ledger.updateCreditByInvoiceId);

ipcMain.on('updateDebitByInvoiceId', routes.ledger.updateDebitByInvoiceId);

ipcMain.on('viewMasterLedger', routes.ledger.viewMasterLedger);

ipcMain.on('deletePayment', routes.ledger.deletePayment);

ipcMain.on('deleteInvoicesByDate', routes.invoiceDetail.deleteEverything)