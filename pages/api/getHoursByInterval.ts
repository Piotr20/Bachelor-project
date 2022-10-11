// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WorkUnits } from "~/models";
import { getEmployees } from "~/services/employee.service";
import { getWorkUnitsByEmployeeId } from "~/services/work-units.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WorkUnits | { error: string }>
) {
  try {
    const { query } = req;

    const initials: string = `${query.initials}`.toUpperCase();
    const startDate: string = query.startDate as string;
    const endDate: string = query.endDate as string;

    if (!initials || !"RHJFGRLBMPPO".includes(initials)) {
      res.status(400).send({
        error: "no initials provided. Must match 'rhj', 'fgr', 'lbm' or 'ppo",
      });
    }

    if (!query.startDate) {
      res.status(400).send({ error: "startDate not provided." });
    }

    if (!query.endDate) {
      res.status(400).send({ error: "endDate not provided." });
    }

    const employees = await getEmployees();
    const employee = employees?.find((e) => e.initials === initials);

    if (employee?.id) {
      const workUnits = await getWorkUnitsByEmployeeId(
        employee.id,
        startDate,
        endDate
      );
      res.status(200).json(workUnits);
    } else {
      res.status(500).send({ error: `Failed to fetch employees` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error. Have a nice day." });
  }
}
