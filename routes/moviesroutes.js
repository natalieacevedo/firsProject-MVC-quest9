const express = require('express');
const moviesRouter = require('express').Router();
moviesRouter.use(express.json());

const movie = require('../models/moviemodel');// not created quite yet

moviesRouter.get('/', (req, res) => {
    const { max_duration, color } = req.query;
    movie.findMany({ filters: { max_duration, color } })
        .then((movies) => { res.json(movies) })

    
        .catch((err) => {
            console.log(err);
            res.status(500).send('error retrieving movies from the database');
        });
    

});

   

module.exports = moviesRouter;