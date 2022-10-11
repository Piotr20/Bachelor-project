import { NextApiRequest, NextApiResponse } from "next";
import { getPublicHolidays } from "~/lib/helpers/holidays.helper";
import {
    checkIfHasHoliday,
    getQuarter,
    getWeeksDiff,
} from "~/lib/helpers/quarter.helper";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import { NormalWorkingDay, NormalWorkingWeek, WorkDay } from "~/models";
import { getEmployees } from "~/services/employee.service";
import { getEmployeeWorkingHours } from "~/services/normal-working-hours.service";
import { getWorkDays } from "~/services/work-days.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { authorization } = req.headers;
    const { payload, timeNowInSeconds, userInitials } =
        decodeJWT(authorization);

    if (payload?.exp >= timeNowInSeconds) {
        const employees = await getEmployees();
        const employee = employees?.find(
            (employee) => employee.initials === userInitials
        );
        const normalWorkingHours: NormalWorkingWeek =
            await getEmployeeWorkingHours(employee?.id);

        let expectedHoursCount = 0;

        normalWorkingHours.map((workDay: NormalWorkingDay) => {
            const roundedWorkingHours =
                Math.round(
                    (Number(workDay.workingHours) + Number.EPSILON) * 100
                ) / 100;
            expectedHoursCount += roundedWorkingHours;
        });

        const normalWorkingDay =
            Math.round(
                (Number(normalWorkingHours[0].workingHours) + Number.EPSILON) *
                    100
            ) / 100;

        const date = new Date();
        const currentYear = date.getFullYear();

        const publicHolidays = await getPublicHolidays(currentYear);
        const quarterInfo = getQuarter(date);

        const hoursInQuarterByDay = await getWorkDays(
            quarterInfo?.startDate,
            quarterInfo?.endDate,
            authorization
        );

        let regHoursCount = 0;

        hoursInQuarterByDay.allWorkUnits.map((workDay: WorkDay) => {
            regHoursCount += workDay.totalRegHours;
        });

        let weekDifference;
        let totalNormalWorkHoursInQuarter;
        let deductableHolidayHours;
        let sanitizedExpectedHours;
        let balance;
        let sanitizedBalance;

        if (quarterInfo) {
            weekDifference = getWeeksDiff(
                quarterInfo?.startDate,
                quarterInfo?.endDate
            );

            totalNormalWorkHoursInQuarter = expectedHoursCount * weekDifference;

            deductableHolidayHours = checkIfHasHoliday(
                quarterInfo?.startDate,
                quarterInfo?.endDate,
                publicHolidays,
                normalWorkingDay
            );
            sanitizedExpectedHours =
                totalNormalWorkHoursInQuarter - deductableHolidayHours;

            balance = regHoursCount - sanitizedExpectedHours;
            sanitizedBalance = Number(balance.toFixed(2));
        }

        return res.status(200).json({
            expectedHours: sanitizedExpectedHours,
            registeredHours: regHoursCount,
            balance: sanitizedBalance,
        });
    } else {
        return res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    }
};
