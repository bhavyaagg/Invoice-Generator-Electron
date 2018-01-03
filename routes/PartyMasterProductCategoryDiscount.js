/**
 * Created by nimit95 on 03/01/18.
 */

const models = require('./../db/models');

function addPartyMasterProductCategoryDiscount(event, dataList) {
  dataList.forEach(data => {
    models.PartyMasterProductCategoryDiscount
      .create(data)
      .then()
      .catch(err => {
        event.sender.send('addedPartyMasterProductCategoryDiscount', {
          success: false,
          error: err
        })
      })
  })
}

function viewDiscountByPartyMasterIdAndProductCategoryId(event, data) {

  models.PartyMasterProductCategoryDiscount
    .findAll({
      where: {
        partymasterId: data.partyMasterId,
        productcategoryId: data.productCategoryId
      }
    })
    .then(result => {
      if (result && result.length !== 0) {
        event.sender.send('getDiscountByPartyMasterIdAndProductCategoryId', {
          success: true,
          discountObj: result
        })
      }
      else {
        event.sender.send('getDiscountByPartyMasterIdAndProductCategoryId', {
          success: false,
          error: "Object Not found"
        })
      }
    })
    .catch(err => {
      event.sender.send('getDiscountByPartyMasterIdAndProductCategoryId', {
        success: false,
        error: err
      })
    })
}

module.exports = exports = {
  addPartyMasterProductCategoryDiscount,
  viewDiscountByPartyMasterIdAndProductCategoryId
};