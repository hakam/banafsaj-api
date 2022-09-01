const { Op } = require("sequelize");

class FilterHelper {


    GetSqlExprByArray(expression) {
        //[["employeeId","=",null],"or",["officeId","=",5].........]
        let where = {}

        let prevItemWasArray = false;
        for (let index = 0; index < expression.length; index++) {
            const item = expression[index];
            if (typeof item === 'string') {
                prevItemWasArray = false;
                if (index == 0) {
                    /* if (`${item}`.trim() == "!") {
                         sql += 'NOT';
                         continue;
                     }*/
                    if (Array.isArray(expression)) {
                        const cond = this._GetSimpleSqlExpr(expression)
                        where[Object.keys(cond)[0]] = Object.values(cond)[0]

                    }
                    //{ name: { [Symbol(eq)]: 'hakam' } }

                    break;
                }
                const strItem = `${item}`.trim().toUpperCase();
                if (strItem == 'AND' || strItem == 'OR') {
                    index++
                    if (strItem == 'OR') {
                
                        if (!where[Op.or])
                            where[Op.or] = []

                
                        where[Op.or].push(this.GetSqlExprByArray(expression[index]))

                        console.log({ where });


                    }
                    else {

                        // where[Op.and] = [this.GetSqlExprByArray(expression[index])]

// ayman1978sy@gmail.com
// Ayman-Alahmad
                    }
                }
                continue;
            }
            if (Array.isArray(item)) {
                if (prevItemWasArray) {
                    // where[Op.and] = [this.GetSqlExprByArray(item)]
                } else {
                    /// ?????????????????
                    //   where[Op.and] = this.GetSqlExprByArray(item)
                    const cond = this._GetSimpleSqlExpr(item)

                    where[Object.keys(cond)[0]] = Object.values(cond)[0]

                }
                // sql += this.GetSqlExprByArray(item).sql;
                prevItemWasArray = true;
            }
        }

        return where;
    }

    _GetSimpleSqlExpr(expression) {

        //     name  = hakam
        // createDate.year = 2019


        //  authorId: {
        //  [Op.eq]: 2
        //}


        const itemsCount = expression.length;

        const fieldName = expression[0];
        if (itemsCount == 2) {
            if (!expression[1]) {
                return { [fieldName]: { [Op.is]: null } }

            }
            else {
                return { [fieldName]: { [Op.eq]: expression[1] } }
            }
        }
        else if (itemsCount == 3) {
            let clause = expression[1].trim();
            const val = expression[2];
            if (val == 'NULL' || val === null || val === 'null') {
                switch (clause) {
                    case "=": {
                        // result = `${fieldName} IS NULL`;
                        // break;
                        return { [fieldName]: { [Op.is]: null } }
                    }
                    case "<>":
                    case "!=": {
                        //  result = `${fieldName} IS NOT NULL`;
                        //  break;
                        return { [fieldName]: { [Op.not]: null } }
                    }
                }
            }
            else {
                switch (clause) {
                    case "=":
                        return { [fieldName]: { [Op.eq]: val } }
                    case "!=":
                    case "<>":
                        return { [fieldName]: { [Op.ne]: val } }
                    case ">":
                        return { [fieldName]: { [Op.gt]: val } }
                    case ">=":
                        return { [fieldName]: { [Op.gte]: val } }

                    case "<":
                        return { [fieldName]: { [Op.lt]: val } }
                    case "<=": return { [fieldName]: { [Op.lte]: val } }
                    case "startswith":
                        return { [fieldName]: { [Op.startsWith]: val } }


                    case "endswith":
                        return { [fieldName]: { [Op.endsWith]: val } }

                    case "contains":
                        return { [fieldName]: { [Op.like]: '%' + val + '%' } }
                    case "notcontains":
                        return { [fieldName]: { [Op.notLike]: '%' + val + '%' } }
                    default: {
                        return null;
                    }
                }
            }
        }

    }





}
exports.FilterHelper = FilterHelper;