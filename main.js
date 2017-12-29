/**
 * Created by bhavyaagg on 28/12/17.
 */

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const models = require('./db/models');
let mainWindow;

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

ipcMain.on('addProductCategory', function (event, data) {
  models.ProductCategory.create({
    name: data.productCategoryName
  }).then(function (result) {
    event.sender.send('addedProductCategory', {
      success: true
    });
  }).catch(function (err) {
    event.sender.send('addedProductCategory', {
      success: false,
      error: err
    })
  })
});

ipcMain.on('addProduct', function (event, data) {
  models.Product.create({
    name: data.productName,
    price: data.productPrice,
    productCategoryId: data.productCategoryId
  }).then(function (result) {
    event.sender.send('addedProduct', {
      success: true
    });
  }).catch(function (err) {
    event.sender.send('addedProduct', {
      success: false,
      error: err
    })
  })
});

ipcMain.on('viewProductCategories', function (event) {
  models.ProductCategory.findAll({}).then(function (rows) {
    event.sender.send('getProductCategories', {
      success: true,
      productCategories: rows.map((v) => v.get())
    });
  }).catch(function (err) {
    event.sender.send('getProductCategories', {
      success: false,
      error: err
    });
  })
});


ipcMain.on('log', function (event, data) {
  console.log(event.sender);
  console.log(data)
  setTimeout(function () {
    event.sender.send('logback', "World")
  }, 2000)
});

ipcMain.on('addPartyMaster', function (event, data) {
  models.PartyMaster.create(data)
    .then(partyMaster => {
      console.log(partyMaster)
    })
});


