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
  openingBalanceDate: Sequelize.DataTypes.DATE,
  transport: Sequelize.DataTypes.STRING,
  discount: Sequelize.DataTypes.DECIMAL,
  splDiscount: Sequelize.DataTypes.DECIMAL,
  cd: Sequelize.DataTypes.DECIMAL
});

const Ledger = sequelize.define('ledger', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  description: Sequelize.DataTypes.STRING,
  dateOfTransaction: Sequelize.DataTypes.DATE,
  debit: {type: Sequelize.DataTypes.DECIMAL, allowNull: true},
  credit: {type: Sequelize.DataTypes.DECIMAL, allowNull: true},
  balance: Sequelize.DataTypes.DECIMAL
});

sequelize.sync({force: false}).then(function () {
  console.log("Database Configured");
});

module.exports = {
  ProductCategory,
  Product,
  PartyMaster
};