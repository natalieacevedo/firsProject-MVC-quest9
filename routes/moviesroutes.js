const express = require('express');
const moviesRouter = require('express').Router();
moviesRouter.use(express.json());
const Joi = require('joi');
//I think this is redundant, I am gonna do it like this and then refactor/////////////////
const moviesNumber = require('express').Router();
moviesNumber.use(express.json());
///////////////////////////////////////////////////////////////

//////being redundant again out of ignorance:////////////////////////////
const postingMovies = require('express').Router();
postingMovies.use(express.json());
///////////////////////////////////////////////////////////////

const movie = require('../models/moviemodel');

moviesRouter.get('/', (req, res) => {
    const { max_duration, color } = req.query;
    movie.findMany({ filters: { max_duration, color } })
        .then((movies) => { res.json(movies) })

    
        .catch((err) => {
            console.log(err);
            res.status(500).send('error retrieving movies from the database');
        });
    

});

//NOW THE ROUTE THAT GETS THE MOVIE NUMBER

moviesNumber.get('/:id', (req, res) => {
    const movieId = req.params.id;
    movie.getThatMovie(movieId)
        .then((movie) => { res.json(movie) })
    
        .catch((err) => {
            console.log(err);
            res.status(500).send('sorry sweetie, could not find that movie');
        })
});
   

postingMovies.post('/', (req, res) => {
    
    const { title, director, year, color, duration } = req.body;

    const { error } = Joi.object({
            title: Joi.string().max(255).required(),
            director: Joi.string().max(255).required(),
            year: Joi.number().integer().min(1888).required(),
            color: Joi.boolean().required(),
            duration: Joi.number().integer().min(1).required(),
          }).validate(
            { title, director, year, color, duration },
            { abortEarly: false }
          );
        
    if (error) {
        res.status(422).json({ validationErrors: error.details });
    }
    else {
        console.log(req.body);
      // console.log(res.body);
        movie.postThatMovie({ title, director, year, color, duration })
        .then((novaMovie) => {
            console.log(novaMovie[0].insertId);
        let id = novaMovie[0].insertId;// dont know how to see results
        if (id) {
            res.json({id:id, title:title, director: director, year: year, color: color, duration: duration})
        }

       
    })

    .catch((err) => {
        console.log(err);
        res.status(500).send('error saving that movie');

    })

}

})

//module.exports = moviesRouter;

module.exports = {
    moviesRouter,
    moviesNumber,
    postingMovies

}