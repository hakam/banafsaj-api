const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Timeattendance = sequelize.define("timeattendance", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        department: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        no: { type: Sequelize.INTEGER },
        dateTime:{ type: Sequelize.DATE },
        status:{ type: Sequelize.STRING },
        locationId: { type: Sequelize.INTEGER },
        idNumber: { type: Sequelize.STRING,set(value) {
            this.setDataValue('idNumber', value.toLowerCase());
        }  },
        workcode: { type: Sequelize.STRING },
        verifyCode:{ type: Sequelize.STRING },
        cardNo: { type: Sequelize.INTEGER },
        updateReason:{ type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });
    const timeattendanceVersion = new Version(Timeattendance);

    return Timeattendance;

};
