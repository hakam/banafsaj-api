const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Paymentrequest = sequelize.define("paymentrequest", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        prId: { type: Sequelize.INTEGER },
        projectId: { type: Sequelize.INTEGER },
        poId: { type: Sequelize.INTEGER },
        prTypeId: { type: Sequelize.INTEGER},
        vendorId: { type: Sequelize.INTEGER },
        total: { type: Sequelize.DOUBLE,defaultValue:0 },
        totalPayment: { type: Sequelize.DOUBLE ,defaultValue:0},
        expenseDescription: { type: Sequelize.STRING },
        dateOfRequest : { type: Sequelize.DATEONLY },
        dueDate : { type: Sequelize.DATEONLY },
        paymentMethod : { type: Sequelize.STRING },
        invoiceNo:  { type: Sequelize.STRING },
        requesterId: { type: Sequelize.INTEGER },
        requesterDate:{ type: Sequelize.DATE },
        pmId: { type: Sequelize.INTEGER },
        pmDate:{ type: Sequelize.DATE },
        fiId: { type: Sequelize.INTEGER },
        fiDate:{ type: Sequelize.DATE },
        ceoId: { type: Sequelize.INTEGER },
        ceoDate:{ type: Sequelize.DATE },
        advancePayment: { type: Sequelize.BOOLEAN ,defaultValue:false },
    }
    ,{
        freezeTableName: true
    });
    const paymentrequestVersion = new Version(Paymentrequest);

    return Paymentrequest;

};
