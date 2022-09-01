const Version = require('sequelize-version');

module.exports = (sequelize, Sequelize) => {

    const CommentDocs = sequelize.define("commentDocs", {

     	createdBy: { type: Sequelize.INTEGER },
	    updatedBy: { type: Sequelize.INTEGER },
        taskId: { type: Sequelize.INTEGER },
        commentId: { type: Sequelize.INTEGER},
        fileName: { type: Sequelize.STRING },
        originalName: { type: Sequelize.STRING },
        docType: { type: Sequelize.STRING },
        canDelete :{type: Sequelize.BOOLEAN ,defaultValue:true },
	    }
    ,{
        freezeTableName: true
    });

        const commentDocsVersion = new Version(CommentDocs);

    return CommentDocs;

};
