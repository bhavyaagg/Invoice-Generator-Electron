/**
 * Created by bhavyaagg on 02/01/18.
 */

const models = require('./../db/models');

function submitInvoice(event, invoiceItemData) {
  models.Invoice.create(invoiceItemData)
    .then(invoiceItem => {

      models.Ledger.create({
        description: "Slip No. " + invoiceItem.get().id,
        partymasterId: invoiceItemData.partymasterId,
        dateOfTransaction: invoiceItemData.dateOfInvoice,
        credit: invoiceItemData.grandTotal,
        invoiceId: invoiceItem.get().id,
        debit: 0,
        balance: parseFloat(invoiceItemData.partyMasterBalance) + parseFloat(invoiceItemData.grandTotal)
      }).then(function (data) {
        models.PartyMaster.update({
          balance: parseFloat(invoiceItemData.partyMasterBalance) + parseFloat(invoiceItemData.grandTotal)
        }, {
          where: {
            id: invoiceItemData.partymasterId
          }
        }).then(function () {
          event.sender.send('getSubmitInvoice', {
            success: true,
            invoiceItem: invoiceItem.get()
          })
        })
      })

    }).catch(err => {
    event.sender.send('getSubmitInvoice', {
      success: false,
      error: err
    });
  })
}

function submitReturnInvoice(event, invoiceItemData) {
  models.Invoice.create(invoiceItemData)
    .then(invoiceItem => {

      models.Ledger.create({
        description: "Slip No. " + invoiceItem.get().id,
        partymasterId: invoiceItemData.partymasterId,
        dateOfTransaction: invoiceItemData.dateOfInvoice,
        credit: 0,
        productCategoryName: invoiceItemData.productCategoryName,
        invoiceId: invoiceItem.get().id,
        debit: invoiceItemData.grandTotal,
        balance: parseFloat(invoiceItemData.partyMasterBalance) - parseFloat(invoiceItemData.grandTotal)
      }).then(function (data) {
        models.PartyMaster.update({
          balance: parseFloat(invoiceItemData.partyMasterBalance) - parseFloat(invoiceItemData.grandTotal)
        }, {
          where: {
            id: invoiceItemData.partymasterId
          }
        }).then(function () {
          event.sender.send('getSubmitReturnInvoice', {
            success: true,
            invoiceItem: invoiceItem.get()
          })
        })
      })

    }).catch(err => {
    event.sender.send('getSubmitInvoice', {
      success: false,
      error: err
    });
  })
}

function submitInvoiceDetail(event, invoiceDetail) {
  invoiceDetail.listItems.forEach(invoiceItem => {
    models.InvoiceDetail.create({
      qty: invoiceItem.qty,
      unitType: invoiceItem.per,
      invoiceId: invoiceDetail.invoiceId,
      productId: invoiceItem.productId
    }).then(function (item) {


    }).catch(function (err) {
      event.sender.send('submittedInvoice', {
        success: false,
        error: err
      });
    });
  });
}

function viewInvoiceItems(event) {
  models.Invoice.findAll({
    include: [{
      model: models.PartyMaster,
      required: true
    }]
  })
    .then(function (invoiceItems) {
      if (invoiceItems.length > 0) {
        event.sender.send('getInvoiceItems', {
          success: true,
          invoiceItems: invoiceItems.map(invoiceItem => invoiceItem.get())
        })
      } else {
        event.sender.send('getInvoiceItems', {
          success: false,
          error: "No Element Found"
        })
      }
    })
    .catch(err => {
      event.sender.send('getInvoiceItems', {
        success: false,
        error: err
      });
    });
}

function deleteInvoiceItemById(event, invoiceItemId) {
  models.Invoice.destroy({
    where: {
      id: invoiceItemId.id
    }
  }).then(function (rows) {
    if (rows > 0) {
      models.InvoiceDetail.destroy({
        where: {
          invoiceId: null
        }
      }).then(function (rows) {
        if (rows > 0) {
          event.sender.send('deletedInvoiceItemById', {
            success: true,
          })
        } else {
          event.sender.send('deletedInvoiceItemById', {
            success: false,
            error: "Incorrect ID"
          })
        }

      }).catch(function (err) {
        console.log(err);
        event.sender.send('deletedInvoiceItemById', {
          success: false,
          error: err
        })
      })
    } else {
      event.sender.send('deletedInvoiceById', {
        success: false,
        error: "Incorrect ID"
      })
    }
  }).catch(function (err) {
    console.log(err);
    event.sender.send('deletedInvoiceById', {
      success: false,
      error: err
    });
  })
}

function viewInvoiceItemById(event, invoiceItemId) {
  console.log(invoiceItemId);
  models.Invoice.findAll({
    where: {
      id: invoiceItemId.id
    }
  }).then(function (invoiceItem) {
    if (invoiceItem) {
      event.sender.send('getInvoiceItemById', {
        success: true,
        invoiceItem: invoiceItem.get()
      })
    } else {
      event.sender.send('getInvoiceItemById', {
        success: true,
        error: "Not Found"
      })
    }
  }).catch(function (err) {
    event.sender.send('getInvoiceItemById', {
      success: true,
      error: err
    })
  })
}

function editInvoice(event, invoiceItem) {
  console.log('incoming invoice item');
  console.log(invoiceItem);
  models.Invoice.update(invoiceItem, {

    where: {
      id: invoiceItem.id
    }
  }).then(function (result) {
    if (result[0] > 0) {
      event.sender.send('editedInvoiceItem', {
        success: true
      })
    } else {
      event.sender.send('editedInvoiceItem', {
        success: false,
        error: "Incorrect ID"
      })
    }
  }).catch(function (err) {
    console.log(err)
    event.sender.send('editedInvoiceItem', {
      success: false,
      error: err
    });
  })
}

module.exports = exports = {
  submitInvoice,
  submitInvoiceDetail,
  viewInvoiceItems,
  deleteInvoiceItemById,
  viewInvoiceItemById,
  editInvoice,
  submitReturnInvoice
};