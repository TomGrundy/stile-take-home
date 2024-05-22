import { TestResult } from "../Models/testResult";

const importXmlCreate = async (data: any) => {
    try {
        // findOneAndUpdate, along with the upsert mentioned below, lets us
        // either insert a new item into the db, or update it if either the
        // obtained OR available marks are greater than whats in the db.
        // The test data has different names on people with the same student ID,
        // and this has the effect of only recording the names of the highest marked person
        // with that ID, but uh... I think the people doing the test should make sure people 
        // aren't taking the test for someone else anyway, though that didn't stop Melbourne
        // Uni from having that be an incredibly rampant issue when I was there. But that's
        // not our problem.
        await TestResult.findOneAndUpdate(
            {
                studentNumber: data.studentNumber,
                testId: data.testId,
                $or: [
                    {'summaryMarksObtained': {$lt: data.summaryMarksObtained}},
                    {'summaryMarksAvailable': {$lt: data.summaryMarksAvailable}}
                ]
            },
            data,
            { upsert: true, setDefaultsOnInsert: true }
        );
    } catch (err) {
        console.log(err);
    }
};

export default importXmlCreate;