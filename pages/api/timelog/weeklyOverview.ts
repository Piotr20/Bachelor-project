import { NextApiRequest, NextApiResponse } from "next";
import { getPublicHolidays } from "~/lib/helpers/holidays.helper";
import { checkIfHasHoliday } from "~/lib/helpers/quarter.helper";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import { getWeekDates } from "~/lib/helpers/weeklyOverview.helper";
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

        let normalWorkingWeek = 0;
        normalWorkingHours.map((workDay: NormalWorkingDay) => {
            const roundedWorkingHours =
                Math.round(
                    (Number(workDay.workingHours) + Number.EPSILON) * 100
                ) / 100;
            normalWorkingWeek += roundedWorkingHours;
        });

        const normalWorkingDay =
            Math.round(
                (Number(normalWorkingHours[0].workingHours) + Number.EPSILON) *
                    100
            ) / 100;

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const { firstDay, lastDay } = getWeekDates(currentDate);

        const hoursByDay = await getWorkDays(firstDay, lastDay, authorization);
        let regHoursCount = 0;
        hoursByDay.allWorkUnits.map((workDay: WorkDay) => {
            regHoursCount += workDay.totalRegHours;
        });

        const publicHolidays = await getPublicHolidays(currentYear);

        const deductableHolidayHours = checkIfHasHoliday(
            firstDay,
            lastDay,
            publicHolidays,
            normalWorkingDay
        );

        const sanitizedExpectedHours =
            normalWorkingWeek - deductableHolidayHours;

        const balance = regHoursCount - sanitizedExpectedHours;
        const sanitizedBalance = Number(balance.toFixed(2));

        return res.status(200).json({
            expectedHours: sanitizedExpectedHours,
            registeredHours: regHoursCount,
            balance: sanitizedBalance,
            publicHolidays,
        });
    } else {
        return res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    }
};
