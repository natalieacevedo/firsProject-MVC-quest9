const moviesRouter = require('./moviesroutes');


const setUpRoutes = (app) => {

    app.use('/api/movies', moviesRouter);
};

module.exports = { setUpRoutes };