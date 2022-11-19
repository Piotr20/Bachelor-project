import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connectMongo";
import Skill from "~/models/mongoModals/skillSchema";
import Project from "~/models/mongoModals/projectSchema";
import User from "~/models/mongoModals/userSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        const projects = await Project.find().populate([
            { path: "people", model: User },
            { path: "skills", model: Skill },
        ]);
        const people = await User.find().populate([
            { path: "projects", model: Project },
            { path: "skills", model: Skill },
        ]);

        const skills = await Skill.find();

        res.json({
            skills: {
                people: people,
                projects: projects,
                skillsList: skills,
            },
        });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
