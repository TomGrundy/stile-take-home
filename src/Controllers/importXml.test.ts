import request from 'supertest';
import importXmlCreate from '../Services/importXml';
import app from '../app';
import { testXmlMessedUpResult, testXmlOneResult } from "./testUtils";

jest.mock('../Services/importXml', () => jest.fn());
const mockedImportXmlCreate = importXmlCreate as jest.Mock;

describe('importXml controller', () => {
    it('Should correctly validate and store properly formed data', async () => {
        const mockedJestFn = jest.fn();
        mockedImportXmlCreate.mockImplementation(mockedJestFn);
        const res = await request(app).post('/import')
            .set({'Content-Type': 'text/xml+markr'})
            .send(testXmlOneResult);

        expect(res.statusCode).toBe(201);
        expect(mockedJestFn).toHaveBeenCalled();
    });
    
    it('Should reject and NOT store improperly formed data', async () => {
        const mockedJestFn = jest.fn();
        mockedImportXmlCreate.mockImplementation(mockedJestFn);
        const res = await request(app).post('/import')
            .set({'Content-Type': 'text/xml+markr'})
            .send(testXmlMessedUpResult);

        expect(res.statusCode).toBe(500);
        expect(mockedJestFn).not.toHaveBeenCalled();
    });
   
});