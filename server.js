//importing express
import express from 'express';

// setting the port
const PORT = process.env.PORT || 3000;

// creatng the express app instance
const app = express();

//setting up the router
const router = express.router();

//making the public folder our static directory
app.use.apply(express.static(`${__dirname}/public`));

//send all request through the router
app.use(router);

//listening on the port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
