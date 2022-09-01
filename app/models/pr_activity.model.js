const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {
    
const Practivity = sequelize.define("practivity", {

    createdBy: { type: Sequelize.INTEGER },
   updatedBy: { type: Sequelize.INTEGER },
   name : { type: Sequelize.STRING },
   des: { type: Sequelize.STRING },
   canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
  
}
,{
   freezeTableName: true
});
const practivityVersion = new Version(Practivity);

return Practivity;

};
