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
    productcategoryId: data.productCategoryId
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

ipcMain.on('viewProductCategoryById', function (event, productCategory) {
  models.ProductCategory.find({
    where: {
      id: productCategory.id
    }
  }).then(function (productCategory) {
    event.sender.send('getProductCategoryById', {
      success: true,
      productCategory: productCategory.get()
    })
  }).catch(function (err) {
    event.sender.send('getProductCategoryById', {
      success: false,
      error: err
    });
  })
});

ipcMain.on('editProductCategory', function (event, productCategory) {
  models.ProductCategory.update({
    name: productCategory.name
  }, {
    where: {
      id: productCategory.id
    }
  }).then(function (result) {
    if (result[0] > 0) {
      event.sender.send('editedProductCategory', {
        success: true,
      })
    } else {
      event.sender.send('editedProductCategory', {
        success: false,
        error: "Incorrect ID"
      })
    }
  }).catch(function (err) {
    console.log(err)
    event.sender.send('editedProductCategory', {
      success: false,
      error: err
    });
  })
});

ipcMain.on('deleteProductCategoryById', function (event, productCategory) {
  models.ProductCategory.destroy({
    where: {
      id: productCategory.id
    }
  }).then(function (result) {
    if (result > 0) {
      event.sender.send('deletedProductCategoryById', {
        success: true,
      })
    } else {
      event.sender.send('deletedProductCategoryById', {
        success: false,
        error: "Incorrect ID"
      })
    }
  }).catch(function (err) {
    console.log(err)
    event.sender.send('editedProductCategory', {
      success: false,
      error: err
    });
  })
});


ipcMain.on('viewProducts', function (event) {
  models.Product.findAll({
    include: [models.ProductCategory]
  }).then(function (rows) {
    event.sender.send('getProducts', {
      success: true,
      products: rows.map((v) => {
        v = v.get();
        v.productcategory = v.productcategory.get();
        return v;
      })
    });
  }).catch(function (err) {
    event.sender.send('getProducts', {
      success: false,
      error: err
    });
  })
});

ipcMain.on('addPartyMaster', function (event, data) {
  models.PartyMaster.create(data)
    .then(partyMaster => {

      event.sender.send('addedPartyMaster', {
        success: true
      });
    })
    .catch(function (err) {
      event.sender.send('addedPartyMaster', {
        success: false,
        error: err
      })
    });
});
ipcMain.on('viewPartyMaster', function (event) {
  models.PartyMaster.findAll({})
    .then(function (rows) {

      event.sender.send('getPartyMaster', {
        success: true,
        partyMasterRows: rows.map((v) => v.get())
      });
    }).catch(function (err) {
    event.sender.send('getPartyMaster', {
      success: false,
      error: err
    });
  })
});

