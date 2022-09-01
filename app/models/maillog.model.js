const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Maillog = sequelize.define("maillog", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        accepted: { type: Sequelize.STRING },		
        rejected: { type: Sequelize.STRING },		
        response: { type: Sequelize.STRING },		
        messageId: { type: Sequelize.STRING },		
        envelopeFrom: { type: Sequelize.STRING },		
        envelopeTo: { type: Sequelize.STRING },	
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },	

    }
    ,{
        freezeTableName: true
    });
    const maillogVersion = new Version(Maillog);

    return Maillog;

};
