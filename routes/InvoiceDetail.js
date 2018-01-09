/**
 * Created by nimit95 on 09/01/18.
 */


const models = require('./../db/models');

function viewInvoiceDetailsByIds(event, data) {
  console.log(data);
  models.InvoiceDetail.findAll({
    where: {
      invoiceId: data.invoiceId
    },
    include: [models.Product]
  }).then(resultRows => {
    if (resultRows.length > 0) {
      event.sender.send('getInvoiceDetailByIds', {
        success: true,
        invoiceItems: resultRows.map(v=>{
          v = v.get();
          v.product = v.product.get();
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

module.exports = exports = {
  viewInvoiceDetailsByIds
};