import { VtlParser } from "@making-sense/vtl-2-0-antlr-tools-ts";
import { Dataset, CalcConfig, BasicScalarTypes } from "model";

import init, { execute_aggr_sum } from "trevas-wasm";
import { transpose } from "utilities";

await init();

export const executeDrop = (_ds: Dataset, _measuresToDrop: string[]): Dataset => {
    throw new Error("executeDrop is not yet implemented for Wasm");
};

export const executeCalc = (_ds: Dataset, _config: CalcConfig[]): Dataset => {
    throw new Error("executeCalc is not yet implemented for Wasm");
};

export const executeRename = (_ds: Dataset, _config: Record<string, string>): Dataset => {
    throw new Error("executeRename is not yet implemented for Wasm");
};

export const executeInnerJoin = (_ds1: Dataset, _ds2: Dataset): Dataset => {
    throw new Error("executeInnerJoin is not yet implemented for Wasm");
};

export const executeAggr = (ds: Dataset, groupBy: string[] | null, opType: number): Dataset => {
    const { dataPoints, dataStructure } = ds;

    let operatorFunction: (component: BasicScalarTypes[]) => BasicScalarTypes;
    let measureColumnTypes: number | null = null;

    switch (opType) {
        case VtlParser.COUNT: {
            operatorFunction = component => {
                return component.length;
            };
            measureColumnTypes = VtlParser.INTEGER;
            break;
        }
        case VtlParser.SUM: {
            operatorFunction = component => {
                return execute_aggr_sum(new Float64Array(component as number[]));
            };
            break;
        }
        case VtlParser.MIN: {
            operatorFunction = component => {
                const typedComponent = component as number[];
                return typedComponent.reduce((acc, a) => (acc < a ? acc : a), typedComponent[0]);
            };
            break;
        }
        case VtlParser.MAX: {
            operatorFunction = component => {
                const typedComponent = component as number[];
                return typedComponent.reduce((acc, a) => (acc > a ? acc : a), typedComponent[0]);
            };
            break;
        }
        case VtlParser.MEDIAN: {
            operatorFunction = component => {
                const typedComponent = component as number[];
                const mid = Math.floor(typedComponent.length / 2);
                const sortedArray = [...typedComponent].sort((a, b) => a - b);
                return typedComponent.length % 2 !== 0
                    ? sortedArray[mid]
                    : (sortedArray[mid - 1] + sortedArray[mid]) / 2;
            };
            measureColumnTypes = VtlParser.NUMBER;
            break;
        }
        case VtlParser.AVG: {
            operatorFunction = component => {
                const typedComponent = component as number[];
                return typedComponent.reduce((acc, a) => acc + a, 0) / typedComponent.length;
            };
            measureColumnTypes = VtlParser.NUMBER;
            break;
        }
    }
    const operatorFunctionWithNull = (component: BasicScalarTypes[]) => {
        if (component.includes(null)) return [null];
        return [operatorFunction(component)];
    };
    // Update role fn(groupBy) & type fn(opType)
    const newDataStructure = dataStructure.map(c => {
        const { name, type } = c;
        const newType = measureColumnTypes || type;
        if (groupBy?.includes(name)) return { ...c, type: newType, role: VtlParser.IDENTIFIER };
        return { ...c, type: newType, role: VtlParser.MEASURE };
    });
    if (groupBy?.length === 0) {
        const transposedDataPoints = transpose(dataPoints);
        const transformedDataPoints = transposedDataPoints.map(d =>
            operatorFunctionWithNull(d)
        ) as BasicScalarTypes[][];
        const newDataPoints = transpose(transformedDataPoints);
        return { dataStructure: newDataStructure, dataPoints: newDataPoints };
    } else {
        // TODO
        // const idTuples = getIdTuples();
    }
    return { dataStructure: newDataStructure, dataPoints };
};
