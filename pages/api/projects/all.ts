import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connectMongo";
import Project from "~/models/mongoModals/projectSchema";
import User from "~/models/mongoModals/userSchema";
import Skill from "~/models/mongoModals/skillSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        const projects = await Project.find().populate([
            { path: "people", model: User },
            { path: "skills", model: Skill },
        ]);

        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
