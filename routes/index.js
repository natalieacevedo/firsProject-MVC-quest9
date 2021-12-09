const movies = require('./moviesroutes');


const setUpRoutes = (app) => {

    app.use('/api/movies', movies.moviesRouter);
    

};



module.exports = { setUpRoutes };