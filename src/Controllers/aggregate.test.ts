const dataIsPresent = {
    count: 3,
    max: "3.0",
    mean: "2.0",
    min: "1.0",
    p25: "1.5",
    p50: "2.0",
    p75: "2.5",
    stddev: "1.0"
};

import request from 'supertest';
import aggregateFind from '../Services/aggregate';
import app from '../app';
jest.mock('../Services/aggregate', () => jest.fn());
const mockedAggregateFind = aggregateFind as jest.Mock;

describe('aggregate controller', () => {
    it('Should return aggregate values when data is present', async () => {
        mockedAggregateFind.mockImplementation(() => {
            return [{ summaryMarksObtained: 1 }, { summaryMarksObtained: 2 }, { summaryMarksObtained: 3 }];
        });
        const res = await request(app).get('/results/1234/aggregate');

        expect(res.statusCode).toBe(200);
        expect(res.text.length).toBeGreaterThan(0);
        expect(JSON.parse(res.text)).toEqual(dataIsPresent);
    });
    
    it('Should 404 if no data found for given test ID', async () => {
        mockedAggregateFind.mockImplementation(() => {
            return [];
        });
        const res = await request(app).get('/results/4321/aggregate');

        expect(res.statusCode).toBe(404);
        expect(res.text.length).toBe(0);
        expect(res.text).toEqual("");
    });
});