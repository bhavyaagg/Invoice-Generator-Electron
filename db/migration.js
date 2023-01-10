const models = require('./models');

const ProductCategories = [
  {name: "P"},
  {name: "GRILL"},
  {name: "SS"},
  {name: "CP"},
  {name: "CP KIT"},
  {name: "BLK"},
  {name: "BLK KIT"},
  {name: "DV"},
  {name: "DVSSL"},
]


const productCategoryToProductMap = {
  "P": [
    ...require("../productData/Guard.json"),
    ...require("../productData/RoofRail.json"),
  ],
  "GRILL": [
    ...require("../productData/Grill.json"),
  ],
  "SS": [
    ...require("../productData/FenderAndFootstep.json"),
    ...require("../productData/LowerGarnishV.json"),
    ...require("../productData/LowerGarnishP.json"),
    ...require("../productData/RearBumperPlateAndSideBeeding.json"),
    ...require("../productData/SSTrunkGarnish.json"),
    ...require("../productData/WindowGarnish.json"),
  ],
  "CP": [
    ...require("../productData/CP.json"),
    ...require("../productData/Mix.json"),
  ],
  "CP KIT": [
    ...require("../productData/CPKit.json"),
  ],
  "BLK": [
    ...require("../productData/Blk.json"),
  ],
  "BLK KIT": [
    ...require("../productData/BlackKitCombo.json"),
  ],
  "DV": [
    ...require("../productData/DoorVisor.json"),
  ],
  "DVSSL": [
    ...require("../productData/DoorVisorSSLinning.json"),
  ],

}

async function addProductCategories() {
  const data = await models.ProductCategory.bulkCreate(ProductCategories);
  console.log(data);
}


async function addProducts() {
  const rows = await models.ProductCategory.findAll();
  const productCategories = rows.map((v) => v.get())
  let count = 0;
  for (let productCategory of productCategories) {
    const data = productCategoryToProductMap[productCategory.name];
    if (!!data) {
      const products = data.map((row) => {
        return {...row, productcategoryId: productCategory.id}
      })
      count += products.length;
      // console.log(products)
      await models.Product.bulkCreate(products)
    }
  }
  console.log(count)
}

// addProductCategories();
addProducts()
