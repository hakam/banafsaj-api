const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const Goodreceviednote = sequelize.define("goodreceviednote", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        prId :     { type: Sequelize.INTEGER },
        poId :     { type: Sequelize.INTEGER },
        projectId :{ type: Sequelize.INTEGER },
        lineItem : { type: Sequelize.STRING },
        description : { type: Sequelize.STRING },
        unit :     { type: Sequelize.STRING },
        quantity : { type: Sequelize.STRING },
        itemId :   { type: Sequelize.INTEGER },
        quantityr : { type: Sequelize.INTEGER },
        quality :   { type: Sequelize.STRING },
        comment :   { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
        classType:   { type: Sequelize.STRING },
        groupId:   { type: Sequelize.INTEGER },
        assetType:   { type: Sequelize.INTEGER },
        vendorId:   { type: Sequelize.INTEGER },
    }
    ,{
        freezeTableName: true
    });
    Goodreceviednote.beforeCreate((goodreceviednote) => {
        if(goodreceviednote.description)
        goodreceviednote.description = goodreceviednote.description.toLowerCase();
        return goodreceviednote
        });
        const goodreceviednoteVersion = new Version(Goodreceviednote);

    return Goodreceviednote;

};
