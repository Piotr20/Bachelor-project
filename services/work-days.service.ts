import { DOMAIN_NAME } from "~/util/env-variables";

export async function getWorkDays(
    from?: string,
    to?: string,
    authorization?: string
) {
    const QuarterHoursRsponse = await fetch(
        `${DOMAIN_NAME}/api/timelog/getTotalWorkUnitByDay?startDate=${from}&endDate=${to}`,
        {
            headers: {
                Authorization: `${authorization}`,
                "content-type": "application/json",
            },
        }
    );
    const daysInRange = await QuarterHoursRsponse.json();
    return daysInRange;
}
