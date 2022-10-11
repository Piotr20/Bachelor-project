// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Employees } from "~/models";
import { getEmployees } from "~/services/employee.service";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Employees | { error: string }>
) {
  try {
    const employees = await getEmployees();

    if (employees) {
      res.status(200).json(employees);
    } else {
      res.status(500).send({ error: `Failed to fetch employees` });
    }
  } catch (error) {
    res.status(500);
  }
}
