import { WorkUnits } from "~/models";
import {
    TIMELOG_SITE_CODE,
    TIMELOG_API_ID,
    TIMELOG_API_PASSWORD,
    TIMELOG_BASE_URL,
} from "~/util/env-variables";
const parseString = require("xml2js").parseString;
const stripNS = require("xml2js").processors.stripPrefix;

export const getWorkUnitsByEmployeeId = async (
    employeeId: string,
    startDate?: string | string[],
    endDate?: string | string[]
): Promise<WorkUnits> => {
    const timelogResponse = await fetch(
        `${TIMELOG_BASE_URL}/GetWorkUnitsRaw?siteCode=${TIMELOG_SITE_CODE}&apiID=${TIMELOG_API_ID}&apiPassword=${TIMELOG_API_PASSWORD}&employeeId=${employeeId}&initials=&departmentID=0&startDate=${startDate}&endDate=${endDate}&workUnitId=0&allocationID=0&taskID=0&projectID=0`
    );

    if (timelogResponse.status !== 200) {
        throw Error(
            `Failed to fetch workUnits from Timelog: ${timelogResponse.statusText}`
        );
    }

    const hoursRawXmlResponse = await timelogResponse.text();

    let workUnits: WorkUnits = [];

    parseString(
        hoursRawXmlResponse,
        { tagNameProcessors: [stripNS] },
        (_: any, hoursRawJsonResponse: any) => {
            const mappedWorkUnits =
                hoursRawJsonResponse?.WorkUnits?.WorkUnit?.map((e: any) => {
                    return {
                        id: e.$.ID,
                        employeeID: e.EmployeeID?.[0],
                        employeeInitials: e.EmployeeInitials?.[0],
                        taskId: e.TaskID?.[0],
                        customerId: e.CustomerId?.[0],
                        regHours: Number(e.RegHours?.[0]),
                        date: e.Date?.[0].split("T")[0],
                    };
                });

            workUnits = mappedWorkUnits || {};
        }
    );

    return workUnits;
};
