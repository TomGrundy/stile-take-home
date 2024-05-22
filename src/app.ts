import express from 'express';
import xmlparser from 'express-xml-bodyparser';
import { router } from './Routes/router';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
xmlparser.regexp = /text\/xml\+markr/i;
app.use(xmlparser());

// Routes
app.use('/', router);

export default app;