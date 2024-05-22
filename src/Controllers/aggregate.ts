import { Request, Response } from 'express';
import { MathArray, MathNumericType, max, mean, min, quantileSeq, std } from 'mathjs';
import aggregateFind from '../Services/aggregate';

export const aggregate = async (req: Request, res: Response) => {
    const results = await aggregateFind(req?.params?.testId ?? '-1');
    if (!results || results.length < 1) {
        return res.status(404).send();
    }

    const summaryMarksObtained = results?.map((item: { summaryMarksObtained: any; }) => {
        return (item?.summaryMarksObtained ?? 0) as MathNumericType;
    }) ?? [];
    const quartiles = quantileSeq(summaryMarksObtained, 3) as MathArray;

    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .send({
            count: summaryMarksObtained?.length ?? 0.0,
            max: (max(summaryMarksObtained) as number).toFixed(1) ?? 0.0,
            mean: (mean(summaryMarksObtained) as number).toFixed(1) ?? 0.0,
            min: (min(summaryMarksObtained) as number).toFixed(1) ?? 0.0,
            p25: (quartiles?.[0] as number).toFixed(1) ?? 0.0,
            p50: (quartiles?.[1] as number).toFixed(1) ?? 0.0,
            p75: (quartiles?.[2] as number).toFixed(1) ?? 0.0,
            stddev: (std(summaryMarksObtained) as unknown as number).toFixed(1) ?? 0.0
        });
};