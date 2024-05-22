import { TestResult } from "../Models/testResult";

const aggregateFind = async (testId: string) => {
    try {
        // Just get the obtained marks, and explicitly tell mongo not to bother giving us the ID.
        return await TestResult.find({ testId }, 'summaryMarksObtained -_id');
    } catch (err) {
        console.log(err);
    }
};

export default aggregateFind;