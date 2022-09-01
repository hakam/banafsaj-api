const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Committee = sequelize.define("committee", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }},
        des: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }},
        type: { type: Sequelize.STRING },
        hoc: { type: Sequelize.INTEGER },
        CommitteeIds: { type: Sequelize.STRING },
        startDate: { type: Sequelize.DATEONLY },
        inDate: { type: Sequelize.DATEONLY },
        prId: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
       
    }
    ,{
        freezeTableName: true
    });

        const committeeVersion = new Version(Committee);

    return Committee;

};
