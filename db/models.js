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
  openingBalance: Sequelize.DataTypes.INTEGER,
  openingBalanceDate: Sequelize.DataTypes.DATEONLY,
  transport: Sequelize.DataTypes.STRING,
  discount: Sequelize.DataTypes.INTEGER,
  splDiscount: Sequelize.DataTypes.INTEGER,
  cd: Sequelize.DataTypes.INTEGER
});

sequelize.sync({force: false}).then(function () {
  console.log("Database Configured");
});

module.exports = {
  ProductCategory,
  Product,
  PartyMaster
};