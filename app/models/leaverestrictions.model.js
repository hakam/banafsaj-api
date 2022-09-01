const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Leaverestrictions = sequelize.define("leaverestrictions", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        exceedbalance: { type: Sequelize.INTEGER },
        inadvancedays: { type: Sequelize.INTEGER },
        minimumGap: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
      
	    }
    ,{
        freezeTableName: true
    });
    const leaverestrictionsVersion = new Version(Leaverestrictions);

    return Leaverestrictions;

};
