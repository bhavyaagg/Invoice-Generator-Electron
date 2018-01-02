/**
 * Created by bhavyaagg on 02/01/18.
 */

const models = require('./../db/models');

function submitInvoice(event, invoiceItem) {
  models.Invoice.create(invoiceItem)
    .then(invoiceItem => {
      event.sender.send('getSubmitInvoice', {
        success: true,
        data: invoiceItem
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
      event.sender.send('getSubmitInvoice', {
        success: false,
        error: err
      });
    });
  });
}

function viewInvoiceItems(event) {
  models.Invoice.findAll({})
    .then(function (invoiceItems) {
      event.sender.send('getInvoiceItems', {
        success: true,
        invoiceItems: invoiceItems.map(invoiceItem => invoiceItem.get())
      })
    })
    .catch(err => {
      event.sender.send('getInvoiceItems', {
        success: false,
        error: err
      });
    });
}

module.exports = exports = {
  submitInvoice,
  submitInvoiceDetail,
  viewInvoiceItems
};