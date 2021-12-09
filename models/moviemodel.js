const connection = require('../db-config');

const Joi = require('joi');
const { json } = require('express');

const db = connection.promise();


//THIS FUNCTION IS FOR THE QUERY PARAMETERS OF COLOR AND MAX DURATION, THE ONE FROM THE EXAMPLE

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


//NOW OFF TO THE BIG CHALLENGE, LOGIG TO THE GET MOVIE NUMBER

function getThatMovie(id) {
    
    const sql = 'select * from movies where id = ?';

    console.log(id, sql);

    return db.query(sql, [parseInt(id)]).then(([results])=> results);

};

//NOW THE POST..QUE MIEDO..LET'S SEE IF I CAN DO IT:

 async function postThatMovie({ title, director, year, color, duration }) {
    
    try {
        const results = await db.query('insert into movies (title, director, year, color, duration) values(?, ?, ?, ?, ?)', [title, director, year, color, duration]);
        return results
    
    }
    catch(error) {
        console.log(error);
        return error
        
     }
   
};



module.exports = {

    findMany,
    getThatMovie,
    postThatMovie
}