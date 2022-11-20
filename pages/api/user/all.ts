import { NextApiRequest, NextApiResponse } from "next";
import Project from "~/models/mongoModals/projectSchema";
import Skill from "~/models/mongoModals/skillSchema";
import User from "~/models/mongoModals/userSchema";
import connectMongo from "../../../util/connectMongo";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        const people = await User.find().populate([
            { path: "projects", model: Project },
            {
                path: "skills",
                populate: {
                    path: "skill",
                    model: Skill,
                },
            },
        ]);

        res.json({ people });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
