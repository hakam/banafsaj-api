'use strict';

const dbConfig = require("../config/db.config.js");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  timezone: '+03:00',

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;

db.Sequelize = Sequelize;

db.distributionRequest.hasMany(db.distributionRequestItems, { as: 'items', foreignKey: 'purchaseorderId' });
db.distributionRequestItems.belongsTo(db.distributionRequest);
db.purchaseorder.hasMany(db.purchase_order_items, { as: 'items', foreignKey: 'purchaseorderId' });
db.purchase_order_items.belongsTo(db.purchaseorder);
// db.ltaRequest.hasMany(db.ltaRequest_request_items, { as: 'items', foreignKey: 'ltaId' });
// db.ltaRequest_request_items.belongsTo(db.ltaRequest);
db.purchaserequest.hasMany(db.purchase_request_items, { as: 'items', foreignKey: 'purchaserequestId' });
db.purchase_request_items.belongsTo(db.purchaserequest);
db.projectstatus.hasMany(db.projects);
db.projects.belongsTo(db.projectstatus, { through: 'statusId' });
db.coreMenuItem.belongsToMany(db.coreMenuItem, { as: 'Children', through: 'parentId' })
db.tasks.hasMany(db.tasktags);
db.tasktags.belongsTo(db.tasks);



module.exports = db
