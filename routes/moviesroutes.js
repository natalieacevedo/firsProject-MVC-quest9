const express = require('express');
const moviesRouter = require('express').Router();
moviesRouter.use(express.json());
const Joi = require('joi');

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

moviesRouter.get('/:id', (req, res) => {
    const movieId = req.params.id;
    movie.getThatMovie(movieId)
        .then((movie) => { res.json(movie) })
    
        .catch((err) => {
            console.log(err);
            res.status(500).send('sorry sweetie, could not find that movie');
        })
});
   
//route that post new movie
moviesRouter.post('/', (req, res) => {
    
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
        movie.postThatMovie( title, director, year, color, duration )
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

//ROUTE THAT ALTERS MOVIE(PUT);

moviesRouter.put('/:id', (req, res) => {
    
    
    const id = req.params.id;
    const body = req.body;

    console.log(movie.alterMovie(body, id))

   const validationErrors  = Joi.object({
                title: Joi.string().max(255),
                director: Joi.string().max(255),
                year: Joi.number().integer().min(1888),
                color: Joi.boolean(),
                duration: Joi.number().integer().min(1),
              }).validate(req.body, { abortEarly: false }).error;
              
    if (validationErrors) {
        return Promise.reject('INVALID_DATA')
    
    } else {
        if (movie.alterMovie(body, id) === 'RECORD_NOT_FOUND') {
            res.status(404).send(`Movie with id ${id} not found.`);
       
        } else {
            movie.alterMovie(body, id)
                .then(result => {
                res.status(200).json({ ...result, ...req.body });
            })
        }
    }

})








//module.exports = moviesRouter;

module.exports = {
    moviesRouter,
   

}