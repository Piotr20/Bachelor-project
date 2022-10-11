export function getWeekDates(currentDate: Date) {
    const date = new Date(currentDate); // get current date
    const day = date.getDay();

    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    const firstDay = new Date(date.setDate(diff));

    const lastDay = new Date(firstDay);
    lastDay.setDate(lastDay.getDate() + 6);

    const sanitizedFirstDay = firstDay.toISOString().split("T")[0];
    const sanitizedLastDay = lastDay.toISOString().split("T")[0];

    return {
        firstDay: sanitizedFirstDay,
        lastDay: sanitizedLastDay,
    };
}
