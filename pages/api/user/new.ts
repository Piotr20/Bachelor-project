import { NextApiRequest, NextApiResponse } from "next";
import Project from "~/models/mongoModals/projectSchema";
import Skill from "~/models/mongoModals/skillSchema";
import User from "~/models/mongoModals/userSchema";
import connectMongo from "../../../util/connectMongo";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        const mongoPeople = await User.find().populate([
            { path: "projects", model: Project },
            {
                path: "skills",
                populate: {
                    path: "skill",
                    model: Skill,
                },
            },
        ]);
        const people = mongoPeople?.filter((person: any) => {
            const date = new Date();
            const currentMonth = date.getMonth();
            if (person?.createdAt.getMonth() == currentMonth) {
                return person;
            }
        });

        res.json({ people });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
