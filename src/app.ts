import express from 'express';
import xmlparser from 'express-xml-bodyparser';
import { router } from './Routes/router';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// This has the effect of only having us accept xml if it's with the header mentioned
// in the test data, but if the client wants it some other way, tell 'em to put in a 
// ticket for it.
xmlparser.regexp = /text\/xml\+markr/i;
app.use(xmlparser());

// Routes
app.use('/', router);

export default app;