import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import { addMissingPeopleToProjects } from "~/lib/services/mongoSyncAdd.service";
import { removeLegacyPeopleFromProject } from "~/lib/services/mongoSyncRemove.service";
import Project from "~/models/mongoModals/projectSchema";
import Skill from "~/models/mongoModals/skillSchema";
import User from "~/models/mongoModals/userSchema";
import connectMongo from "~/util/connectMongo";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        const mongoUser = await User.findOne({
            email: "piotrpospiech00@gmail.com",
        }).populate([
            { path: "projects", model: Project },
            {
                path: "skills",
                populate: {
                    path: "skill",
                    model: Skill,
                },
            },
        ]);

        const userId = await mongoUser?._id;
        removeLegacyPeopleFromProject(userId, mongoUser);

        addMissingPeopleToProjects(userId, mongoUser);

        res.json({ mongoUser });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
