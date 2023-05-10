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
  balance: {type: Sequelize.DataTypes.DECIMAL, allowNull: true},
  isLocal: {type: Sequelize.DataTypes.BOOLEAN}
});

const PartyMasterProductCategoryDiscount = sequelize.define('partymasterproductcategorydiscount', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  discount: Sequelize.DataTypes.DECIMAL,
  splDiscount: Sequelize.DataTypes.DECIMAL
});

PartyMasterProductCategoryDiscount.belongsTo(PartyMaster);
PartyMaster.hasMany(PartyMasterProductCategoryDiscount);

PartyMasterProductCategoryDiscount.belongsTo(ProductCategory);
ProductCategory.hasMany(PartyMasterProductCategoryDiscount);

const Invoice = sequelize.define('invoice', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  cases: Sequelize.DataTypes.STRING,
  dateOfInvoice: Sequelize.DataTypes.DATEONLY,
  marka: Sequelize.DataTypes.STRING,
  bilityNo: Sequelize.DataTypes.STRING,
  bilityDate: {type: Sequelize.DataTypes.DATEONLY, allowNull: true},
  chalanNo: Sequelize.DataTypes.STRING,
  chalanDate: Sequelize.DataTypes.DATEONLY,
  grandTotal: Sequelize.DataTypes.DECIMAL
});

Invoice.belongsTo(PartyMaster);
PartyMaster.hasMany(Invoice);

const InvoiceDetail = sequelize.define('invoicedetail', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  qty: Sequelize.DataTypes.DECIMAL,
  price: Sequelize.DataTypes.DECIMAL,
  unitType: Sequelize.DataTypes.STRING
});

InvoiceDetail.belongsTo(Invoice);
Invoice.hasMany(InvoiceDetail);

InvoiceDetail.belongsTo(Product);
Product.hasMany(InvoiceDetail);

const Ledger = sequelize.define('ledger', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  description: Sequelize.DataTypes.STRING,
  dateOfTransaction: Sequelize.DataTypes.DATEONLY,
  debit: {type: Sequelize.DataTypes.DECIMAL, allowNull: true},
  credit: {type: Sequelize.DataTypes.DECIMAL, allowNull: true},
  balance: Sequelize.DataTypes.DECIMAL,
  invoiceId: {type: Sequelize.DataTypes.INTEGER, allowNull: true}
});

Ledger.belongsTo(PartyMaster);
PartyMaster.hasMany(Ledger);
sequelize.sync({force: false}).then(function () {
  console.log("Database Configured");
});

module.exports = {
  ProductCategory,
  Product,
  PartyMaster,
  Invoice,
  InvoiceDetail,
  Ledger,
  PartyMasterProductCategoryDiscount,
  sequelize
};