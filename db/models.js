/**
 * Created by bhavyaagg on 29/12/17.
 */

let config;

try {
  config = require('./../secrets');
} catch (e) {
  config = require('./../secrets-sample');
  console.log("Create your own secrets");
}

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.NAME, config.db.USER, config.db.PASSWORD, {
  host: config.db.HOST,
  dialect: config.db.DIALECT,
  pool: {
    max: 5,
    min: 0
  },
  storage: config.db.STORAGE
});

const ProductCategory = sequelize.define('productcategory', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING
});

const Product = sequelize.define('product', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  price: Sequelize.DataTypes.DECIMAL
});

Product.belongsTo(ProductCategory);
ProductCategory.hasMany(Product);


const PartyMaster = sequelize.define('partymaster', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  destination: Sequelize.DataTypes.STRING,
  marka: Sequelize.DataTypes.STRING,
  openingBalance: Sequelize.DataTypes.DECIMAL,
  openingBalanceDate: Sequelize.DataTypes.DATEONLY,
  transport: Sequelize.DataTypes.STRING,
  discount: Sequelize.DataTypes.DECIMAL,
  splDiscount: Sequelize.DataTypes.DECIMAL,
  cd: Sequelize.DataTypes.DECIMAL
});

const Invoice = sequelize.define('invoice', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  cases: Sequelize.DataTypes.INTEGER,
  dateOfInvoice: Sequelize.DataTypes.DATEONLY,
  bilityNo: Sequelize.DataTypes.STRING,
  biltyDate: Sequelize.DataTypes.DATEONLY,
  chalanNo: Sequelize.DataTypes.STRING,
  chalanDate: Sequelize.DataTypes.DATEONLY,
  grandTotal: Sequelize.DataTypes.INTEGER
});


Invoice.belongsTo(PartyMaster);
PartyMaster.hasMany(Invoice);

Invoice.belongsTo(ProductCategory);
ProductCategory.hasMany(Invoice);

const InvoiceDetail = sequelize.define('invoicedetail', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  qty: Sequelize.DataTypes.DECIMAL,
  unitType: Sequelize.DataTypes.STRING
});

InvoiceDetail.belongsTo(Invoice);
Invoice.hasMany(InvoiceDetail);


InvoiceDetail.belongsTo(Product);
Product.hasMany(InvoiceDetail);

const Ledger = sequelize.define('ledger', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  description: Sequelize.DataTypes.STRING,
  dateOfTransaction: Sequelize.DataTypes.DATE,
  debit: {type: Sequelize.DataTypes.DECIMAL, allowNull: true},
  credit: {type: Sequelize.DataTypes.DECIMAL, allowNull: true},
  balance: Sequelize.DataTypes.DECIMAL,
  productCategoryName: Sequelize.DataTypes.STRING
});

sequelize.sync({force: false}).then(function () {
  console.log("Database Configured");
});

module.exports = {
  ProductCategory,
  Product,
  PartyMaster,
  Invoice,
  InvoiceDetail,
  Ledger
};