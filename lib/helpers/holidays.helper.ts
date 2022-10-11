import { Holiday } from "~/models";

export async function getPublicHolidays(year: number) {
    const holidaysRsponse = await fetch(
        `https://date.nager.at/api/v3/publicholidays/${year}/DK`
    );
    const holidays = await holidaysRsponse.json();
    const publicHolidays = holidays?.filter((holiday: Holiday) => {
        let filteredHoliday;
        const date = new Date(holiday.date);
        const day = date.getDay();
        holiday?.types?.map((type: string) => {
            if (type === "Public" && day !== 0 && day !== 6) {
                filteredHoliday = holiday;
            }
        });
        return filteredHoliday;
    });
    return publicHolidays;
}
