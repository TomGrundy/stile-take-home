import { Request, Response } from 'express';
import { testResultSchemaValidate } from '../Models/testResult';
import importXmlCreate from '../Services/importXml';

export const importXml = async (req: Request, res: Response) => {
    const resultsToInsert = [];
    for (const testResult of (req?.body?.['mcq-test-results']?.['mcq-test-result'] ?? [])) {
        const data = {
            dateScanned: testResult?.['$']?.['scanned-on'],
            firstName: testResult?.['first-name']?.[0],
            lastName: testResult?.['last-name']?.[0],
            studentNumber: testResult?.['student-number']?.[0],
            summaryMarksAvailable: testResult?.['summary-marks']?.[0]?.['$']?.available,
            summaryMarksObtained: testResult?.['summary-marks']?.[0]?.['$']?.obtained,
            testId: testResult?.['test-id']?.[0]
        };

        const { error, value } = testResultSchemaValidate.validate(data);

        // If any items fail validation, early return, error out and don't store any prior results.
        if (error) {
            // 418: I'm a teapot. Is that the right http response error code to make the printer print?
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
            return res.status(418).send(error.message);
        } 
        resultsToInsert.push(value);
    }
    if (resultsToInsert) {
        for (const result of resultsToInsert) {
            await importXmlCreate(result);
        }
    }
    return res.status(201).send();
};