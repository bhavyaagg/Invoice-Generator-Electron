/**
 * Created by bhavyaagg on 02/01/18.
 */

const models = require('./../db/models');

function addProduct(event, data) {
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
}

function editProduct(event, product) {
  models.Product.update({
    name: product.name,
    price: product.price,
    productcategoryId: product.productCategoryId
  }, {
    where: {
      id: product.id
    }
  }).then(function (result) {
    if (result[0] > 0) {
      event.sender.send('editedProduct', {
        success: true,
      })
    } else {
      event.sender.send('editedProduct', {
        success: false,
        error: "Incorrect ID"
      })
    }
  }).catch(function (err) {
    console.log(err)
    event.sender.send('editedProduct', {
      success: false,
      error: err
    });
  })
}

function deleteProductCategoryById(event, productCategory) {
  models.Product.destroy({
    where: {
      productcategoryId: productCategory.id
    }
  }).then(function (rows) {
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
    })
  }).catch(function (err) {
    console.log(err)
    event.sender.send('deletedProductCategoryById', {
      success: false,
      error: err
    });
  })
}

function deleteProductById(event, product) {
  models.Product.destroy({
    where: {
      id: product.id
    }
  }).then(function (rows) {
    if (rows > 0) {
      event.sender.send('deletedProductById', {
        success: true,
      })
    } else {
      event.sender.send('deletedProductById', {
        success: false,
        error: "Incorrect ID"
      })
    }
  }).catch(function (err) {
    console.log(err);
    event.sender.send('deletedProductById', {
      success: false,
      error: err
    });
  })
}

function viewProducts(event) {
  models.Product.findAll({
    include: [models.ProductCategory],
    order: [models.sequelize.literal(`\`productcategory\`.\`id\` `)]
  }).then(function (rows) {
    if (rows.length > 0) {
      event.sender.send('getProducts', {
        success: true,
        products: rows.map((v) => {
          v = v.get();
          v.productcategory = v.productcategory.get();
          return v;
        })
      });
    } else {
      event.sender.send('getProducts', {
        success: false,
        error: "No product exists"
      });
    }
  }).catch(function (err) {
    console.log(err)
    event.sender.send('getProducts', {
      success: false,
      error: err
    });
  })
}

function viewProductById(event, product) {
  models.Product.find({
    where: {
      id: product.id
    }
  }).then(function (product) {
    product
    if (product) {
      event.sender.send('getProductById', {
        success: true,
        product: product.get()
      })
    }
    else {
      event.sender.send('getProductById', {
        success: false,
        error: "Incorrect Product Id"
      })
    }
  }).catch(function (err) {
    event.sender.send('getProductById', {
      success: false,
      error: err
    });
  })
}

function viewProductByPCategoryId(event, productCategory) {
  console.log(productCategory);
  models.Product.findAll({
    where: {
      productcategoryId: productCategory.id
    },
    order: [models.sequelize.literal(`\`product\`.\`name\` `)]
  }).then(function (product) {
    event.sender.send('getProductByPCategoryId', {
      success: true,
      product: product.map(p => p.get())
    })
  }).catch(function (err) {
    event.sender.send('getProductByPCategoryId', {
      success: false,
      error: err
    });
  })
}


function viewProductSales(event) {
  models.InvoiceDetail.findAll({
    include: [models.Product],
    group: 'productId',
    attributes: [
      [models.sequelize.fn('SUM', models.sequelize.col('qty')), 'totalQty']
    ]
  }).then(rows => {
    console.log(rows)
    event.sender.send('getProductSales', {
      success: true,
      productSales: rows.map((v) => {
        v = v.get();
        v.product = v.product.get();
        return v;
      })
    })
  }).catch(err => {
    event.sender.send('getProductSales', {
      success: true,
      error: err
    })
  })
}

function viewProductSalesByProductCategoryId(event, productCategoryId) {
  models.InvoiceDetail.findAll({
    where: {
      '$product.productcategoryId$': productCategoryId.id
    },
    include: [
      {
        model: models.Product,
      }
    ],
    group: 'productId',
    attributes: [
      [models.sequelize.fn('SUM', models.sequelize.col('qty')), 'totalQty']
    ]
  }).then(rows => {
    console.log(1)
    event.sender.send('getProductSalesByProductCategoryId', {
      success: true,
      productSales: rows.map((v) => {
        v = v.get();
        v.product = v.product.get();
        return v;
      })
    })
  }).catch(err => {
    console.log(2)
    console.log(err)
    event.sender.send('getProductSalesByProductCategoryId', {
      success: true,
      error: err
    })
  })
}

module.exports = exports = {
  addProduct,
  editProduct,
  deleteProductById,
  deleteProductCategoryById,
  viewProductById,
  viewProducts,
  viewProductByPCategoryId,
  viewProductSales,
  viewProductSalesByProductCategoryId
};