const connection = require('../db-config');

const Joi = require('joi');

const db = connection.promise();

const findMany = ({ filters: { max_duration, color } }) => {

    let sql = 'select * from movies';

    const sqlValues = [];

    if (color) {
        sqlValues.push(color);
        sql += ' where color = ?';
    }
    if (max_duration) {
        console.log(max_duration);
        if (color) {
           
            sql += ' and duration <= ?';

        } else {
            sql += ' where duration <= ?';
        }
        
        sqlValues.push(parseInt(max_duration));
    }

    console.log(sql, sqlValues);
    return db.query(sql, sqlValues).then(([results]) => results);


};

module.exports = {

    findMany
}