import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connectMongo";
import Project from "~/models/mongoModals/projectSchema";
import User from "~/models/mongoModals/userSchema";
import Skill from "~/models/mongoModals/skillSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        const { id } = JSON.parse(req.body);
        const person = await User.findById(id).populate([
            { path: "projects", model: Project },
            { path: "skills", model: Skill },
        ]);

        const project = await Project.findById(id).populate([
            { path: "people", model: User },
            { path: "skills", model: Skill },
        ]);

        const skillRaw = await Skill.findById(id);

        const matchedProjects = await Project.find({ skills: id });
        const matchedPeople = await User.find({ skills: id });
        const skill = skillRaw
            ? {
                  docs: skillRaw?.docs,
                  imageURL: skillRaw?.imageURL,
                  name: skillRaw?.name,
                  _id: skillRaw?._id,
                  projects: matchedProjects,
                  people: matchedPeople,
              }
            : skillRaw;

        res.json({ person, project, skill });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
