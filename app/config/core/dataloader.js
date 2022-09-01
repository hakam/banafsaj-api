const Utils = require('./utils')
const QueryField = require('./queryField')
const db = require('../../models')
const { QueryTypes } = require('sequelize');

const FilterHelper = require('./filter.helper')
const AggregateHelper = require('./aggrergateHelper')


class DataLoader {

    constructor(entity, queryExp) {

        if (typeof entity === 'string')
            this.entity = db.sequelize.models[entity]
        else
            this.entity = entity


        this.tableNameIndex = 0;
        this.MAXFETCHROWS = 99999999999999;
        this.resultQuery = '';
        this.whereSQl = '';
        this.parameters = [];
        this.groupSettings = null;
        /**
         * Map columns from DatabaseName to propertyName
         */
        this.dataBaseToPropertyMap = {};
        /**
        * List of target entity columns
        */
        this.queryFields = {};
        this.queryExp = Utils.loadOptionsParser(queryExp);
        this.tableName = this.entity.tableName;
        this.resultQuery = `SELECT * FROM ${this.tableName}`;
        this.initQueryFields();


    }

    initQueryFields() {
        Object.keys(this.entity.rawAttributes).forEach(col => {
            const { field, fieldName, type } = this.entity.rawAttributes[col]
            this.dataBaseToPropertyMap[field] = fieldName;
            this.queryFields[fieldName.toLowerCase()] = new QueryField(fieldName, field, type.toString());
        });
    }
    wrapQuery() {
        this.tableNameIndex++;
        this.lastWrappedTableName = `${this.tableName}_${this.tableNameIndex}`;
        this.resultQuery = `SELECT * FROM (${this.resultQuery}) as ${this.lastWrappedTableName}`;
    }
    prepareQueryForLastOperator(operator) {
        const lastOperatorPos = this.resultQuery.indexOf(operator);
        if (lastOperatorPos !== -1) {
            const lastBracketPos = this.resultQuery.indexOf(")");
            if ((lastBracketPos !== -1 && lastOperatorPos > lastBracketPos) || (lastBracketPos === -1)) {
                this.wrapQuery();
            }
        }
    }
    _selectImpl(expression, needQuotes = true) {
        if (!expression)
            return;
        const fields = [];
        if (typeof expression === 'string') {
            expression = expression.split(',');
        }
        if (Array.isArray(expression)) {
            if (needQuotes) {
                expression.forEach(filed => {
                    const qf = Utils.getQueryField(this.queryFields, filed);
                    fields.push(qf.databaseName);
                });
            }
            else {
                fields.push(...expression);
            }
        }
        if (fields.length) {
            if (this.resultQuery.indexOf('*') == 7) {
                this.resultQuery = this.resultQuery.replace('*', fields.join(','));
            }
            else {
                this.wrapQuery();
                this._selectImpl(expression);
            }
        }
    }


    async load() {

        const result = { data: [] }


        this.select(this.queryExp.select)
        this.filter(this.queryExp.filter)


        if (this.queryExp.totalSummary)
            result.summary = await this.GetTotalSummary(this.queryExp.totalSummary)

        if (this.queryExp.requireTotalCount)
            result.totalCount = await this.getCount()



        this.sort(this.queryExp.sort)

        if (this.queryExp.group) {
            this.Group(this.queryExp.group, this.queryExp.groupSummary, this.queryExp.skip, this.queryExp.take)
            if (this.queryExp.requireGroupCount) {
                result.groupCount = await this.GetGroupCount()
            }

        } else {
            this.skipTake(this.queryExp.skip, this.queryExp.take)
        }
        result.data = await this.getData()
        return result
    }

    async getData() {
        const data = await db.sequelize.query(this.resultQuery, {
            replacements: this.parameters,
            type: QueryTypes.SELECT
        })

        console.log(this.resultQuery);


        if (!this.groupSettings)
            return this.mappingDataResult(data)

        return AggregateHelper.GetGroupedDataFromQuery(data, this.groupSettings, this.dataBaseToPropertyMap, this.queryFields);

    }

    mappingDataResult(data) {

        if (!data || !data.length) return []

        const resultKeys = Object.keys(data[0])




        const mapedData = []
        for (let index = 0; index < data.length; index++) {
            const row = data[index];
            const mapedRow = {}
            resultKeys.forEach(key => {
                const column = this.queryFields[this.dataBaseToPropertyMap[key].toLowerCase()]
                if (column) {
                    const valueMap = column.createValueMap(row[key])
                    Object.assign(mapedRow, valueMap)
                } else {
                    Object.assign(mapedRow, { key: row[key] })
                }
            })
            mapedData.push(mapedRow)

        }
        return mapedData
    }

    select(selectExp) {
        if (selectExp === null && selectExp)
            this._selectImpl(selectExp);
        else
            this._selectImpl(selectExp);
        return this;
    }

    filter(filterExp) {
        if (!Array.isArray(filterExp)) return

        const fh = new FilterHelper(this.queryFields)
        const { sql, parameters } = fh.GetSqlExprByArray(filterExp)
        if (!sql)
            return
        this.prepareQueryForLastOperator('WHERE')
        this.whereSQl += ` WHERE ${sql}`
        this.resultQuery += this.whereSQl
        this.parameters = [...parameters]

        return this

    }

    skipTake(skip, take) {
        skip = skip || 0
        take = take || this.MAXFETCHROWS
        if (take > this.MAXFETCHROWS)
            throw `Max allowed ${this.MAXFETCHROWS} rows`
        this.resultQuery += ` LIMIT ${skip}, ${take}`
        return this;
    }
    sort(expression, needQuotes = true) {
        if (!expression) return

        let orderBy = ''
        if (typeof expression === 'string') {
            if (needQuotes)
                orderBy = Utils.getQueryField(this.queryFields, expression).databaseName
            else
                orderBy = expression
        }
        if (Array.isArray(expression)) {
            let fieldSet = AggregateHelper.GetFieldSetBySelectors(this.queryFields, expression);
            orderBy = fieldSet.sort;
        }
        if (orderBy.length) {
            this.prepareQueryForLastOperator('ORDER BY');
            this.resultQuery += ` ORDER BY ${orderBy}`
        }
        return this;
    }


    async getCount() {
        const countQuery = `SELECT COUNT(1) AS "totalCount" FROM (${this.resultQuery}) ${this.tableName}_${this.tableNameIndex + 1}`
        const data = await db.sequelize.query(countQuery, {
            replacements: this.parameters,
            type: QueryTypes.SELECT
        })
        return data[0].totalCount
    }


    async GetTotalSummary(expression) {

        if (!Array.isArray(expression)) return null

        const summaryInfo = AggregateHelper.GetSummaryInfo(this.queryFields, expression);

        if (!summaryInfo.fields) return null

        const totalSummaryQuery = `SELECT ${summaryInfo.fields} FROM ${this.tableName} ${this.whereSQl}`

        const queryResult = await db.sequelize.query(totalSummaryQuery, {
            replacements: this.parameters,
            type: QueryTypes.SELECT
        })


        return Object.values(queryResult[0])
    }


    _CreateGroupCountQuery(firstGroupField, skip = null, take = null) {
        const groupQuery = `SELECT COUNT(1) FROM ${this.tableName} ${this.whereSQl} GROUP BY ${firstGroupField}`
        this.groupSettings.groupItemCountQuery = `SELECT COUNT(1) FROM (${groupQuery}) ${this.tableName}_${this.tableNameIndex + 1} `
        if (typeof skip === 'number' || typeof take === 'number') {
            this.groupSettings.skip = !isNaN(+skip) ? +skip : 0
            this.groupSettings.take = !isNaN(+take) ? +take : this.MAXFETCHROWS
        }


    }
    Group(expression, groupSummary = null, skip = null, take = null) {


        if (!expression) return
        let groupFields = ''
        let sortFields = ''
        let selectFields = ''
        let lastGroupExpanded = true
        let groupCount = 0
        let selectExpression = ''
        let groupSummaryData = null
        let firstGroupField = ''

        if (typeof expression === 'string') {
            const columns = expression.split(',').map(f => { return Utils.getQueryField(this.queryFields, f).databaseName })
            groupCount = columns.length
            selectFields = sortFields = groupFields = columns.join(',')
            firstGroupField = columns[0]
        }
        if (Array.isArray(expression)) {
            groupCount = expression.length
            const fielsdSet = AggregateHelper.GetFieldSetBySelectors(this.queryFields, expression)
            groupFields = fielsdSet.group
            selectFields = fielsdSet.select
            sortFields = fielsdSet.sort
            firstGroupField = fielsdSet.firstGroupField
            lastGroupExpanded = AggregateHelper.IsLastGroupExpanded(expression)
        }
        if (groupCount > 0) {
            if (!lastGroupExpanded) {
                groupSummaryData = Array.isArray(groupSummary) ? AggregateHelper.GetSummaryInfo(this.queryFields, groupSummary) : null
                selectExpression = `${selectFields.length ? selectFields : groupFields} , COUNT(1)`;
                selectExpression += (groupSummaryData && groupSummaryData.fields.length) ? `,${groupSummaryData.fields}` : ''
                groupCount++;
                this.wrapQuery()
                this._selectImpl(selectExpression, false)
                this.resultQuery += ` GROUP BY ${groupFields}`
                this.sort(sortFields, false)


            } else {
                this.wrapQuery()
                selectExpression = `${selectFields}, ${this.lastWrappedTableName}.*`
                this._selectImpl(selectExpression, false)
                this.resultQuery += ` ORDER BY ${sortFields} `
            }

            this.groupSettings = {
                groupCount,
                lastGroupExpanded,
                summaryTypes: !lastGroupExpanded && groupSummaryData ? groupSummaryData.summaryTypes : null,
                skip: skip,
                take: take
            }
            this._CreateGroupCountQuery(firstGroupField, skip, take)

            if (groupCount - (lastGroupExpanded ? 0 : 1) === 1) {
                this.skipTake(skip, take)

            }
        }
    }

    async GetGroupCount() {
        if (!this.groupSettings || !this.groupSettings.groupItemCountQuery)
            return null
        const result = await this.repository.query(this.groupSettings.groupItemCountQuery, this.parameters)
        return Object.values(result[0])[0]
    }

}


module.exports = DataLoader;