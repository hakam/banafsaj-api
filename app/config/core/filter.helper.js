
const Utils = require("./utils");
class FilterHelper {
    constructor(queryFields) {
        this.queryFields = queryFields;
        this.parameters = [];
    }
    setParameter(value) {
        this.parameters.push(value);
        return '?'
    }
    GetSqlExprByArray(expression) {
        let sql = "(";
        let prevItemWasArray = false;
        for (let index = 0; index < expression.length; index++) {
            const item = expression[index];
            if (typeof item === 'string') {
                prevItemWasArray = false;
                if (index == 0) {
                    if (`${item}`.trim() == "!") {
                        sql += 'NOT';
                        continue;
                    }
                    sql += (Array.isArray(expression)) ? this._GetSimpleSqlExpr(expression) : "";
                    break;
                }
                const strItem = `${item}`.trim().toUpperCase();
                if (strItem == 'AND' || strItem == 'OR') {
                    sql += ` ${strItem} `;
                }
                continue;
            }
            if (Array.isArray(item)) {
                if (prevItemWasArray) {
                    sql += ' AND ';
                }
                sql += this.GetSqlExprByArray(item).sql;
                prevItemWasArray = true;
            }
        }
        sql += ")";
        sql = sql === "()" ? '' : sql;
        return { sql, parameters: this.parameters };
    }
    _GetSimpleSqlExpr(expression) {
        let result = "";
        const itemsCount = expression.length;
        const queryfield = Utils.getQueryField(this.queryFields, expression[0].split('.')[0]);
        const fieldName = this._GetSqlFieldName(expression[0]);
        if (itemsCount == 2) {
            if (!expression[1]) {
                result = `${fieldName} IS NULL`;
            }
            else {
                result = `${fieldName} =  ${this.setParameter(queryfield.prepareGetValue(expression[1]))}`;
            }
        }
        else if (itemsCount == 3) {
            let clause = expression[1].trim();
            const val = queryfield.prepareGetValue(expression[2]);
            if (val == 'NULL' || val === null || val === 'null') {
                switch (clause) {
                    case "=": {
                        result = `${fieldName} IS NULL`;
                        break;
                    }
                    case "<>":
                    case "!=": {
                        result = `${fieldName} IS NOT NULL`;
                        break;
                    }
                }
            }
            else {
                switch (clause) {
                    case "=":
                    case "!=":
                    case "<>":
                    case ">":
                    case ">=":
                    case "<":
                    case "<=": {
                        result = `${fieldName} ${clause} ${this.setParameter(val)}`;
                        break;
                    }
                    case "startsWith": {
                        result = `${fieldName} LIKE ${this.setParameter(val + '%')}`;
                        break;
                    }
                    case "endsWith": {
                        result = `${fieldName} LIKE ${this.setParameter('%' + val)}`;
                        break;
                    }
                    case "contains": {
                        result = `${fieldName} LIKE ${this.setParameter('%' + val + '%')}`;
                        break;
                    }
                    case "notContains": {
                        result = `${fieldName} NOT LIKE ${this.setParameter('%' + val + '%')}`;
                        break;
                    }
                    case "containsId": {
                        result = `FIND_IN_SET (${this.setParameter(val)},${fieldName})>0 `;
                        break;
                    }
                    default: {
                        throw 'this command not supported in filter'
                    }
                }
            }
        }
        return result;
    }
    _GetSqlFieldName(field) {
        const fieldParts = field.split('.');
        const queryField = Utils.getQueryField(this.queryFields, field);
        // validate column name 
        if (!queryField) {
            throw new errors_1.BadRequestError(`Field "${field}" is not supported in this query.`);
        }
        if (fieldParts.length == 2) {
            const dateProperty = fieldParts[1];
            return Utils.getFieldNameByInterval(dateProperty, queryField.databaseName);
        }
        else {
            return queryField.databaseName;
        }
    }
}
module.exports = FilterHelper;