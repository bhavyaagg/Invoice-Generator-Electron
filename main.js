/**
 * Created by bhavyaagg on 28/12/17.
 */

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const models = require('./db/models');
let mainWindow;

const routes = require('./routes');

function createWindow() {
  let mainScreenDimensions = require('electron').screen.getPrimaryDisplay().size;

  mainWindow = new BrowserWindow({width: mainScreenDimensions.width, height: mainScreenDimensions.height});
  console.log(process.versions.node)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public_static', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools();

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

ipcMain.on('addPartyMaster', routes.partyMaster.addPartyMaster);

ipcMain.on('viewPartyMaster', routes.partyMaster.viewPartyMaster);

ipcMain.on('submitInvoice', routes.invoice.submitInvoice);

ipcMain.on('submitInvoiceDetail', routes.invoice.submitInvoiceDetail);

ipcMain.on('viewInvoiceItems', routes.invoice.viewInvoiceItems);

ipcMain.on('viewLedgerByPartyMasterId', routes.ledger.viewLedgerByPartyMasterId);