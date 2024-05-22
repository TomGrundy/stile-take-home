import Joi from 'joi';
import { Schema, model } from 'mongoose';

// This enforces the validity of the xml we read in,
// enabling us to reject malformed inputs and tell the sender to go
// print out stuff for the work experience kid.
// Poor work experience kid.
export const testResultSchemaValidate = Joi.object({
    dateScanned: Joi.date().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    studentNumber: Joi.number().integer().required(),
    summaryMarksAvailable: Joi.number().integer().required(),
    summaryMarksObtained: Joi.number().integer().required(),
    testId: Joi.number().integer().required(),
});

interface ITestResult {
    dateScanned: Date,
    firstName: String,
    lastName: String,
    studentNumber: Number,
    summaryMarksAvailable: Number,
    summaryMarksObtained: Number,
    testId: Number,
};

const testResultsSchema = new Schema<ITestResult>({
    dateScanned: {
        type: Date,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    studentNumber: {
        type: Number,
        required: true
    },
    summaryMarksAvailable: {
        type: Number,
        required: true
    },
    summaryMarksObtained: {
        type: Number,
        required: true
    },
    testId: {
        type: Number,
        required: true
    }
});

 export const TestResult = model<ITestResult>('TestResult', testResultsSchema);