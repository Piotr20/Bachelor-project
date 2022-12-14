import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import connectMongo from "../../../util/connectMongo";
import User from "../../../models/mongoModals/userSchema";
import Project from "~/models/mongoModals/projectSchema";
import Skill from "~/models/mongoModals/skillSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        let user;
        let mongoUser;
        if (req.body) {
            user = JSON.parse(req.body);
            mongoUser = await User.findOne({
                email: user.email,
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
        }
        if (mongoUser) {
            res.json({ userExists: true, user: mongoUser });
        } else {
            res.json({ userExists: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
