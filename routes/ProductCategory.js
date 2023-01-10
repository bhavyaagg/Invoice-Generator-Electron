/**
 * Created by bhavyaagg on 02/01/18.
 */

const models = require('./../db/models');

function addProductCategory(event, data) {
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
}

function viewProductCategories(event) {
  models.ProductCategory.findAll({}).then(function (rows) {
    event.sender.send('getProductCategories', {
      success: true,
      productCategories: rows.map((v) => v.get()).sort((v1, v2) => v1.name.localeCompare(v2.name))
    });
  }).catch(function (err) {
    event.sender.send('getProductCategories', {
      success: false,
      error: err
    });
  })
}

function viewProductCategoryById(event, productCategory) {
  models.ProductCategory.findOne({
    where: {
      id: productCategory.id
    }
  }).then(function (productCategory) {
    if (productCategory) {
      event.sender.send('getProductCategoryById', {
        success: true,
        productCategory: productCategory.get()
      })
    } else {
      event.sender.send('getProductCategoryById', {
        success: false,
        error: "Incorrect Product Category ID"
      })
    }
  }).catch(function (err) {
    event.sender.send('getProductCategoryById', {
      success: false,
      error: err
    });
  })
}

function editProductCategory(event, productCategory) {
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
}

module.exports = exports = {
  addProductCategory,
  viewProductCategories,
  viewProductCategoryById,
  editProductCategory
};