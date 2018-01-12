/**
 * Created by bhavyaagg on 02/01/18.
 */

const models = require('./../db/models');

function viewLedgerByPartyMasterId(event, partyMaster) {
  models.Ledger.findAll({
    where: {
      partymasterId: partyMaster.id
    },
    include: [models.PartyMaster]
  }).then(function (rows) {
    if (rows.length > 0) {
      event.sender.send('getLedgerByPartyMasterId', {
        success: true,
        ledgerRows: rows.map((v) => {
          v = v.get();
          v.partymaster = v.partymaster.get()
          return v;
        })
      });
    } else {
      event.sender.send('getLedgerByPartyMasterId', {
        success: false,
        error: "No Ledger exists"
      });
    }
  }).catch(function (err) {
    console.log(err);
    event.sender.send('getLedgerByPartyMasterId', {
      success: false,
      error: err
    });
  })
}

function deleteLedgerItem(event, data) {
  models.Ledger.destroy({
    where: {
      invoiceId: data.invoiceId
    }
  }).then(row => {
    console.log(row);
    event.sender.send('deletedLedger', {
      success:true
    })
  }).catch( err=> {
    event.sender.send('deletedLedger', {
      success: false,
      error: err
    })
  })
}

function updateCreditByInvoiceId(event, data) {
  models.Ledger.update({
    credit: data.credit
  },{
    where:{
      invoiceId: data.invoiceId
    }
  }).then(row=>{
    if(row && row.length>0) {
      event.sender.send('updatedCreditByInvoiceId',{
        success: true
      })
    }
    else {
      event.sender.send('updatedCreditByInvoiceId',{
        success: false,
        error: "Nothing to update"
      })
    }
  }).catch(err=>{
    event.sender.send('updatedCreditByInvoiceId',{
      success: false,
      error: err
    })
  })
}

module.exports = exports = {
  viewLedgerByPartyMasterId,
  deleteLedgerItem,
  updateCreditByInvoiceId
};