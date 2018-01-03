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

module.exports = exports = {
  addPartyMaster,
  viewPartyMaster
};