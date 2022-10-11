import { Holiday } from "~/models";

export function getQuarter(dateOfQuarter: Date) {
    const date = new Date(dateOfQuarter);
    const quarter = Math.floor(date.getMonth() / 3 + 1);
    const year = date.getFullYear();
    switch (quarter) {
        case 1:
            return {
                quarter: quarter,
                startDate: `${year}-01-01`,
                endDate: `${year}-03-31`,
            };
        case 2:
            return {
                quarter: quarter,
                startDate: `${year}-04-01`,
                endDate: `${year}-06-30`,
            };
        case 3:
            return {
                quarter: quarter,
                startDate: `${year}-07-01`,
                endDate: `${year}-09-30`,
            };
        case 4:
            return {
                quarter: quarter,
                startDate: `${year}-10-01`,
                endDate: `${year}-12-31`,
            };
    }
}

export function getWeeksDiff(startDate: string, endDate: string) {
    const start: any = new Date(startDate);
    const end: any = new Date(endDate);

    const msInWeek = 1000 * 60 * 60 * 24 * 7;

    return Math.round(Math.abs(end - start) / msInWeek);
}

export function checkIfHasHoliday(
    startDate: string,
    endDate: string,
    holidays: Holiday[],
    normalWorkingDay: number
) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let holidayCount = 0;
    holidays?.map((holiday: Holiday) => {
        const date = new Date(holiday.date);
        if (date > start && date < end) {
            holidayCount++;
        }
    });
    return holidayCount * normalWorkingDay;
}
