const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Donor = sequelize.define("donor", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		name : { type: Sequelize.STRING ,set(value) {
            this.setDataValue('name', value.toLowerCase());
        }},
        contactName : { type: Sequelize.STRING ,},
        contactPosition : { type: Sequelize.STRING },
        contactPhone : { type: Sequelize.STRING },
        contactMail : { type: Sequelize.STRING ,set(value) {
            this.setDataValue('contactMail', value.toLowerCase());
        }},
        policy :{type: Sequelize.BOOLEAN ,defaultValue:false },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },




       
    }
    ,{
        freezeTableName: true
    });
        const donorVersion = new Version(Donor);

    return Donor;

};
