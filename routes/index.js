const moviesRouter = require('./moviesroutes');


const setUpRoutes = (app) => {

    app.use('/api/movies', moviesRouter.moviesRouter);
};

const setUpNumber = (app) => {
    app.use('/api/movies', moviesRouter.moviesNumber)
};

const postingTheMovie = (app) => {
    app.use('/api/movies',moviesRouter.postingMovies )
}


module.exports = { setUpRoutes, setUpNumber, postingTheMovie};