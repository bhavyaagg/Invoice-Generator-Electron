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

const PartyMaster = sequelize.define('partymaster', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  destination:Sequelize.DataTypes.STRING,
  marka:Sequelize.DataTypes.STRING,
  openingbalance: Sequelize.DataTypes.INTEGER,
  openingbalancedate: Sequelize.DataTypes.DATEONLY,
  transport: Sequelize.DataTypes.STRING,
  discount: Sequelize.DataTypes.INTEGER,
  spldiscount: Sequelize.DataTypes.INTEGER,
  cd: Sequelize.DataTypes.INTEGER
});
sequelize.sync({force: true}).then(function () {
  console.log("Database Configured");
});

module.exports = {
  ProductCategory,
  PartyMaster
};