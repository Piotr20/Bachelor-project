import { NormalWorkingWeek } from "~/models";
import {
    TIMELOG_SITE_CODE,
    TIMELOG_API_ID,
    TIMELOG_API_PASSWORD,
    TIMELOG_BASE_URL,
} from "~/util/env-variables";
const parseString = require("xml2js").parseString;
const stripNS = require("xml2js").processors.stripPrefix;

export const getEmployeeWorkingHours = async (
    employeeId?: string
): Promise<NormalWorkingWeek> => {
    const timelogResponse = await fetch(
        `${TIMELOG_BASE_URL}/GetEmployeeNormalWorkingHoursRaw?siteCode=${TIMELOG_SITE_CODE}&apiID=${TIMELOG_API_ID}&apiPassword=${TIMELOG_API_PASSWORD}&employeeId=${employeeId}&departmentID=0&status=1`
    );

    if (timelogResponse.status !== 200) {
        throw Error(
            `Failed to fetch AllNormalWorkingHours from Timelog: ${timelogResponse.statusText}`
        );
    }

    const hoursRawXmlResponse = await timelogResponse.text();

    let normalWorkingHours: NormalWorkingWeek = [];

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    parseString(
        hoursRawXmlResponse,
        { tagNameProcessors: [stripNS] },
        (_: any, hoursRawJsonResponse: any) => {
            const mappedWNormalWorkHouts =
                hoursRawJsonResponse?.EmployeeNormalWorkingTimes?.EmployeeNormalWorkingTime?.map(
                    (e: any) => {
                        return {
                            id: e.$.ID,
                            employeeID: e.EmployeeID?.[0],
                            weekday: days[e.Weekday?.[0]],
                            name: e.Name?.[0],
                            workingHours: e.WorkingHours?.[0],
                            employeeFirstName: e.EmployeeFirstName?.[0],
                            employeeLastName: e.EmployeeLastName?.[0],
                        };
                    }
                );

            normalWorkingHours = mappedWNormalWorkHouts || {};
        }
    );

    return normalWorkingHours;
};
