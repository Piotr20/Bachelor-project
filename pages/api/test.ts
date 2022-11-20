import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import Project from "~/models/mongoModals/projectSchema";
import Skill from "~/models/mongoModals/skillSchema";
import User from "~/models/mongoModals/userSchema";
import connectMongo from "~/util/connectMongo";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        const user = await User.find({
            _id: "634fe42fd8604cc58b9a73b1",
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
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
