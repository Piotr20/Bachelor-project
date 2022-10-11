import { Employees } from "~/models";
import {
    TIMELOG_SITE_CODE,
    TIMELOG_API_ID,
    TIMELOG_API_PASSWORD,
    TIMELOG_BASE_URL,
} from "~/util/env-variables";
const parseString = require("xml2js").parseString;
const stripNS = require("xml2js").processors.stripPrefix;

export const getEmployees: () => Promise<Employees | undefined> = async () => {
    const timelogResponse = await fetch(
        `${TIMELOG_BASE_URL}/GetEmployeesShortList?siteCode=${TIMELOG_SITE_CODE}&apiID=${TIMELOG_API_ID}&apiPassword=${TIMELOG_API_PASSWORD}&departmentID=0&status=1`
    );

    const employeesXmlResponse = await timelogResponse.text();

    let employees: Employees | undefined = undefined;

    parseString(
        employeesXmlResponse,
        { tagNameProcessors: [stripNS] },
        (_: any, employeesJsonResponse: any) => {
            const mappedEmployees =
                employeesJsonResponse?.Employees?.Employee?.map((e: any) => {
                    return {
                        id: e.$.ID,
                        employeeUserId: e.EmployeeUserID?.[0],
                        firstName: e.FirstName?.[0],
                        lastName: e.LastName?.[0],
                        fullName: e.FullName?.[0],
                        initials: e.Initials?.[0],
                    };
                });

            employees = mappedEmployees || {};
        }
    );

    return employees;
};
