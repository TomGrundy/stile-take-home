import express from "express";
import { aggregate } from "../Controllers/aggregate";
import { importXml } from "../Controllers/importXml";

export const router = express.Router();

router.post('/import', importXml);
router.get('/results/:testId/aggregate', aggregate);