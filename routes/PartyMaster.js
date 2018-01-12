/**
 * Created by nimit on 02/01/18.
 */

const models = require('./../db/models');

function addPartyMaster(event, data) {
  models.PartyMaster.create(data)
    .then(partyMaster => {
      console.log(partyMaster.get());
      event.sender.send('addedPartyMaster', {
        success: true,
        partyMasterData: partyMaster.get()
      });
    })
    .catch(function (err) {
      event.sender.send('addedPartyMaster', {
        success: false,
        error: err
      })
    });
}

function viewPartyMaster(event) {
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
}

function addPaymentForPartyMaster(event, data) {
  models.PartyMaster.find({
    where: {
      id: data.partyMasterId
    }
  }).then(function (partymaster) {
    if (partymaster) {
      let partyMasterBalance = parseFloat(partymaster.get().balance);
      models.Ledger.create({
        description: data.description,
        partymasterId: data.partyMasterId,
        dateOfTransaction: data.transactionDate,
        credit: 0,
        productCategoryName: "",
        debit: data.amount,
        balance: parseFloat(partyMasterBalance) - parseFloat(data.amount)
      }).then(function (rows) {
        partymaster.update({
          balance: parseFloat(partyMasterBalance) - parseFloat(data.amount)
        }).then(function (row) {
          event.sender.send('addedPaymentForPartyMaster', {
            success: true
          })
        })
      })
    } else {
      event.sender.send('addedPaymentForPartyMaster', {
        success: false,
        error: "Party Master Does Not Exists."
      })
    }
  }).catch(function () {
    event.sender.send('addedPaymentForPartyMaster', {
      success: false,
      error: "Server Error."
    })
  })
}

function editPartyMaster(event, data) {
  models.PartyMaster.update({
    name: data.name,
    destination: data.destination,
    marka: data.marka,
    openingBalance: data.openingBalance,
    openingBalanceDate: data.openingBalanceDate,
    transport: data.transport,
    discount: data.discount,
    splDiscount: data.splDiscount,
    cd: data.cd
  }, {
    where: {
      id: data.id
    }
  }).then(res => {
    if (res) {
      event.sender.send('editedPartyMaster', {
        success: true
      })
    }
    else {
      event.sender.send('editedPartyMaster', {
        success: false
      })
    }
  }).catch(err => {
    event.sender.send('editedPartyMaster', {
      success: false,
      error: err
    })
  })

}

function updateBalance(event, data) {
  console.log('calling');
  models.PartyMaster.update({
    balance: models.sequelize.literal(`balance - ${data.balance}`)
  }, {
    where: {
      partymasterId: data.partyMasterId
    }
  }).then(res => {
    if(res && res.length>0) {
      event.sender.send('updatedBalance',{
        success: true
      })
    }
    else{
      event.sender.send('updatedBalance',{
        success: false,
        error: "No object Found"
      })
    }
  }).catch(err => {
    event.sender.send('updatedBalance', {
      success: false,
      error: err
    })
  })
}

module.exports = exports = {
  addPartyMaster,
  viewPartyMaster,
  addPaymentForPartyMaster,
  editPartyMaster,
  updateBalance
};