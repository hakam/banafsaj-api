const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Lta_contract_item = sequelize.define("lta_contract_item", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        prNo: { type: Sequelize.STRING },
        prId: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        unit: { type: Sequelize.STRING },
        quantity: { type: Sequelize.INTEGER },
        price: { type: Sequelize.DOUBLE },
        currency: { type: Sequelize.STRING },
        ltaId: { type: Sequelize.INTEGER },
       }
    ,{
        freezeTableName: true
    });
    const lta_contract_itemVersion = new Version(Lta_contract_item);

    return Lta_contract_item;

};
