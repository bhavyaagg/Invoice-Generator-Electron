/**
 * Created by nimit95 on 03/01/18.
 */

const models = require('./../db/models');

function addPartyMasterProductCategoryDiscount(event, dataList) {
  dataList.forEach(data => {
    models.PartyMasterProductCategoryDiscount
      .create(data)
      .then(result=>{

      })
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
    .find({
      where: {
        partymasterId: data.partymasterId,
        productcategoryId: data.productcategoryId
      }
    })
    .then(result => {
      if (result ) {
        event.sender.send('getDiscountByPartyMasterIdAndProductCategoryId', {
          success: true,
          discountObj: result.get()
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

//TODO GET FROM LIST AND CHANGE IN INDEX JS
function viewDiscountsByPartyId(event, data) {
  models.PartyMasterProductCategoryDiscount
    .findAll({
      where:{
        partymasterId: data.partyMasterId
      },
      include: [models.ProductCategory]
    })
    .then(partyMasterDiscountList=>{
      if(partyMasterDiscountList.length>0) {
        event.sender.send('getDiscountsByPartyId', {
          success: true,
          partyMasterDiscounts: partyMasterDiscountList
        })
      }
      else{
        event.sender.send('getDiscountsByPartyId', {
          success: false,
          error: "No Object Found"
        })
      }
    })
    .catch(err=>{
      event.sender.send('getDiscountsByPartyId',{
        success: false,
        error: err
      })
    })
}
module.exports = exports = {
  addPartyMasterProductCategoryDiscount,
  viewDiscountByPartyMasterIdAndProductCategoryId,
  viewDiscountsByPartyId
};