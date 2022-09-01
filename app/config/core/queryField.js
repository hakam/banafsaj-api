

class QueryField {
    constructor(propertyName, databaseName,  type) {

        this.propertyName = propertyName;
        this.databaseName = databaseName;
        this.type = type;
    }
    escape(columnName) {
        return "\"" + columnName + "\"";
    }
    /**
     * Prepares value get from dataBase.
     */
    prepareGetValue(value) {

        if (this.type === Boolean) {
            value = !!value;
        }
        else if (this.type === "DATETIME") {
            value = new Date(value)
        }

        return value;
    }

    createValueMap(value) {
        return {
            [this.propertyName]: this.prepareGetValue(value)
        };
    }
}
module.exports = QueryField;