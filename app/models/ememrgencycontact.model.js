const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Ememrgencycontact = sequelize.define("ememrgencycontact", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
		employeeId: { type: Sequelize.STRING },
        firstName: { type: Sequelize.STRING },
	    lastName: { type: Sequelize.STRING },
	    prefix: { type: Sequelize.STRING },
	    mobile: { type: Sequelize.STRING },
	    address: { type: Sequelize.STRING ,set(value) {
            this.setDataValue('address', value.toLowerCase());
        }},
	    relatives: { type: Sequelize.STRING },
		canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });

		const ememrgencycontactVersion = new Version(Ememrgencycontact);

    return Ememrgencycontact;

};
