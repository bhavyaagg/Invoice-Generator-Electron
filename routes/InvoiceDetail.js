/**
 * Created by nimit95 on 09/01/18.
 */


const models = require('./../db/models');

function viewInvoiceDetailsByIds(event, data) {
  models.InvoiceDetail.findAll({
    where: {
      invoiceId: data.invoiceId,
      productcategoryId: data.productcategoryId
    }
  }).then(resultRows => {
    if (resultRows.length > 0) {
      event.sender.send('getInvoiceDetailByIds', {
        success: true,
        invoiceItems: resultRows.map(v=>{
          v = v.get();
          v.invoice = v.invoice.get();
          v.productcategory = v.productcategory.get();
          return v;
        })
      })
    }
    else{
      event.sender.send('getInvoiceDetailByIds', {
        success: false,
        error: "No object Found"
      })
    }
  }).catch(err => {
    event.sender.send('getInvoiceDetailByIds', {
      success: false,
      error: err
    })
  })
}