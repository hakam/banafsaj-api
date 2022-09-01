const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const CoreMenuItem = sequelize.define("coreMenuItem", {

        createdBy: { type: Sequelize.INTEGER },
        updatedBy: { type: Sequelize.INTEGER },
        title: { type: Sequelize.STRING },
        url: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },// 'section' | 'collapsible' | 'item'
        role: { type: Sequelize.STRING },
        translate: { type: Sequelize.STRING },
        icon: { type: Sequelize.STRING },
        disabled: { type: Sequelize.INTEGER },
        hidden: { type: Sequelize.INTEGER },
        classes: { type: Sequelize.STRING },
        exactMatch: { type: Sequelize.STRING },
        externalUrl: { type: Sequelize.STRING },
        openInNewTab: { type: Sequelize.STRING },
        parentId: { type: Sequelize.INTEGER },
        orderList: { type: Sequelize.INTEGER ,defaultValue:0},
        pathView: { type: Sequelize.STRING },
    

    }
        , {
            freezeTableName: true
        });
        const CoreMenuItemVersion = new Version(CoreMenuItem);

    return CoreMenuItem;

};
