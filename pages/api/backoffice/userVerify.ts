import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import connectMongo from "../../../util/connectMongo";
import User from "../../../models/mongoModals/userSchema";
import Project from "~/models/mongoModals/projectSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        let user;
        let mongoUser;
        if (req.body) {
            user = JSON.parse(req.body);
            mongoUser = await User.findOne({
                email: user.email,
            });
        }
        if (mongoUser) {
            res.json({ userExists: true, user });
        } else {
            res.json({ userExists: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
