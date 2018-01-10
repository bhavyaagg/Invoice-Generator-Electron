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
  }).catch( err=> {
    event.sender.send('deletedLedger', {
      success: false,
      error: err
    })
  })
}

module.exports = exports = {
  viewLedgerByPartyMasterId,
  deleteLedgerItem
};