import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import connectMongo from "../../../util/connectMongo";
import User from "../../../models/mongoModals/userSchema";
import Project from "~/models/mongoModals/projectSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        const user = await User.findOne({
            email: "piotrpospiech00@gmail.com",
        });
        const project = await Project.findOne({
            _id: "634d394693bce890a683167f",
        });

        /*   const project = await Project.create({
            name: "Timelog Analyzer",
            tag: "TLA",
            imageUrl:
                "https://www.timelog.com/media/754831/timelog_logo_with_payoff.png",
            startDate: "2022-08-08",
            endDate: "2022-12-12",
            people: [user._id],
        }); */

        res.json({ project });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
