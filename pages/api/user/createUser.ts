import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connectMongo";
import User from "../../../models/mongoModals/userSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        let user;
        let mongoUser;
        if (req.body) {
            user = JSON.parse(req.body);
            mongoUser = await User.create({
                email: user.email,
                name: user.name,
                experienceYears: user.experienceYears,
                phone: user.phone,
                department: user?.department,
                location: user?.location,
                role: user?.role,
                projects: user?.projects,
                skills: user?.skills,
                imageURL: user.imageURL,
            });
        }

        res.json({ user: mongoUser });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
