import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import { WorkDay, WorkUnit, WorkUnits } from "~/models";
import { getEmployees } from "~/services/employee.service";
import { getWorkUnitsByEmployeeId } from "~/services/work-units.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { authorization } = req.headers;
    const { payload, timeNowInSeconds } = decodeJWT(authorization);

    if (payload?.exp >= timeNowInSeconds) {
        const query = req.query;
        const { startDate, endDate } = query;
        const userInitials = payload?.unique_name.split("@")[0];
        const employees = await getEmployees();
        const employee = employees?.find(
            (employee) => employee.initials === userInitials
        );
        let timelogWorkUnits: WorkUnits = [];
        if (employee?.id) {
            timelogWorkUnits = await getWorkUnitsByEmployeeId(
                employee.id,
                startDate,
                endDate
            );
        }
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let allWorkUnits: WorkDay[] = [];

        const workUnits = new Map();
        timelogWorkUnits.forEach((entry: WorkUnit) => {
            const d = new Date(entry.date);
            const dayName = days[d.getDay()];

            if (workUnits.get(`${entry.date}`)) {
                const workDay = workUnits.get(`${entry.date}`);
                workUnits.set(`${entry.date}`, {
                    ...workDay,
                    totalRegHours: workDay.totalRegHours + entry.regHours,
                });
            } else {
                workUnits.set(`${entry.date}`, {
                    date: entry.date,
                    day: dayName,
                    totalRegHours: entry.regHours || 0,
                });
            }
        });
        for (const key of Array.from(workUnits.keys())) {
            allWorkUnits.push(workUnits.get(key));
        }
        if (startDate && endDate) {
            return res.status(200).json({ allWorkUnits });
        } else {
            return res.send({
                error: "You should specify a start and end date in order to fetch appropriate data",
            });
        }
    } else {
        return res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    }
};
